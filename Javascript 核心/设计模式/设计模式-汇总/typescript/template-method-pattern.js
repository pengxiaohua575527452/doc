"use strict";
// 概念
// 对于不同的事件，如果有着相同的处理步骤，但是具体的处理方式不同
// 把相同的处理步骤封装起来的函数就是模板方法
// 通过 子类覆写父类中的非模板方法的细节实现
// 实例
// 事件 发工资
// 事件 发奖金
// 给人员发工资 和 发奖金
var TemplateMethodPattern;
(function (TemplateMethodPattern) {
    let calculateSalary = function (baseSalary, unitPrice, total) {
        return baseSalary + unitPrice * total;
    };
    let calculateBonus = function (seniority, baseBonus) {
        return seniority * baseBonus;
    };
    let operationSalary = function (n) {
        console.log('把钱转银行账号： ', n, '元');
    };
    let operationBonus = function (n) {
        console.log('把现金发到手里:', n / 100, '元');
    };
    // 父类
    class Pay {
        constructor() {
        }
        pay(...arg) {
            let n = this.calculate(...arg);
            this.operation(n);
        }
        calculate(...arg) {
            return 0;
        }
        operation(n) {
        }
    }
    // payOff
    class PayOff extends Pay {
        constructor() {
            super();
            this.calculate = calculateSalary;
            this.operation = operationSalary;
        }
    }
    // payBonus
    class PayBonus extends Pay {
        constructor() {
            super();
            this.calculate = calculateBonus;
            this.operation = operationBonus;
        }
    }
    const payOff = new PayOff();
    payOff.pay(100, 1, 10);
    // 输出 把钱转银行账号：  110
    const payBonus = new PayBonus();
    payBonus.pay(2200, 100);
})(TemplateMethodPattern || (TemplateMethodPattern = {}));
