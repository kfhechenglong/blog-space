var str='{"id":"123",name:"jack",arg:11111}';

require('http').createServer(function(req,res){
    if(req.url === '/123'){
        res.writeHead(200,{'Content-Type':'text/plain','charset':'utf-8'});
        // res.write(str);
        // res.end()
    } else {
        res.writeHead(200,{'Content-Type':'text/html'});
        res.end('<p>3000</p>')
    }

}).listen(3000);
