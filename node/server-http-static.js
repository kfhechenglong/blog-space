const qs = require('querystring')
const fs = require('fs');
require('http').createServer(function(req,res) {
    console.log(req)
    if('GET' === req.method && '/web/images' ==  req.url.substring(0,11)) {
        fs.stat(__dirname + req.url ,function  (err,stat) {
            if(err || !stat.isFile()) {
                res.writeHead('404');
                res.end('Not Found!');
                return;
            }
            serve(__dirname + req.url ,'application/jpg')
        })
    } else if ('GET' == req.method &&  '/' == req.url) {
        serve(__dirname + '/web/index.html','text/html')
    } else {
        res.writeHead(404);
        res.end('Not Found!');
    }

    function serve (path,type) {
        res.writeHead(200,{
            'Contenet-type' : type
        });
        fs.createReadStream(path).pipe(res)
    }

}).listen(3000)
