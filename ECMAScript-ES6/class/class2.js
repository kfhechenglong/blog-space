/**
 * Created by he on 2018/2/22.
 */
"use strict";


 // class Point{
 //    constructor(){
 //        // return this;
 //        return Object.create(null);
 //    }
 // }
 // console.log(new Point() instanceof Point)

class Point{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
    toSting() {
        return '(' + this.x + ', ' + this.y + ')';
    }
}

const point =  new Point(2,3);

const string = point.toSting(1,2);
console.log(point.hasOwnProperty('x'));
console.log(point.hasOwnProperty('toString'));

console.log(string);

// 采用class 表达式，可以写出立即执行的class

let person = new class {
    constructor (name){
        this.name = name;
    }
    sayName(){
        return this.name;
    }
}('老何');
console.log(person.sayName());


    //私有方法和私有属性
    class Widget {
        foo (baz) {
            this._bar(baz);
            bar.call(this,baz)
        }
    //    私有方法
        _bar (baz) {
            return this.snaf = baz;
        }
    }

    function bar(baz){
        return this.snaf = baz;
    }
    const newClass = new Widget();
    newClass.foo(123);

    //关于this的指向
class Logger {
    printName(name = "there"){
        this.print(`Hello ${name}`)
    }

    print (text) {
        console.log(text);
        return this;
    }
}
// class Logger {
//     constructor() {
//         this.printName = this.printName.bind(this);
//     }
//     printName(name = "there"){
//         this.print(`Hello ${name}`)
//     }
//
//     print (text) {
//         console.log(text);
//         return this;
//     }
// }

function selfish (target) {
    const cache = new WeakMap();
    const hanlder = {
        get (target, key) {
            const value = Reflect.get(target,key);
            if(typeof value !== 'function'){
                return value;
            }
            if(!cache.has(value)){
                cache.set(value,value.bind(target));
            }
            return cache.get(value);
        }
    };
    const proxy = new Proxy(target,hanlder);
    return proxy;
}
const logger = selfish(new Logger());

// const logger = new Logger();
const { printName} = logger;
printName();

