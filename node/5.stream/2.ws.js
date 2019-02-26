/**
 * Created by jhon on 2019/2/25.
 * 可写流
 */
let  fs = require('fs');
//当往流中写入数据时，不是立即写入文件中的，而是先写入缓存区，待缓存区满后再一次性写入文件中

let  ws = fs.createWriteStream('./2.txt',{
  flags:'w',
  mode:0o666,
  start:0,
  highWaterMark:3
});
//如果缓存区已满，返回false，如果未满返回true;
let flag = ws.write('1');
console.log(flag);
ws.write('2');
