 
/**
 * 命令模式
 * 核心逻辑：
 * 命令发起者 只需要发起命令不管命令做种的接受者
 * 命令接受者 只需要接受到命令后执行，不管命令的发起者
 * 命令中介者【命令对象】 用来匹配 发起者和接受者
 * 
 * 三个模块都是独立
 * 相互之家只需要关系协议的部分即可
 * 
 */

/**
 * 实例
 * 业务需求
 * 
 * 
 * 分析：

 */


// 创建 按钮


module Command {
    export interface SetCommand {
        (sender: HTMLElement, commandType: string, receiver: Receiver): void
    }

    export interface Receiver{
        excute: Receiver.Excute
    }
    declare namespace Receiver {
        interface Excute {
            (e: Event): void
        }
        interface Undo{
            (e: Event): void
        }
    }

    export let setCommand: SetCommand = function (sender: HTMLElement, commandType: string, receiver: Receiver): void{
        sender.addEventListener(commandType, receiver.excute)
    }

    export class Receiver implements Receiver {
        excute:Receiver.Excute; 
        constructor(excute: Receiver.Excute){
            this.excute = excute;
        }
    }
}

const _btnInsert_ = document.createElement('button')
const _btnDel_ = document.createElement('button')
_btnInsert_.innerText = "INSERT"
_btnDel_.innerText = "DEL"

document.body.append(_btnInsert_, _btnDel_)
 



// 基础模块
function setSrc(_img_: HTMLImageElement, src: string){
    _img_.setAttribute('src', "./static/loading.gif")
    let _pre_ = new Image()
    _pre_.setAttribute('src', src)
    _pre_.addEventListener('load', () =>  _img_.setAttribute('src', src))
}

function insertImage(){
    const _img_ = new Image()
    document.body.appendChild(_img_)
    return _img_;
}

// 业务模块
function handeInsert(){
    const _img_ = insertImage()
    setSrc(_img_, "./static/huge.jpeg")
}

function handleDel(){
    document.querySelectorAll('img').forEach(el => el.parentNode?.removeChild(el))
}


// 设置命令的方法
Command.setCommand(_btnInsert_, 'click', new Command.Receiver(handeInsert))
Command.setCommand(_btnDel_, 'click', new Command.Receiver(handleDel))




 



