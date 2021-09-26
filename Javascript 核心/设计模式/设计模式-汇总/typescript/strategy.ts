/***
 * 
 * 
 * 策略模式
 * 
 * 概念
 *      把多个算法封装起来，相互之间可以替换使用
 *      一般用来替代 if else 的情况
 * 
 * 算法必须要接受相同的参数 返回的 数据类型相同
 */


/***
 * 业务需求
 * 
 * 计算员工的年终奖
 * 
 * 计算方法 绩效等级 * 基本工资
 * 
 * 绩效    倍率  
 * s        4
 * a        3
 * b        2
 * 
 */

module Strategy {
    declare namespace Strategy {
        
        /**
         * 基础接口
         * 姓名
         */
        interface Name {
            setName:Name.SetName;
            getName:Name.GetName;
        } 
        namespace Name {
            type Name = string;
            interface SetName {
                (name: Name.Name): void
            }
            interface GetName{
                (): Name.Name
            }
        }

        /**
         * 基础接口
         * 绩效
         */
        interface Performance {
            setPerformance: Performance.SetPerformance;
            getPerformance: Performance.GetPerformance;
        }
        namespace Performance {
            type Level = "S" | "A" | "B"
            interface SetPerformance {
                (level: Performance.Level): void
            }
            interface GetPerformance {
                (): Performance.Level
            }
        }

     

        /**
         * 基础接口
         * 薪水
         */
        interface BaseSalary {
            setBaseSalary: BaseSalary.SetBaseSalary;
            getBaseSalary: BaseSalary.GetBaseSalary;
        }
        namespace BaseSalary {
            type Salary = number;
            interface SetBaseSalary {
                (salary: BaseSalary.Salary): void
            }
            interface GetBaseSalary {
                (): BaseSalary.Salary
            }
        }
        /**-------------------------------------------------------------------------------------------- */
        

        /**
         * 业务接口 计算奖金
         * 奖金
         */
         interface Bonus{
            // 获取奖金
            getBonus: Bonus.GetBonus;
            // 设置计算奖金的算法
            setAlgorithm: Strategy.Bonus.setAlgorithm;
        }
        namespace Bonus {
            type Bonus = number;
            interface GetBonus {
                (perforamnce: Strategy.Performance.Level, baseSalary: Strategy.BaseSalary.Salary):Bonus.Bonus
            }
            interface setAlgorithm {
                (algorithm: Algorithm): void
            }
            interface BaseAlgorithm {
                (baseSalary: Strategy.BaseSalary.Salary): BaseSalary.Salary;
            } 
            type Algorithm = { [key in Performance.Level]: BaseAlgorithm };
            interface createAlgorithm {
                (opts: CreateAlgorithm.Opts): Algorithm
            }
            namespace CreateAlgorithm {
                type Opts = { [key in Performance.Level] : number }
            }
        }
        

        /**
         * 业务接口
         * 有基础接口组合而成
         * 个人类
         */
        interface Person {
            name: Name;
        }

        /**
         * 业务接口
         * 由基础接口组合而来
         * 雇员类
         */
        interface Employee extends Person {
            performance: Performance;
        }


    }

    /**
     * 基类 name
     */
    class Name implements Strategy.Name {
        setName: Strategy.Name.SetName;
        getName: Strategy.Name.GetName;
        constructor(name: Strategy.Name.Name){
            let __name: Strategy.Name.Name = name;;
            this.setName = function(name: Strategy.Name.Name): void{
                __name = name;
            }
            this.getName = function(): Strategy.Name.Name{
                return __name;
            }
        }
    }

    /**
     * 基类
     * 绩效
     */
    class Performance implements Strategy.Performance {
        setPerformance: Strategy.Performance.SetPerformance;
        getPerformance: Strategy.Performance.GetPerformance;
        static Level: any;
        constructor(performance: Strategy.Performance.Level){
            let __performance = performance;
            this.setPerformance =  function(performance: Strategy.Performance.Level){
                __performance = performance;
            }
            this.getPerformance = function(){
                return __performance;
            }
        }
    }

