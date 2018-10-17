/**
* Created by 绝对零
* Copyright © 2018年 he. All rights reserved
* date 2018年10月17日
*/

// 这个函数创建一个新的枚举类型，实参对象表示类的每个实例的名字和值
// 返回值是一个构造函数，它标识这个新类
// 注意，这个构造函数也会抛出异常；不能使用它来创建该类型的新实例
// 返回的构造函数包含名、值对的映射表
function enumeration (nameToValues) {
    // 这个虚拟的构造函数是返回值
    var enumeration = function () {throw "Cant't Instantiate Enumeration";}
    // 枚举值继承自这个对象
    var proto = enumeration.prototype = {
        constructor : enumeration,
        toString :function () {
            return this.name;
        },
        valueOf : function (){
            return this.value;
        },
        toJson :function () {
            return this.name;
        }
    };
    enumeration.values = [];//用以存放枚举对象的数组

    // 创建新类型的实例
    for (var name in nameToValues) {
        var e = inherit(proto);
        e.name = name;
        e.value = nameToValues[name];
        enumeration[name] = e;
        enumeration.values.push(e);
    }
    
    // 一个类方法，用来对类的实例进行迭代
    enumeration.foreach = function (f,c) {
        for (let i = 0; i < this.values.length; i++) {
            f.call(c,this.values[i])
        }
    }
    return enumeration;
};
// // 使用4个值创建类的Coin类
// var Coin = enumeration ({Penny:1,Nickel:5,Dime:10,Quarter:25});
// console.log(Coin);

// var c = Coin.Dime;
// console.log(c instanceof Coin);
// console.log(Coin.Dime);
// console.log(Coin.Nickel);

// 创建一副扑克牌
function Card (suit,rank){
    this.suit = suit;//每张牌都有花色
    this.rank = rank;//点数
};
// 使用枚举类型定义花色的和点数
Card.Suit = enumeration({Clubs:1,Diamonds:2,Hearts:3,Spades:4});
Card.Rank = enumeration({Two:2,Three:3,Four:4,Five:5,Six:6,Seven:7,Eight:8,Nine:9,Ten:10,Jack:11,Queen:12,King:13,Ace:14});
// 定义用以描述牌面的文本
Card.prototype.toString = function (){
    return this.rank.toString() + 'of' +this.suit.toString();
};
// 比较扑克牌中两张牌的大小
Card.prototype.compareTo = function (that) {
    if(this.rank < that.rank) return -1;
    if(this.rank > that.rank) return 1;
    return 0;
};
// 以扑克牌的玩法对牌进行排序的函数
Card.oderByRank = function (a,b){return a.compareTo(b)};
// 以桥牌的玩法规则对牌进行排序的函数
Card.orderBySuit = function (a,b){
    if(a.suit < b.suit) return -1;
    if(a.suit > b.suit) return 1;
    if(a.rank < b.rank) return -1;
    if(a.rank > b.rank) return 1;
    return 0;
}
// 定义用以表示一副标准扑克牌的类
function Deck() {
    var cards = this.cards = [];
    Card.Suit.foreach(function (s){
        Card.Rank.foreach(function(r){
            cards.push(new Card(s,r));
        })
    })
};

// 洗牌的方法，重新洗牌并返回洗好的牌
Deck.prototype.shuffle = function(){
    // 遍历数组中的每一个元素，随机找出牌面最小的元素，并与之交换
    var deck = this.cards,len = deck.length;
    for (let i = len - 1; i > 0; i--) {
        var r = Math.floor(Math.random()* (i+1)),temp;
        temp = deck[i],deck[i] = deck[r];deck[r] = temp;
    }
    return this;
}
// 发牌的方法，返回牌的数组
Deck.prototype.deal = function (n) {
    if(this.cards.length < n) throw "Out of cards";
    return this.cards.splice(this.cards.length - n ,n);
};
// 创建一副扑克牌，洗牌并发牌
var a = new Deck();
console.log(a);

var deck = a.shuffle();
console.log(deck);

var hand = deck.deal(13).sort(Card.orderBySuit);
console.log(hand);
