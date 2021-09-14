"use strict";
// 设计模式 - 迪米特法则 
// 保持距离
// 类尽量少的向外暴露方法和属性
// 强耦合的写法
class InstallSoftware {
    constructor() { }
    // 把引导模块作为参数传递进近年来是没有问题的
    // 这是弱耦合
    installSoftware(wizard) {
        // 在函数执行的内部
        // 多次执行 Wizard 类的方法也没有问题也是弱耦合
        // 但是多次使用返回的执行结果
        // 这样是不合适的，这样是强耦合
        // 一旦Wizard类的方法需要修改，导致返回的参数类型发生了变化
        // 就会导致需要修改这个 InstallSoftware 类型
        // 所以不能够这样使用
        const fistStepDone = wizard.firstStep();
        let secondStepDone;
        let thirdStepDone;
        if (fistStepDone) {
            secondStepDone = wizard.secondStep();
        }
        else {
            throw new Error('安装程序出错');
        }
        if (secondStepDone) {
            thirdStepDone = wizard.thirdStep();
        }
        else {
            throw new Error("安装程序出错");
        }
        if (thirdStepDone) {
            return true;
        }
        else {
            throw new Error('安装程序出错');
        }
    }
}
function RandomBoolean() {
    return Math.random() > 0.5;
}
class Wizard {
    constructor() { }
    firstStep() {
        return RandomBoolean();
    }
    secondStep() {
        return RandomBoolean();
    }
    ;
    thirdStep() {
        return RandomBoolean();
    }
    ;
    done() {
        return RandomBoolean();
    }
    ;
}
// 修改后的弱耦合的写法
class InstallSoftware_v2 {
    constructor() { }
    // 弱耦合
    // 通过函数的参数传递了 KeepDistance.WizardV2 的类
    // 在函数的内部执行了 实例的一个方法
    // 没有使用实例函数返回的数据；
    installSoftware(wizard) {
        // 弱耦合
        // 只使用参数的一个方法
        // 不关心方法的实现
        wizard.installSoftware();
        // ……安装向导执行完成后，开始其他的安装程序
    }
}
class WizardV2 {
    constructor() { }
    firstStep() {
        return RandomBoolean();
    }
    secondStep() {
        return RandomBoolean();
    }
    ;
    thirdStep() {
        return RandomBoolean();
    }
    ;
    done() {
        return RandomBoolean();
    }
    ;
    installSoftware() {
        let step = 0;
        do {
            switch (step) {
                case 0:
                    step = this.firstStep() ? 1 : -1;
                    break;
                case 1:
                    step = this.secondStep() ? 2 : -1;
                    break;
                case 2:
                    step = this.thirdStep() ? 3 : -1;
                    break;
                default:
                    throw new Error('安装程序出错');
            }
            step = this.firstStep() ? 1 : -1;
        } while (step > 0 && step < 3);
        return true;
    }
}
