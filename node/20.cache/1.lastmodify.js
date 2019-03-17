// 对比缓存
/*
* 第一次访问服务器的时候，服务器返回资源和缓存的规则，客户端则会把此资源缓存到本地缓存
* 第二次客户端需要此数据的时候，要取得缓存的标识，然后去问一下服务器我的资源是否是最新的，
* 如果是最新的就使用本地缓存，否则就返回最新的资源和缓存规则
*/
let http = require('http');
let url = require('url');
let path = require('path');
let fs = require('fs');
let mime = require('mime');
let server = http.createServer(function(req,res) {
    let { pathname } = url.parse(req.url,'utf8');
    let filepath = path.join(__dirname,pathname);
    console.log(filepath);
    fs.stat(filepath,function(err,stat) {
        if(err) {
            return sendError(req,res);
        } else {
            let ifModifiedSince = req.headers['if-modified-since'];
            let LastModified = stat.ctime.toGMTString();
            if (ifModifiedSince == LastModified) {
                res.writeHeader(304);
                res.end('');
            } else {
                return send(req, res, filepath, stat);
            }
        }
    })
});

function send(req,res,filepath,stat) {
    res.setHeader('Content-Type', mime.getType(filepath));
    // 发给客户端最后修改时间，客户端会把最后修改时间给保存起来，下次请求的时候会把这个时间再发给服务器！
    res.setHeader('Last-Modified',stat.ctime.toGMTString());
    fs.createReadStream(filepath).pipe(res);
}

function sendError (req,res) {
    res.end('not Found')
}
server.listen(8080,function() {
    console.log('server start!');

})
