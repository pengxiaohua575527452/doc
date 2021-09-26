// 缓存代理
// 缓存代理是代理模式的核心体现



module CacheProxyModule{
    export declare namespace CacheProxy{
        interface Sum{
            (...arg: number[]): number
        }

        interface CurryingSum {
            (...arg: number[]): CurryingSum
        }
    }



    export const sum: CacheProxy.Sum = function(...arg: number[]): number{
        let total: number = 0;
        arg.forEach(n => total+=n)
        return total;
    }

    /**
     * 代理
     */
    export const sumProxy: CacheProxy.Sum = (function(){
        let cache = new Map()
        return function(...arg: number[]): number{

            let key = arg.join("-")
            let cacheValue = cache.get(key)
             
            if(cacheValue !== undefined){
                console.log('直接返回缓存')
                return cacheValue
            }else{
                let total: number = 0
                arg.forEach(n => total+=n)
                cache.set(key, total)
                console.log('计算')
                return total;
            }
        }
    })()

    // 使用原型链实现柯里化

    // 使用代理实现柯里化
    export const curryingSum = (function(){
        let allArg: number[] = []
        return function sum(...arg: number[]): CacheProxy.CurryingSum{
            allArg = [...allArg, ...arg]
            if(arg.length !== 0){
                return sum
            }else{
                let total: number = 0;
                allArg.forEach(n => total+=n)
                allArg = []
                return (total as unknown as CacheProxy.CurryingSum);
            }
        }
    })()

}


// 使用代理模式实现柯里化操作；

// console.log(CacheProxy.sumProxy(1,2,3))
// console.log(CacheProxy.sumProxy(1,2,3))
// console.log(CacheProxy.sumProxy(1,2,3,4))
// console.log(CacheProxy.sumProxy(1,2,3,4))

 

console.log(CacheProxyModule.curryingSum(1,2,3)())
console.log(CacheProxyModule.curryingSum(1)(3,2)())
 