// interface Person {
//     firstName:string,
//     lastName:string
// }

// function greeter(person:Person) {
//     return 'Hello ' + person.firstName + person.lastName;
// };
// let user = {
//     firstName:'he',
//     lastName:'chenglong'
// }
// console.log(greeter(user));

interface SquareConfig {
    color?: string
    width?: number
}
function createSquare (config:SquareConfig) {
    let newSquare = {color:'white',area:10};
    if(config.color){
        newSquare.color = config.color;
    }
    if(config.width) {
        newSquare.area = config.width * config.width;
    }
    return newSquare
}
let squareOptions = {coloru:'black',width:100};
let getSquare = createSquare(squareOptions);

console.log(getSquare);

// 定义函数的接口
interface SearchFunc {
    (source: string,subString: string):boolean
}

let mySearch: SearchFunc
mySearch = function(source:string, subString: string): boolean {
    let result = source.search(subString);
    return result > -1;
}

// 索引类型
interface StringArray {
    [index: number]: string
}
let myArray: StringArray
myArray = ['hechenglong','jueduilingdu'];
console.log(myArray);


// 类的接口
interface ClockInterface {
    tick():any
}

interface ClockConstructor {
    new (hor:number,minute:number):ClockInterface
}

function createClock(ctor:ClockConstructor,hour: number,minute: number): ClockInterface {
    return new ctor(hour,minute);
}

class DigitalClock implements ClockInterface {
    constructor(h:number,m:number){

    }
    tick() {
        console.log('beep beep');
    }
}
class AnalogClock implements ClockInterface {
    constructor(h:number,m:number){

    }
    tick():any{
        console.log('tick tick');
    }
}

let digital = createClock(DigitalClock,12,13);
let gnalog = createClock(AnalogClock,10,23);


// 接口的继承
interface Shape {
    color: string
}
interface PenStroke {
    penWidth:number
}
interface Square extends Shape,PenStroke{
    sideLenght:number
}
let square = {} as Square
square.color = 'blue';
square.penWidth = 20;
square.sideLenght = 10;
console.log(square);


// 接口继承类

class Control {
    private state:any
}
interface SelecableControl extends Control {
    select():any
}
class Button extends Control implements SelecableControl {
    select(){

    }
}

class TextBox extends Control {
    select(){

    }
}

