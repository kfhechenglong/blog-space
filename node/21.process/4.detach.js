// detach 默认情况下，父进程要等待所有的子进程全部完成后才能退出；
// 但是如果子进程设置为detach=true，则此子进程就可以脱离父进程单独存在
let pd = require('child_process');
let fs = require('fs');
let path = require('path');
let fd = fs.openSync(path.join(__dirname,'msg.txt'),'w',0o666);
let p1 = pd.spawn('node',['test4.js'],{
    cwd:path.join(__dirname,'test1'),
    stdio:['ignore',fd,'ignore'],
    detached:true
});
p1.on('error',function(err) {
    console.log(err);
});
// unref 父进程退出，子进程继续运行
p1.unref();
