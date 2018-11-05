// function Point(x,y) {
//     this.x = x;
//     this.y = y;
// }
// // debugger
// Point.prototype.toString = function(){
//     return '(' + this.x + ',' + this.y + ')';
// }
// var p = new Point(2,3);

class Point {
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
    toString(){
        return '(' + this.x + ',' + this.y + ')';
    }
}
var a = new Point(1,2);
// console.log(a.toString())
// console.log(typeof Point);
// console.log(Point === Point.prototype.constructor)
console.log(a.constructor === Point.prototype.constructor)

const toValue = ()=>{
    return (222 + 111)
};
// 类的对象都定义在prototype对象上面，所以类的新方法可以添加在Prototype对象上面
Object.assign(Point.prototype,{
    toValue
});
console.log(a.toValue());
// class内部定义的方法是不可枚举的，这一点是与ES5的行为不一致
console.log(Object.keys(Point.prototype))
// 可以通过getOwnPrototypeNames获取属性名数组

console.log(Object.getOwnPropertyNames(Point.prototype))


// 类的属性名，可以通过采用表达式
let methoName = 'getArea';
class Square {
    constructor(length){

    }

    [methoName](){
        return 'aaaa'
    }
}
const b = new Square();
console.log(b.getArea());