// 生成一个聊天室
const net = require('net');
const util = require('util');
// 保存聊天用户id
let clients = {};
let server = net.createServer(function(socket) {
  console.log('socket client' + util.inspect(socket.address()));
  socket.setEncoding('utf8');
  // 监听连接的数量
  server.getConnections((err,count) => {
    console.log('当前连接数量为：' + count + '请输入你的昵称：\r\n');
  });
  let userName ;
  socket.on('data',function (data) {
    data = data.replace(/\r\n/,'');
    if(userName) {
      // 如果存在就广播消息
      broadcast(userName,`${userName}:${data}`);
    } else {
      if(clients[data]) {
        socket.write(`您的用户名已被占用！\r\n`);
      } else {
        userName = data ;
        clients[userName] = socket;
        broadcast(userName,`欢迎${userName}加入聊天室！`);
      }
    }
  });
  socket.on('data',function() {
    broadcast(userName,`${userName}离开聊天室！`);
    clients[userName] && clients[userName].destroy();
    delete clients[userName];
  });
});
function broadcast(username,msg) {
  for (let name in clients) {
    if (name != username) {
      clients[name].write(msg + '\r\n');
    }
  }
}
server.listen(3030,function(){
  console.log('server had connectioned');
})
