/**
 * Created by he on 2018/2/22.
 */

// class Foo {
//     constructor (...args) {
//         this.args = args ;
//     }
//     *[Symbol.iterator](){
//         for (let arg of this.args){
//             yield arg;
//         }
//     }
// }
// for(let x of new Foo('Hello','word')){
//     console.log(x)
// }


//class的静态方法,静态方法不会被继承，可以直接通过类来调用
class Foo {
  static classMethod(){
    return 'Holle';
  }
}

console.log(Foo.classMethod());
//如果该静态方法上包含this关键字，则this指向该类，而非该实例

class FooStatic {
  static bar(){
    this.baz();
    return 'Holle';
  }
  static baz(){
    console.error('123');
  }
  baz(){
    console.error('456');
  }
}
FooStatic.bar();
const object_foo = new FooStatic();
object_foo.baz();
//子类继承父类的静态方法
class Bar extends Foo{
  static classMethod (){
    return super.classMethod() + ',too';
  }
}

console.log(Bar.classMethod());
