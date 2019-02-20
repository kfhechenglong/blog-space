// 在nodejs中采用require加载其它模块，加载模块是同步进行的
// 1、找到要加载的文件
// 2、读取此文件的模块的内容
// 3、把模块的内容封装到立即执行函数中
// 4、执行后把模块module.export对象赋值给useschool变量
//
//同一个文件require加载多次时，会被缓存，只加载一次

// require的主要属性 resolve main extensions catch 等等

// 当require加载一个模块时，会先找user.如果找不到，就会再找user.js 如果还找不到就找user.json 最后找user.node文件

// 当你想知道一个模块的绝对路径的时候，又不想去加载该模块，可以用resolve方法
console.log(require.resolve('./school'));


let useschool = require('./school');
console.log(useschool);

