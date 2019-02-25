/**
 * Created by jhon on 2019/2/23.
 */
let  fs = require('fs');
let path = require('path');
/*
* 异步的先序深度优先遍历
* */

function preDeep(dir,callback) {
  fs.readdir(dir,(err,files) => {
    !function next(i){
      if(i >= files.length) return callback();
      let child = path.join(dir,files[i]);
      fs.stat(child, (err,stat) => {
        console.log(child);
        if(stat.isDirectory()) {
          preDeep(child,() => next(i+1));
        } else {
          next(i+1);
        }
      })
    }(0);
  })
};
preDeep('a',() => {
  console.log('遍历完成！')
});
