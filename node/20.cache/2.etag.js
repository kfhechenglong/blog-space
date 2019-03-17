// etag 不管修改时间，只看文件内容
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
let crypto = require('crypto');
let server = http.createServer(function(req,res) {
    let { pathname } = url.parse(req.url,'utf8');
    let filepath = path.join(__dirname,pathname);
    console.log(filepath);
    fs.stat(filepath,function(err,stat) {
        if(err) {
            return sendError(req,res);
        } else {
            let ifNoneMatch = req.headers['if-none-match'];
            let md5 = crypto.createHash('md5');
            let out = fs.createReadStream(filepath);
            out.on('data',function (data) {
                md5.update(data)
            });
            out.on('end',function() {
                let etag = md5.digest('hex')
                if (ifNoneMatch == etag) {
                    res.writeHeader(304);
                    res.end('');
                } else {
                    return send(req, res, filepath, etag);
                }
            });
        }
    })
});

function send(req, res, filepath, etag) {
    res.setHeader('Content-Type', mime.getType(filepath));
    // 第一次服务器返回的时候，会把文件的内容算出来一个标识，发送给客户端！
    // 客户端看到etag之后，会把标识内容保存到客户端，下次再次访问服务器的时候，会发给服务器
    res.setHeader('ETag', etag);
    fs.createReadStream(filepath).pipe(res);
}

function sendError (req,res) {
    res.end('not Found')
}
server.listen(8080,function() {
    console.log('server start!');

})
