const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();

myEmitter.on('event', test);
var count = 0;
function test() {
  console.log(++count);
}
myEmitter.emit('event');
// 将参数和this传递给监听器
// EventEmitter.emit()方法可以传递任意数量的参数到监听器函数
myEmitter.on('eventArg',function(a,b) {
  console.log(a,b,this,this === myEmitter);
})
myEmitter.emit('eventArg','a','b');
// 当使用箭头函数时，this不会指向myEmitter;

// EventEmitter 会按照监听器注册的顺序同步的调用所有的监听器，
myEmitter.on('event', test2);
function test2() {
  setTimeout(() => {
    console.log('test2');
    // 此处为异步调用
  }, 10);
}
myEmitter.emit('event');

// 使用eventEmitter.once()可以注册最多可调用一次的监听器，当事件被触发时，监听器就会被注销，然后再调用
let once_count = 4;
myEmitter.once('event_once',function () {
  console.log(++once_count);
});
myEmitter.emit('event_once');
myEmitter.emit('event_once');

// 错误事件监听

myEmitter.on('error', (err) => {
  console.error('错误信息');
});
myEmitter.emit('error', new Error('错误信息'));
