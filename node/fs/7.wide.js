/**
 * Created by jhon on 2019/2/23.
 */
let fs = require('fs');
let path = require('path');
/*
* 遍历文件的广度
* */
//同步方法
function wide(dir) {
  let arr = [dir];
  while (arr.length > 0){
    let current = arr.shift();//获取队列左边的元素
    console.log(current);
    let stat = fs.statSync(current);
    if(stat.isDirectory()) {
      let files = fs.readdirSync(current);
      files.forEach(item => {
        arr.push(path.join(current,item));
      })
    }
  }
};
wide('a');


