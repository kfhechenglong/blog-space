let net = require('net');
let socket = new net.Socket();
socket.connect(8080,'localhost',function () {
  socket.write('holle!');
});
socket.setEncoding('utf8');
socket.on('data',function (data) {
  console.log(data);
});
setTimeout(() => {
  socket.end();//关闭连接
}, 10*1000);
