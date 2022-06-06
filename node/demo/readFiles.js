const fs = require('fs');
const stdin = process.stdin;
const stdout = process.stdout;
fs.readdir(process.cwd(),function(err,files) {
    console.log(' ');
    if(!files.length) {
        return console.log(' \033[31m No files to show !\033[39m\n')
    }
    console.log('Selet which file or directory you want to see \n');


    let stats = [];
    // 读取文件
    function file(i) {
        const filename = files[i];
        fs.stat(__dirname + '/' + filename, function(err,stat) {
            stats[i] = stat;
            if(stat.isDirectory()){
                console.log(' '+i+ ' \033[36m' + filename + ' /\033[39m');
            } else {
                console.log(' '+i+ ' \033[90m' + filename + ' /\033[39m');
            }
            i++;
            if (i == files.length) {
                read();
            } else {
                file(i)
            }
        })
    }

    function read(){
        console.log(' ');
        stdout.write('  \033[33m Enter your choice \033[39m');
        stdin.resume();
        stdin.setEncoding('utf8');
        stdin.on('data',option);
    }

    function option(data) {
        let filename = files[Number(data)];
        if(!filename) {
            stdout.write(' \033[31m Enter your choice \033[39m')
        } else {
            stdin.pause();
            console.log(filename)
            if(stats[Number(data)].isDirectory()) {
                fs.readdir(__dirname + '/' + filename ,function(err,file) {
                    console.log(' ');
                    console.log(' (' + file.length + ' files');
                    file.forEach((item,index) => {
                        console.log('  _  ' + item)
                    })
                    console.log( ' ');
                })


            } else {
                fs.readFile(__dirname + '/' + filename,'utf8',function(err,data) {
                    console.log(' ');
                    console.log('\033[90m' + data.replace(/(.*)/g, '   $1') + '\033[39m')
                })
            }

        }
    }


    file(0);
})
