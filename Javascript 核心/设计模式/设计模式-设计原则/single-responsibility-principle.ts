// 单一职责原则讲解
// 一个接口指负责一个功能
// 面向接口编程
// 例如 规划用户账号类



declare namespace SRP {
    // 用户基础信息
    interface AccountBO extends Name, Password {}
    interface PasswordName extends Name, Password{}

    // 名称
    interface Name{
        __name: Name.Name;
        getName():Name.Name;
        setName(name: Name.Name):void;
    }
    namespace Name{
        type Name = String;
    }

    // 
    interface Password {
        __password: Password.Password;
        getPassword(): Password.Password;
        setPassword(password: Password.Password): void;
    }
    namespace Password {
        type Password = String;
    }

}


// 单一职责只负责名称的保存更改和查询
class Name implements SRP.Name {
    __name: SRP.Name.Name  
    constructor(name: SRP.Name.Name = ""){
        this.__name = name;
    }
    getName(){
        return "我的名字叫做： "+this.__name;
    }

    setName(name: SRP.Name.Name){
        this.__name =name
    }
}

// 单一职责只负责密码的保存更改和查询
// 为全部的需要密码的对象提供
class Password implements SRP.Password {
    __password: SRP.Password.Password ;
    constructor(password: SRP.Password.Password = ""){
        this.__password = password;
    }
    getPassword(){
        return this.__password
    }

    setPassword(password: SRP.Password.Password){
        this.__password = password;
    }
}
 
 
// 超类只是起到组合的关系
// 两个一级子类相互之间是隔离的相互影响
class Account implements SRP.AccountBO {
    constructor(
        n: SRP.Name.Name = "",
        p: SRP.Password.Password = ""

    ){
        const name = new Name(n)
        const password = new Password(p);
        this.__name = name.__name;
        this.getName = name.getName;
        this.setName = name.setName;

        this.__password = password.__password;
        this.getPassword = password.getPassword;
        this.setPassword = password.setPassword;
    }

    // 账号名称
    __name: SRP.Name.Name;
    getName: { (): SRP.Name.Name}
    setName: { (name:  SRP.Name.Name): void}

    // 账号密码
    __password: SRP.Password.Password;
    getPassword: { (): SRP.Password.Password};
    setPassword: { (password: SRP.Password.Password): void}
}

const account = new Account()
account.setName("bill")
console.log(account.getName())

const account2 = new Account('jack')
console.log(account2.getName())

// 单一职责原则
// 一个接口or一个类只负责一个职责
// 例如
// interface Name{} 只负责名称的保存和访问；
// class Name{} 只实现了 interface Name{} 的接口
// 这样如果我们幼对name职责更改的时候只需要修改这个 interface 和 class 即可
// 这个类是一级类负责具体的实现

// class Account 只负责组合不负责具体的实现
// 所以这个类是超集



