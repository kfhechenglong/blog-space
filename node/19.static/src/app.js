/**
 * Created by jhon on 2019/3/16.
 */
//创建一个服务器
  let config = require('./config');
let path = require('path');
let http = require('http');
let fs = require('fs');
let url = require('url');
let { promisify,inspect } = require('util');
let handlebars = require('handlebars');
let mime = require('mime');
let stat = promisify(fs.stat);
let readdir = promisify(fs.readdir);
let chalk = require('chalk');
let debug = require('debug')('static:app');
// 编译模板文件，得到一个渲染的方法，然后传入实际数据就可以得到渲染后的html
function list() {
    let temp = fs.readFileSync(path.resolve(__dirname,'template','list.html'),'utf8');
    return handlebars(temp);
}
class Server {
    constructor(argv){
        this.list  = list();
        this.config = Object.assign({},config,argv);
    }
    start () {
        let server = http.createServer();
        server.on('request',this.request.bind(this));
        server.listen(this.config.port,() => {
                let url = `http://${this.config.host}:${this.config.port}`;
                debug(`server started at ${chalk.green(url)}`);
        });
    }
    async request(req,res) {
        //  先取到客户端想要的文件
        let { pathname } = url.parse(req.url);
        if(pathname == '/favicon.ico') {
            return this.sendError(req,res);
        }
        let filepath = path.join(this.config.root,pathname);
        try{
            let statObj = await stat(filepath);
            if(statObj.isDirectory()){
            //    如果是目录的话，应该显示目录
                let files = await readdir(filepath);
                files = files.map(file => ({
                    name:file,
                    url:path.join(pathname,file)
                }))
                let html = this.list({
                    title:pathname,
                    files
                });
                res.setHeader('Content-Type','text/html');
                res.end(html)
            } else {
                this.sendFile(req, res, filepath,statObj);
            }
        } catch(err) {
            debug(inspect(err));
            this.sendError(req, res);
        }
    }
    sendFile(req,res,filePath,statObj) {
        res.setHeader('Content-Type',mime.getType(filePath));
        fs.createReadStream(filePath).pipe(res);
    }
    //发送错误
    sendError(req,res) {
        res.statusCode = 500;
        res.end(`there is something wrong in the server! please try later!`);
    }
}
// let server = new Server();
// server.start();
module.exports = Server;
