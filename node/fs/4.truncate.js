/**
 * Created by jhon on 2019/2/23.
 */
let fs = require('fs');
//截断文件
fs.truncate('./node/4.stream/2.txt',5,(err) => {
  console.log(err);
  console.log('文件已截断！')
});
