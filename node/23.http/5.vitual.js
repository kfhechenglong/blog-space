/*
弹性计算云服务器 ECS 就是一个完整的服务器
虚拟主机 就是一个服务器上的目录

*/
let http = require('http');
let proxyServer = require('http-server');
let ps = proxyServer.createProxyServer();
let config = {
    'hechenglong.com': 'http://localhost:8000',
    'jueduilingdu.com' :'http://localhost:9000',
};
let server = http.createServer(function (req,res) {
    let host = req.headers['host'];
    let target = config[host];
    if(target) {
        ps(req,res,{
            target
        });
    } else {
        res.end(host);
    }
}).listen(80);
