// 图片防盗
let http = require('http');
let fs = require('fs');
let url = require('url');
const whiteList = [

];
let server = http.createServer(function (req,res) {
    let refer = req.headers['referer'] || req.headers['refer'];
    // 如果存在refer，则表示是从url引用过来的
    if(refer) {
        let referHostname = rul.parse(refer, true).hostname;
        let currentHostname = rul.parse(req.url,true).hostname;
        if (referHostname != currentHostname && whiteList.indexOf(referHostname) == -1) {
            res.setHeader('Content-Type','image/jpg');
            fs.createReadStream(paht.join(__dirname,'notfound.jpg')).pipe(res);
            return;
        }
    }
    res.setHeader('Content-Type','image/png');
    fs.createReadStream(path.join(__dirname,'test.png')).pipe(res);
});
server.listen(8080);
