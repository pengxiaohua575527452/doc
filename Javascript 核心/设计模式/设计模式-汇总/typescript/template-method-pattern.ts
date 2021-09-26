// 概念
// 对于不同的事件，如果有着相同的处理步骤，但是具体的处理方式不同
// 把相同的处理步骤封装起来的函数就是模板方法
// 通过 子类覆写父类中的非模板方法的细节实现


// 实例
// 事件 发工资
// 事件 发奖金
// 给人员发工资 和 发奖金

module TemplateMethodPattern {

declare namespace Type {
    /**
     * 基础接口 发薪
     */
    interface Pay {
        pay: Pay.Pay
        calculate: Pay.Calculate
        operation: Pay.Operation


    }
    namespace Pay {
        interface Pay {
            (...arg: any): void
        }
        interface Calculate {
            (...arg: any): number
        }
        interface  Operation {
            (n: number): void
        }
    }
}

let calculateSalary: Type.Pay.Calculate =  function (baseSalary: number, unitPrice: number, total: number){
    return baseSalary + unitPrice * total
}

let calculateBonus: Type.Pay.Calculate = function (seniority: number, baseBonus: number){
    return seniority * baseBonus;
}

        
let operationSalary: Type.Pay.Operation = function(n: number){
    console.log('把钱转银行账号： ', n, '元')
}

let operationBonus: Type.Pay.Operation = function(n: number){
    console.log('把现金发到手里:', n / 100 , '元')
}




// 父类
class Pay implements Type.Pay{
    constructor(){

    }
    pay(...arg: any){
        let n = this.calculate(...arg)
        this.operation(n)
    }

    calculate(...arg: any): number{
        return 0;
    }

    operation(n: number): void{

    }
    
}

// payOff
class PayOff extends Pay {
    constructor(){
        super()
    }
    calculate = calculateSalary
    operation = operationSalary
}

// payBonus
class PayBonus extends Pay {
    constructor(){
        super()
    }
    calculate = calculateBonus
    operation = operationBonus
}

const payOff = new PayOff()

payOff.pay(100, 1, 10)
// 输出 把钱转银行账号：  110

const payBonus = new PayBonus()
payBonus.pay(2200, 100)


}
