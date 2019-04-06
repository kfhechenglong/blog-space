let http = require('http');
let server = http.createServer(function (req,res) {
    console.log('已被代理过来！');
    res.end('9000');
}).listen(9000);
