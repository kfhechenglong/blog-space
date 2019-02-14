// 构建一个Promise异步任务
function Promise(task){
  let that = this;//缓存this
  // 设置状态，默认设置为pending
  that.status = 'pending';
  // 存放Promise的结果值；
  that.value = undefined;
  // 保存所有成功的回调函数
  that.onResolvedCallbacks = [];
  // 保存所有失败的回调函数
  that.onRejectCallbacks = [];
  // 将状态变成成功！
  const resolve = function (value) {
    if (value instanceof Promise) {
      return value.then(resolve,reject);
    }
    if (that.status === 'pending') {
      that.status = 'fulfilled';
      that.value = value;
      that.onResolvedCallbacks.forEach( item => item(that.value));
    }
  };
  const reject = function (reason) {
    // 如果当前状态时初始态，则转换成失败状态
    if (that.status === 'pending') {
      that.status = 'rejected';
      that.value = reason;
      that.onRejectCallbacks.forEach(item => item(that.value));
    }
  }

  // 执行传入的任务
  try {
    task(resolve,reject);
  } catch (error) {
    reject(error);
  }
}
// 定义Promeis的回调函数
function resolvePromise(promise_2,x,resolve,reject) {
  let then;
  if (promise_2 === x) {//如果x与promise_2为同一任务，则报错，不能循环引用；
    return reject(new TypeError('loop task'))
  }
  if (x instanceof Promise) {
    // 如果x是一个promise
    if (x.status == 'pending') {
      //  如果为初始状态，则继续调用
      x.then(function(y) {
        resolvePromise(promise_2,y,resolve,reject);
      })
    } else if (x.status == 'fulfilled') {
      resolve(x.value);
    } else if (x.status == 'rejected') {
      reject(x.value);
    }
  } else if (x != null && (typeof x === 'object' || typeof x === 'function')){
    try {
      then = x.then;
      if(typeof then === 'function'){
        then.call(x,function(y) {
          resolvePromise(promise_2,y,resolve,reject);
        },reject);
      }
    } catch (error) {
      reject(error);
    }
  } else {
    resolve(x);
  }
}

//
Promise.prototype.then = function(onFulfilled,onRejcect){
  // 检查是否有成功和失败时的回调函数，没有就定义回调函数
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : function(value) { return value};
  onRejcect = typeof onRejcect === 'function' ? onRejcect : function(reason) {return reason};
}

