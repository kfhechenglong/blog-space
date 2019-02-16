//发布订阅模式
function Dep() {
  this.subs = [];
};
// 添加订阅
Dep.prototype.addSub = function (sub) {
  this.subs.push(sub);
}
Dep.prototype.notify = function () {
  this.subs.forEach(function (sub) {
    sub.update();
  })
}

// 监听函数
function Watcher (vm,exp,fn) {
  this.fn = fn;
  this.vm = vm;
  this.exp = exp;
  Dep.target = this;
  let val = vm;
  let arr = exp.split('.');
  arr.forEach(function (k) {
    val = val[k];
  })
  Dep.target = null;
}
Watcher.prototype.update = function () {
  let val = this.vm;
  let arr = this.exp.split('.');
  arr.forEach(function (k) {
    val = val[k];
  })
  this.fn(val);
}


