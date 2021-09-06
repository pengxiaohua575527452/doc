"use strict"
console.error('开始严格模式----------------------------')
// 作为函数
function fn10(){
    console.log('预期输出 undefined: ', this)
}

fn10()

let fn100 = () => {
    console.log('预期输出 undefined: ', this)
}


// 作为方法
let bill10 = {
    name: 'bill',
    fn: function(){
        console.log('预期输出 bill: ', this)
    },
    fn1: () => {
        console.log('预期输出 window: ', this)
    }
}

bill10.fn()
bill10.fn1()

class Person10 {
    name = "person"
    fn= function(){
        console.log('预期输出 person 实例： ', this)
    }
    fn1 = ()=>{
        console.log('预期输出 person 实例： ', this)
    }
}

const person10 = new Person10()
person10.fn()
person10.fn1();


// 把对象的方法作为函数调用
const jack10 = {
    name: 'jack',
    fn: function(){
        console.log('把对象的方法作为函数调用 预期输出 undefined: ', this)
    },
    fn1: () => {
        console.log('把对象的方法作为函数调用 预期输出 window: ', this)
    }
}

let fn310 = jack10.fn
let fn410 = jack10.fn1;
fn310()
fn410()

class Person29 {
    name = 'person29'
    fn = function(){
        console.log('把类的实例方法作为函数调用 预期输出 undefined class 会采用严格模式: ', this)
    }
    fn1 = () => {
        console.log('把类的实例方法作为函数调用 预期输出 Person2 的实例： ', this)
    }
}
const person29 = new Person29();

let fn59 = person29.fn;
let fn69 = person29.fn1;

fn59();
fn69();

console.log(Person29._this)

 