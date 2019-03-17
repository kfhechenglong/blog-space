let net = require('net');
let clients = {};
let server = net.createServer(function (socket) {
  let key = socket.remoteAddress + socket.remotePort;
  console.log(key);
  socket.write(`欢迎光临本聊天室，您的地址是${key} \r\n`);
  clients[key] = {
    nickname:'匿名',
    socket
  };
  socket.setEncoding('utf8');
  socket.on('data',function(data) {
    data = data.replace(/\r\n/,'');
    console.log('data',data);
    let type = data.slice(0,1);
    switch(type) {
      case 'b' :
      // boardcast
        let text = data.slice(2);
        boardcast(text);
        break;
      case 'c':
        let values = data.split(':');
        let toUser = values[1];
        let toText = values[2];
        sendTo(toUser,toText);
        break;
      case 'l':
        list();
        break;
      case 'n':
        let newName = data.slice(2);
        let oldName = clients[key];
        oldName.nickname = newName;
        socket.write(`您的用户名已经被修改为${newName}\r\n`);
        break;
      default:
        socket.write(`请输入正确的命令！\r\n`);
        break
    }
  });
  socket.on('end',function() {
    socket.destroy();
    console.log('关闭连接');
    delete clients[key];
  });
  // 发送广播
  function boardcast(text) {
    let {nickname} = clients[key];
    for( let user in clients) {
      if(clients.hasOwnProperty(user) && user != key) {
        clients[user].socket.write(`${nickname}:${text}`);
      }
    }
  };
  function list(){
    let result = `当前在线用户为：\r\n`
    for (const user in clients) {
      result += clients[user].nickname + '\r\n';
    }
    socket.write(result);
  };
  function sendTo(toUser, text) {
    let toUserObj;
    for (let user in clients) {
      //如果对象中此key对应的对象的用户名跟想私聊的对方的用户名相同 的话
      if (clients[user].nickname == toUser) {
        toUserObj = clients[user];
        break;
      }
    }
    if (toUserObj) {
      let { nickname } = clients[key];
      toUserObj.socket.write(`${nickname}:${text}`);
    } else {
      socket.write(`用户名不正确或者对方已经下线!`);
    }
  }
});
server.listen(3030,function() {
  console.log('访问成功！');
})
