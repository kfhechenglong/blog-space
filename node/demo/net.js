const net = require('net');

const server = net.createServer((conn) => {
    console.log('\033[90m  new connection!\033[39m');

})

// 监听连接

server.listen(3000,() =>{
    console.log('\033[96m server listening on');

})
