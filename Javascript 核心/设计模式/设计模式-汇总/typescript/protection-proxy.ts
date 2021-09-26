// 保护代理
// 通过 Proxy 对象实现



module ProtectionProxy {
    export interface Name {
        name: Name.NameType;
        getName: Name.GetName
        updateName: Name.UpdateName;
        
    }

    export declare namespace Name{
        type NameType = string
        interface GetName {
            (): NameType
        }
        interface UpdateName {
            (name: NameType): Name
        }
    }
}

/**
 * 原始对象
 */
class Name implements ProtectionProxy.Name {
    name: ProtectionProxy.Name.NameType;
    constructor(name: ProtectionProxy.Name.NameType){
        this.name = name;
    }
    
    getName(){
        return this.name;
    }
    updateName(name: ProtectionProxy.Name.NameType){
        this.name = name
        return this;
    }
}

/**
 * Proxy 代理访问
 */
const handle = {
    set(target: any, key: any, value: any, receiver: any): boolean{
        if(key === 'name' && value.key  && value.key === 1){
            return Reflect.set(target, key, value.value, receiver)
        }else if(key === 'name'){
            console.error('禁止设置名称')
            return false;
        }
        return Reflect.set(target, key, value, receiver)
    }
}
const billProxy = new Proxy(new Name("bill"), handle)
 
try{
    billProxy.name = "new bill"
}catch(err){

}

// 通过密钥访问
try{
    billProxy.name = {value: "new bill", key: 1}
}catch(err){

}
 
console.log(billProxy.name)


