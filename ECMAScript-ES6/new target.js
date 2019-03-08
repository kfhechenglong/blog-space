class TestA {
  constructor() {
    console.log(new.target);
  }
}
class TestB extends TestA {
  constructor() {
    super()
  }
}
// new TestA();
new TestB();

// Bind 方法
// bind方法会将要绑定的函数的this指向，永久的绑定到第一个绑定的参数中，后面的绑定将无效；
function f() {
  return this.a;
}
let testObject = {a:'123'};
let testObject2 = {a:'456'};
let f_bind1 = f.bind(testObject);
let f_bind2 = f.bind(testObject2);
let f_bind3 = f_bind1.bind(testObject2);
console.log(f());
console.log(f_bind1());
console.log(f_bind2());
console.log(f_bind3());
