// 调用父类的静态方法
class Human {
  constructor(){

  }
  static ping(){
    return 'test static';
  }
}
class Computer extends Human {
  constructor(){

  }
  static pingpong(){
    return super.ping() + 'pong';
  }
}
let a = Computer.pingpong();
console.log(a);
