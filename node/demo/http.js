// require('http').createServer(function(req,res) {
//     res.writeHead(200,{
//         'Content-Type':'image/png'
//     });
//     const stream = require('fs').createReadStream('he.jpeg');
//     stream.on('data',function(data) {
//         res.write(data)
//     })
//     stream.on('end',function(){
//         res.end()
//     })
// }).listen(3000)

// require('http').createServer(function(req,res) {
//     res.writeHead(200,{
//         'Content-Type':'iamge/png'
//     })
//     require('fs').createReadStream('he.jpeg').pipe(res)
// }).listen(3000)

const qs = require('querystring')
require('http').createServer(function(req,res) {
    if(req.url === '/'){
        res.writeHead(200,{
            'Content-Type':'text/html'
        })
        const html = [
            '<form method="POST" action="url">',
            '<h1>test form</h1>',
            '<fieldset>',
            '<label>表单的信息</label>',
            '<p>What is your name?</p>',
            '<input type="text" name="name">',
            '<p><button>Submit</button></p>',
            '</form>'
        ]
        res.end(html.join(''))
    } else if(req.url === '/url' && req.method === 'POST') {
        let body = '';
        req.on('data',function(chunk){
            body += chunk;
        })
        req.on('end',function() {
            res.writeHead(200,{
                'Content-Type':'text/html'
            })
            res.end('You send a '+ req.method + 'request,<p>'+qs.parse(body).name+'</p>')
        })

    } else {
        res.writeHead(404)
        res.end('Not Found!')
    }

}).listen(3000)
