function Clock() {
  this.listener;
  let that = this;
  process.nextTick(function (){
    that.listener();
  })
};
Clock.prototype.add = function (listener) {
  this.listener = listener;
};
let clock = new Clock();
clock.add(function(){
  console.log('this is test a');
})
