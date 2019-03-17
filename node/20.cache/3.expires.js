// 强制缓存
/*
将资源缓存到客户端，如果客户端再次需要此资源时，先获取到缓存中的数据，看是否过期，如果过期就重新请求
否则，不需要发送请求，直接使用本地资源
*/

let http = require('http');
let url = require('url');
let path = require('path');
let fs = require('fs');
let mime = require('mime');
let crypto = require('crypto');
let server = http.createServer(function(req,res) {
    let { pathname } = url.parse(req.url,'utf8');
    let filepath = path.join(__dirname,pathname);
    fs.stat(filepath,function(err,stat) {
        if(err) {
            return sendError(req,res);
        } else {
            return send(req, res, filepath);
        }
    })
});

function send(req, res, filepath) {
    res.setHeader('Content-Type', mime.getType(filepath));
    // 指定了缓存的过期时间，Expires是1.0中定义的，在1.1中不再使用
    res.setHeader('Expires', new Date(Date.now() + 30 * 1000).toUTCString());
    res.setHeader('Cache-Control', 'max-age=60');
    fs.createReadStream(filepath).pipe(res);
}

function sendError (req,res) {
    res.end('not Found')
}
server.listen(8080,function() {
    console.log('server start!');

})
