// 子进程
process.on('message',function(msg) {
    process.stdout.write('world');
    process.send('子进程的：' + JSON.stringify(msg))
})
