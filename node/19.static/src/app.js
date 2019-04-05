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
let zlib = require('zlib');
let stat = promisify(fs.stat);
let readdir = promisify(fs.readdir);
let chalk = require('chalk');
let debug = require('debug')('static:app');
// 编译模板文件，得到一个渲染的方法，然后传入实际数据就可以得到渲染后的html
function list() {
    let temp = fs.readFileSync(path.resolve(__dirname,'template','list.html'),'utf8');
    return handlebars(temp);
}
/*
    1.实现获取文件列表
    2.实现文件压缩功能
    3.实现缓存
*/
class Server {
    constructor(argv){
        this.list  = list();
        this.config = Object.assign({},this.config,argv);
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
            return this.sendError('not found',req,res);
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
            this.sendError(err,req, res);
        }
    }
    sendFile(req,res,filePath,statObj) {
        // 如果走缓存则直接返回
        if (this.handleCache(req, res, filePath, statObj)) return ;
        res.setHeader('Content-Type',mime.getType(filePath) + ';charst=utf-8');
        let encoding = this.getEncoding(req,res);
        if(encoding) {
            fs.createReadStream(filePath).pipe(encoding).pipe(res);
        } else {
            fs.createReadStream(filePath).pipe(res);
        }
    }
    //发送错误
    sendError(err,req,res) {
        res.statusCode = 500;
        res.end(`${err.toSting()}`);
    }
    getEncoding(req,res) {
        // Accept-encoding: gzip,deflate
        let acceptEncoding = req.headers['accept-encoding'];
        if(/\bgzip\b/.text(acceptEncoding)) {
            res.setHeader('Content-Encoding','gzip');
            return zlib.createGzip();
        } else if(/\bdeflate\b/) {
            res.setHeader('Content-Encoding', 'deflate');
            return zlib.createDeflate();
        } else {
            return null;
        }
    }
    handleCache(req,res,filePath,statObj) {
        let ifModifiedSince = req.headers['if-modified-since'];
        let ifNoneMatch = req.headers['if-none-match'];
        res.setHeader('Cache-Control','private,max-age=30');
        res.setHeader('Expires',new Date(Date.now() + 30*1000).toGMTString());
        let etag = statObj.size;
        let lastModified = statObj.ctime.toGMTString();
        res.setHeader('ETag',etag);
        res.setHeader('Last-Modified',lastModified);
        if (ifNoneMatch && ifNoneMatch != etag) {
            return false;
        }
        if (ifModifiedSince && ifModifiedSince != lastModified) {
            return false;
        }
        if (ifNoneMatch || ifModifiedSince) {
            res.writeHead(304);
            res.end;
            return true;
        } else {
            return false;
        }

    }
}
// let server = new Server();
// server.start();
module.exports = Server;
