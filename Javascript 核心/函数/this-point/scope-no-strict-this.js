// 作为函数

function fn(){
    console.log('预期输出 Window: ', this)
}

fn()

let fn1 = () => {
    console.log('预期输出 window: ', this)
}


// 作为方法
let bill = {
    name: 'bill',
    fn: function(){
        console.log('预期输出 bill: ', this)
    },
    fn1: () => {
        console.log('预期输出 window: ', this)
    }
}

bill.fn()
bill.fn1()

class Person {
    name = "person"
    fn= function(){
        console.log('预期输出 person 实例： ', this)
    }
    fn1 = ()=>{
        console.log('预期输出 person 实例： ', this)
    }
}

const person = new Person()
person.fn()
person.fn1();


// 把对象的方法作为函数调用
const jack = {
    name: 'jack',
    fn: function(){
        console.log('把对象的方法作为函数调用 预期输出 window: ', this)
    },
    fn1: () => {
        console.log('把对象的方法作为函数调用 预期输出 window: ', this)
    }
}

let fn3 = jack.fn
let fn4 = jack.fn1;
fn3()
fn4()

class Person2 {
    name = 'person2'
    fn = function(){
        console.log('把类的实例方法作为函数调用 预期输出 undefined class 会采用严格模式: ', this)
    }
    fn1 = () => {
        console.log('把类的实例方法作为函数调用 预期输出 Person2 的实例： ', this)
    }
}
const person2 = new Person2();

let fn5 = person2.fn;
let fn6 = person2.fn1;

fn5();
fn6();

 