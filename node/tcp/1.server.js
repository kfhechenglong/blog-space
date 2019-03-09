let net = require('net');

// 创建一个socket，是一个可读可写流，是一个双工流
let server = net.createServer({});
server.on('connection',function(socket) {
  server.maxConnections = 1;//表示客服端连接的总数量是1个；
  // 获取当前有多少个客户端正在连接服务器
  server.getConnections((err,count) => {
    console.log(`欢迎光临，现在连接的客户端总数量是${count}个，最多可连接${server.maxConnections}个！`);
  });
  socket.setEncoding('utf8');//设置接受发送的数据格式为utf8；
  // 如何获取可读流数据
  socket.on('data', function (data) {
    console.log(`接收到了客户端发送的数据：${data}`);
    socket.write('服务器回应：' + data);

  });
  // 服务器收到客服端发送出来的关闭连接请求，会触发end事件，
  // 在这个地方客户端还没有真正的关闭，只是开始关闭，当真正关闭的时候，还会触发一个close事件；
  socket.on('end', function () {
    console.log('客户端已关闭！');
    // 服务器端有一个close方法，意思是如果执行了此方法，那么客户端就将不再接收新的连接，但是也不会关闭现有的连接，
    // 一旦调用此方法，当所有的客户端都关闭与服务器的连接后，将关闭服务器；
    server.unref();
  });
  socket.on('close', function (hasError) {
    console.log(`客户端真正关闭掉！：${hasError}`);
  });
  socket.on('error', function (err) {
    console.log(err);
  });
});
server.on('close',function() {
  console.log('服务器已关闭！');
});
server.on('error',function() {
  console.log('error:' + err);
});
server.listen('8080',function() {
  console.log(server.address());
  console.log('服务器端已启动！');
});
