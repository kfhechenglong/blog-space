// spawn 产卵
let { spawn } = require('child_process');
let path = require('path');
let p1 = spawn('node', ['test1.js'], {
    cwd: path.join(__dirname, 'test1'),
    stdio: [process.stdin, process.stdout, 'pipe']
});
let p2 = spawn('node', ['test2.js'], {
    cwd: path.join(__dirname, 'test2'),
    stdio: ['pipe', 'pipe', 'pipe']
});
p1.on('close', function () {
    console.log('子进程1关闭！');

});
p1.on('exit', function () {
    console.log('子进程1退出！');
});
p1.on('error', function () {
    console.log('子进程1失败！');
});
p2.on('error', function () {
    console.log('子进程2失败！');
});
