// spawn 产卵
let { spawn} = require('child_process');
let path = require('path');
let p1 = spawn('node',['test3.js'],{
    cwd:path.join(__dirname,'test1'),
    stdio: ['ipc', process.stdout,'ignore']
});
let p2 = spawn('node',['test2.js'],{
    cwd:path.join(__dirname,'test1'),
    stdio: ['pipe', 'pipe', 'pipe']
});
p1.on('close',function() {
    console.log('子进程1关闭！');

});
// 监听子进程发送的消息
p1.on('message', function (msg) {
    console.log(msg);
});
// ipc意味着父子进程之间靠消息进行通信
p1.send('hello');

p1.on('exit',function() {
    console.log('子进程1退出！');
});
p1.on('error',function() {
    console.log('子进程1失败！');
});
p2.on('error',function() {
    console.log('子进程2失败！');
});
