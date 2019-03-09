let net = require('net');
let path = require('path');
let fs = require('fs');

let ws = fs.createWriteStream(path.join(__dirname,'./1.txt'));
let server = net.createServer(function(socket) {
  socket.pause();
  // 设置客户端的超时时间，如果客户端一直不输入的时间超过超时的时间，就超时
  socket.setTimeout(5 * 1000);
  socket.on('timeout',function() {
    console.log('timeout');
    // 默认情况下，当可读流读到未部的时候会关闭可写流，设置end：flase,则不关闭；
    socket.pipe(ws,{end:false});
  });
});
server.listen(8080,function() {
  console.log('开启了服务！');
});
