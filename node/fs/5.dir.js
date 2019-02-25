/**
 * Created by jhon on 2019/2/23.
 */
/*
* 删除文件用fs.unlink
* 删除文件夹用fs.rmdir，这里的删除一定是一个非空目录
* */
let fs = require('fs');
let path = require('path');
function rmdirSync(dir) {
  let files = fs.readdirSync(dir);
  files.forEach( item => {
    let child = fs.statSync(path.join(dir,item));
    if(child.isDirectory()) {
    //  文件夹 递归删除文件夹
      rmdirSync(path.join(dir,item));
    } else {
      fs.unlinkSync(path.join(dir,item));
    }
  })
//  删除最后的空目录
  fs.rmdirSync(dir)
};
//rmdirSync('a');

//异步递归删除非空文件夹

function rmdir(dir){
  return new Promise(function (resolve,reject) {
    fs.stat(dir,(err,stat) => {
      if (err) return reject(err);
      if(stat.isDirectory()) {
        fs.readdir(dir,(err,files) => {
          if(err) return reject(err);
          //  先删除当前目录的子文件夹或文件，再删除自己
          Promise.all(files.map(item => rmdir(path.join(dir,item)))).then(() => {
            fs.rmdir(dir,resolve);
          });
        });
      } else {
        fs.unlink(dir,resolve)
      }
    })

  })
}
rmdir('a').then((res) => {
  console.log(res);
}).catch((err) => {
  console.log(err);
});
