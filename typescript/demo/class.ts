class Greeter {
    greeting:string
    constructor(message:string){
        this.greeting = message;
    }
    greet(){
        return 'holle ' + this.greeting
    }
}
let greeter = new Greeter('word');
console.log(greeter.greet());

class Animal {
    name:string
    constructor(name:string){
        this.name = name;
    }
    move(distance:number){
        console.log(`${this.name} moved ${distance}`)
    }
}
class Snake extends Animal {
    constructor(name:string){
        super(name)
    }
    move(distance:number = 5){
        console.log('Slithering....');
        super.move(distance);
    }
}

class Horse extends Animal {
    constructor(name:string) {
        super(name)
    }
    move(distance:number = 45){
        super.move(distance);
    }
}

const snake = new Snake('snake');
const horse = new Horse('horse');
snake.move();
horse.move();
