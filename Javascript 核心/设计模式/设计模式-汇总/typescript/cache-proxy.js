"use strict";
// 缓存代理
// 缓存代理是代理模式的核心体现
var CacheProxyModule;
(function (CacheProxyModule) {
    CacheProxyModule.sum = function (...arg) {
        let total = 0;
        arg.forEach(n => total += n);
        return total;
    };
    /**
     * 代理
     */
    CacheProxyModule.sumProxy = (function () {
        let cache = new Map();
        return function (...arg) {
            let key = arg.join("-");
            let cacheValue = cache.get(key);
            if (cacheValue !== undefined) {
                console.log('直接返回缓存');
                return cacheValue;
            }
            else {
                let total = 0;
                arg.forEach(n => total += n);
                cache.set(key, total);
                console.log('计算');
                return total;
            }
        };
    })();
    // 使用原型链实现柯里化
    // 使用代理实现柯里化
    CacheProxyModule.curryingSum = (function () {
        let allArg = [];
        return function sum(...arg) {
            allArg = [...allArg, ...arg];
            if (arg.length !== 0) {
                return sum;
            }
            else {
                let total = 0;
                allArg.forEach(n => total += n);
                allArg = [];
                return total;
            }
        };
    })();
})(CacheProxyModule || (CacheProxyModule = {}));
// 使用代理模式实现柯里化操作；
// console.log(CacheProxy.sumProxy(1,2,3))
// console.log(CacheProxy.sumProxy(1,2,3))
// console.log(CacheProxy.sumProxy(1,2,3,4))
// console.log(CacheProxy.sumProxy(1,2,3,4))
console.log(CacheProxyModule.curryingSum(1, 2, 3)());
console.log(CacheProxyModule.curryingSum(1)(3, 2)());
