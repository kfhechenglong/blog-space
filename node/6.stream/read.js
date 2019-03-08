/**
 * Created by jhon on 2019/3/2.
 */
let fs = require('fs');
let rs = fs.createReadStream('./2.txt',{
  flags:'r',
  mode:0o666,
  start:3,
  end:8,
  autoClose:true,
  highWaterMark:3,
  encoding:'utf8'
});
rs.on('open',() => {
  console.log('文件已被打开！');
});
rs.on('data',(data) => {
  console.log(data);
});
rs.on('end',function() {
  console.log('文件以关闭！');
});
rs.on('error',(error) => {
  console.log(error);
})
