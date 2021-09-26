 // 全局只需要有一个对象的模式

// 实例
// 显示登录窗口

module SingleTon {
    declare namespace Login {
        interface CreateHTML {
            (fn: CreateMethod): HTMLElement;
        }

        interface CreateMethod {
            (): HTMLElement
        }
    }

    export const createHTML: Login.CreateHTML = (function(){
        let element: HTMLElement | null = null;
        // 优化能够创建多个不同类型的 HTML 单例模式
        return function(fn: Login.CreateMethod): HTMLElement{
            return element ||  (element = createLayout());
        }
    })()
     

    export const createLayout: Login.CreateMethod = function(): HTMLElement{
        const _layout_ = document.createElement('div')
        _layout_.setAttribute('class', "layout")
        return _layout_
    }


}

// 测试
const _layout_ = SingleTon.createHTML(SingleTon.createLayout)
const _layout_2 = SingleTon.createHTML(SingleTon.createLayout) 

// p
console.log(_layout_ === _layout_2)

 

 
