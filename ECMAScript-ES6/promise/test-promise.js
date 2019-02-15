// 测试自定义的promise
// 引入promise
let Promise = require('./Promise');;
let task = new Promise(function(resolve,reject) {
  setTimeout(function(){
    let num = Math.random();//生成一个随机数
    console.log(num);
    if(num > .5){
      resolve('大成功');
    }else{
      reject('小失败');
    }
    },500);
  });
task.then((res) => {
  console.log('success' + res);
},(err) => {
  console.log('err' + err);
})
