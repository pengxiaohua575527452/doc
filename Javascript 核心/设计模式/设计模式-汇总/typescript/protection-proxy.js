"use strict";
// 保护代理
// 通过 Proxy 对象实现
/**
 * 原始对象
 */
class Name {
    constructor(name) {
        this.name = name;
    }
    getName() {
        return this.name;
    }
    updateName(name) {
        this.name = name;
        return this;
    }
}
/**
 * Proxy 代理访问
 */
const handle = {
    set(target, key, value, receiver) {
        if (key === 'name' && value.key && value.key === 1) {
            return Reflect.set(target, key, value.value, receiver);
        }
        else if (key === 'name') {
            console.error('禁止设置名称');
            return false;
        }
        return Reflect.set(target, key, value, receiver);
    }
};
const billProxy = new Proxy(new Name("bill"), handle);
try {
    billProxy.name = "new bill";
}
catch (err) {
}
// 通过密钥访问
try {
    billProxy.name = { value: "new bill", key: 1 };
}
catch (err) {
}
console.log(billProxy.name);