    /**
     * 基类
     * 薪水
     */
    class BaseSalary implements Strategy.BaseSalary {
        setBaseSalary: Strategy.BaseSalary.SetBaseSalary;
        getBaseSalary: Strategy.BaseSalary.GetBaseSalary;
        constructor(salary: Strategy.BaseSalary.Salary){
            let __salary = salary;
            this.setBaseSalary = function(salary: Strategy.BaseSalary.Salary){
                __salary = salary
            }
            this.getBaseSalary = function(){
                return __salary;
            }
        }
    }
    
    /**
     * 基类 工厂函数 创建奖金算法的策略类
     * @param opts 
     * @returns 
     */
    let createAlgorithm: Strategy.Bonus.createAlgorithm = function (opts: Strategy.Bonus.CreateAlgorithm.Opts): Strategy.Bonus.Algorithm{
        let  o: unknown = {}
        for(let key in opts) {
            (o as Strategy.Bonus.Algorithm)[key as Strategy.Performance.Level] = function(baseSalary: Strategy.BaseSalary.Salary): Strategy.BaseSalary.Salary{
                return opts[key as Strategy.Performance.Level] * baseSalary
            }
        }
        return (o as Strategy.Bonus.Algorithm)
    }


    /**
     * 业务类 
     * 奖金
     * 同 
     * Strategy.Bonus.Algorithm 算法类朋友类
     * 
     */
    class Bonus implements Strategy.Bonus {
        getBonus: Strategy.Bonus.GetBonus;
        setAlgorithm: Strategy.Bonus.setAlgorithm;
        constructor( algorithm: Strategy.Bonus.Algorithm){
            this.getBonus = function (perforamnce: Strategy.Performance.Level, baseSalary: Strategy.BaseSalary.Salary): Strategy.Bonus.Bonus{
                return algorithm[perforamnce](baseSalary)
            }
            this.setAlgorithm = function(newAlgorithem: Strategy.Bonus.Algorithm){
                algorithm = newAlgorithem;
            }
        }
    }

    /**
     * 业务类 
     * 个人类型
     */
    class Person implements Strategy.Person {
        name: Strategy.Name;
        constructor(
            name: Strategy.Name.Name
        ){
            this.name = new Name(name)
        }
    }



    /**
     * 现在新增了一个雇员类
     * 业务类
     * 雇员类
     * 构造函数由默认值-会导致 类型同 接口发生了强关联，一旦接口更改，
     * 那么这个类也需要更改，这样是不合适的，
     * 如果取消 默认值，那么接口发生更改后，类是不需要更改的
     * 
     */
    class Employee extends Person {
        performance: Strategy.Performance
        baseSalary: Strategy.BaseSalary;
        Bonus: Strategy.Bonus
        constructor(
            name: Strategy.Name.Name, 
            salary: Strategy.BaseSalary.Salary,
            performance: Strategy.Performance.Level,
            opts: Strategy.Bonus.CreateAlgorithm.Opts 
        ){
            super(name)
            this.performance = new Performance(performance)
            this.baseSalary = new BaseSalary(salary)
            this.Bonus = new Bonus(createAlgorithm(opts))
        }
    }




    // 测试
    let bill = new Person("bill")
    bill.name.setName("bill-2")
    console.log(bill.name.getName())


    // 测试雇员类
    let jack = new Employee(
        "jack",
        3000,
        "S",
        {S: 6, A: 3, B:1}
    )


    console.log('jack: ',jack)
    console.dir(jack)
    console.log(jack.Bonus.getBonus(jack.performance.getPerformance(), jack.baseSalary.getBaseSalary()))
    jack.Bonus.setAlgorithm(createAlgorithm({S: 7, A: 5, B:2})) 
    console.log(jack.Bonus.getBonus(jack.performance.getPerformance(), jack.baseSalary.getBaseSalary()))
    jack.baseSalary.setBaseSalary(1000)
    console.log(jack.Bonus.getBonus(jack.performance.getPerformance(), jack.baseSalary.getBaseSalary()))
    
}


