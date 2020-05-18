const qs = require('querystring')

require('http').createServer(function(req,res) {
    var body = '';
    req.on('data',function(chunk) {
        body += chunk;
    })
    req.on('end',function() {
        res.writeHead(200);
        res.end('end')
        console.log('\n got name' + qs.parse(body).name + '\033[39m\n')
    })

}).listen(3000)
