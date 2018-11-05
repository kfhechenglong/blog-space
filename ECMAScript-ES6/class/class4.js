/**
 * Created by he on 2018/2/22.
 */
function Person(name){
    if(new.target !== undefined){
        this.name = name;
    } else{
        throw new Error('必须使用 new 命令生成实例');
    }
}

const person = new Person('老何');
// const errPerson = Person.call(person,'old');

class Rectangle {
    constructor (length,width){
        console.log(new.target === Rectangle);
        this.length = length;
        this.width = width;
    }
}

let obj = new Rectangle(3,4);
//需要注意的是，子类继承父类时，new.target会返回子类；
class Rectangle1 {
    constructor (length,width){
        console.log(new.target === Rectangle);
    }
}
class Square extends Rectangle1{
    constructor (length) {
        super(length, length);
    }
}
let obj1 = new Square(3);