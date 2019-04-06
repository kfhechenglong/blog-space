// 多语言切换
// Accept-Language:zh-CH;q=0.9
let http = require('http');
let server = http.createServer(request);
server.listen(8080);
const lanPack = {
    en:{
        title:'welcome'
    },
    zh:{
        title:'欢迎光临'
    },
    default:'en'
};

function request(req,res) {
    // 实现服务器和客户端的协议，选择客户端最想要的，并且服务器刚好有
    // Accept-Language:zh-CN,zh;q=0.9,en;q=0.8,jp;q=0.7
    let acceptLanguage = req.headers['accept-language'];
    if(acceptLanguage) {
        const lans = acceptLanguage.split(',').map(function (item) {
            let values = item.split(';');
            let name = values[0];
            let q = values[1] ? parseFloat(values[1].split('=')[1]) : 1;
            return { name,q};
        }).sort((a,b) => b.q - a.q);
        let lan = lanPack.default;
        for (let i = 0; i < lans.length; i++) {
            if (lanPack[lans[i].name]) {
                lan = lans[i].name;
                break;
            }
        }
        res.end(lanPack[lan].title)
    }
}
