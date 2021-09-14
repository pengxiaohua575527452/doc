"use strict";
// 单一职责原则讲解
// 一个接口指负责一个功能
// 面向接口编程
// 例如 规划用户账号类
// 单一职责只负责名称的保存更改和查询
class Name {
    constructor(name = "") {
        this.__name = name;
    }
    getName() {
        return "我的名字叫做： " + this.__name;
    }
    setName(name) {
        this.__name = name;
    }
}
// 单一职责只负责密码的保存更改和查询
// 为全部的需要密码的对象提供
class Password {
    constructor(password = "") {
        this.__password = password;
    }
    getPassword() {
        return this.__password;
    }
    setPassword(password) {
        this.__password = password;
    }
}
// 超类只是起到组合的关系
// 两个一级子类相互之间是隔离的相互影响
class Account {
    constructor(n = "", p = "") {
        const name = new Name(n);
        const password = new Password(p);
        this.__name = name.__name;
        this.getName = name.getName;
        this.setName = name.setName;
        this.__password = password.__password;
        this.getPassword = password.getPassword;
        this.setPassword = password.setPassword;
    }
}
const account = new Account();
account.setName("bill");
console.log(account.getName());
const account2 = new Account('jack');
console.log(account2.getName());
// 单一职责原则
// 一个接口or一个类只负责一个职责
// 例如
// interface Name{} 只负责名称的保存和访问；
// class Name{} 只实现了 interface Name{} 的接口
// 这样如果我们幼对name职责更改的时候只需要修改这个 interface 和 class 即可
// 这个类是一级类负责具体的实现
// class Account 只负责组合不负责具体的实现
// 所以这个类是超集
