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
