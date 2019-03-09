/*  */
class Polygon {
  constructor(height,width) {
    this.name = 'Polygon';
    this.height = height;
    this.width = width;
  }
  sayName() {
    console.log('Hi I am a' ,this.name + '.');
  }
}
class Square extends Polygon {
  constructor(length) {
    super(length,length);//必须先调用super，否则会报错！
    this.name = 'Square';
    this.height = length;
  }
  get area() {
    return this.height *this.height;
  }
  set area(value){
    this.area = value;
  }
  remove() {
    // 不能使用delete操作符删除super上的属性，这样会抛出错误！

    delete super.sayName;
  }
}
let square = new Square(10);
square.sayName();
// square.remove();    // Unsupported reference to 'super'
let area = square.area;
console.log(area);

// class X {
//   constructor() {
//     Object.defineProperty(this,'prop',{
//       value:1,
//       writable:false,
//       configurable:true
//     })
//   }
//   f() {
//     super.prop = 2;
//   }
// }
// // super 不能重写不可写属性，
// let x = new X()
// x.f();