// 问题
Promise
.resolve()
.then(() => {
    console.log(0);
    // 1 会导致后面的 then 的执行慢2拍
    return Promise.resolve("res");// 创建 解决需要两个 task
    // 2 会导致后面的 then 的执行慢2拍
    // return Promise.resolve("res").then(() => console.log('A')); 
    // 3 会导致后面的 then 的执行慢2拍
    // return new Promise(resolve => {console.log('A-'); resolve(undefined)})
    // 4 后面的 then 会立即添加到
    // new Promise(resolve => {console.log('A-'); resolve(undefined)})
    // return "BB"
})
.then((res) => {
    console.log(res)
    // return Promise.resolve("res-2")
})
// .then((res) => {
//     console.log(res)
// })

Promise
.resolve()
.then(() => {
    console.log(1);
}).then(() => {
    console.log(2);
}).then(() => {
    console.log(3);
}).then(() => {
    console.log(5);
}).then(() =>{
    console.log(6);
})

Promise
.resolve()
.then(() => {
    console.log(11);
}).then(() => {
    console.log(21);
}).then(() => {
    console.log(31);
}).then(() => {
    console.log(51);
}).then(() =>{
    console.log(61);
})

// 如果 then 之前的 then 返回的时  显示调用的Promise 微任务会慢两派 or 其他的then 
// 那么这个then 需要延迟两次微任务的执行



// console.log('A')
// setTimeout(() => {
//     console.log('B')
// })

 

// new Promise((resolve,reject) => {
//     console.log('外部promise')
//     resolve(null)
// })
// .then(() => {
//     console.log('外部第一个then')
//     new Promise((resolve,reject) => {
//         console.log('内部promise')
//         resolve(null)
//     }) // 
//     .then(() => {
//         console.log('内部第一个then')
//         return Promise.resolve() // 治理会起另外一个 微任务 去执行这这个后面的.then 方法
//     })
//     .then(() => {
//         console.log('内部第二个then')
//     })
// })
// .then(() => {
//     console.log('外部第二个then')
// })
// .then(() => {
//     console.log('外部第三个then')
// })
// .then(() => {
//     console.log('外部第四个then')
// })

/**
 * console.log('外部promise')
 * console.log('外部第一个then')
        console.log('内部promise')
        console.log('内部第一个then')
 * console.log('外部第二个then')
 * console.log('外部第三个then')
 * console.log('外部第四个then')
        console.log('内部第二个then')
 * 
 */

//  .then 回调函数里 
//  return一个已经 fulfilled 的 promise 和
//  什么都不返回也就是 return undefined 有什么不同？


// new Promise(resolve => { //记第一行 new Promise 生成的 Promise 为 p0
//     let resolvedPromise = Promise.resolve() // 执行第 2 行 let resolvedPromise = Promise.resolve() 后，resolvedPromise 是一个 fulfilled 状态的 Promise，此时 microtask 队列为空。
//     resolve(resolvedPromise) // resolve 的参数为 Promise 时，要额外消耗两个 then 时序 microtask，
//     // resolve("resolvedPromise") // resolve 的参数为 Promise 时，要额外消耗两个 then 时序 microtask，
// }).then(() => {
//     console.log('resolvePromise resolved')
// })

// Promise.resolve()
//    .then(() => { console.log('promise1') }) // 直接向 microtask 队列增加一个 microtask。
//    .then(() => { console.log('promise2') })
//    .then(() => { console.log('promise3') })


new Promise(resolve => {
    let resolvedPromise = Promise.resolve();
    resolve(resolvedPromise);
  })
  .then(() => {
    console.log('resolvePromise resolved');
  });
  
  
  Promise.resolve()
  .then(() => { console.log('promise1') })
  .then(() => { console.log('promise2') })
  .then(() => { console.log('promise3') });
  




 






 