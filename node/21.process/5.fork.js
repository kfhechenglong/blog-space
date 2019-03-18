let { fork} = require('child_process');
let path = require('path');
let child = fork('fork.js',['hechenglong'],{
    cwd:path.join(__dirname,'test1'),
    silent:true
});
child.on('message' ,function (data) {
    console.log(data);
});
child.send({name:'hechenglong'});
child.on('error',function (error) {
    console.log(error);
});
