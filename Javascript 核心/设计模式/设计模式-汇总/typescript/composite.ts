console.log('组合模式')


/**
 * 组合模式
 * 
 * 把多个相同对象组合成为一个对象
 * 实现 可选择的访问 部分或全部多个相同对象
 * 
 * 
 * 
 * 实例：
 * 需求
 * 在学校组织学生上不同的课程
 * 
 * 分析
 * 需要一个学生类
 * 需要可以课程类 
 *
 * 
 * 把学生了组合起来的类 
 * 
 * 
 */

module Composite {
declare namespace Type {
    /**
     * 正式的基类
     */
    interface Student {
        name: Student.Name;
        goToClass: Student.GoToClass
    }
    namespace Student {
        type Name = string;
        interface GoToClass {
            (): void
        }
    }

    /**
     * 用 Composite 模式
     * 需要准备的组合类
     */
    interface Composite{
        name: Student.Name;
        children: Composite[];
        type: Composite.CompositeType;
        goToClass: Composite.GoToClass
        addChild: Composite.AddChild;
        getChildren: Composite.GetChildren;
    }
    namespace Composite {
        interface AddChild {
            (child: Composite): Composite
        }

        interface GetChildren {
            (name: Student.Name | null | undefined): Composite[];
        }

        interface GoToClass {
            (name: Student.Name | null | undefined): void
        }

        type CompositeType = 'COM' | 'STU'
    }
}


const STU = "STU"
const COM = "COM"

/**
 * 学生类
*/
class Student implements Type.Composite {
    name: Type.Student.Name;
    type: Type.Composite.CompositeType = STU
    constructor(name: Type.Student.Name){
        this.name = name;
    }
    goToClass(name: Type.Student.Name | null | undefined): void{
        console.log(`${this.name} 上课`);
    }
    
    addChild(child: Type.Composite): Type.Composite{
        throw new Error('[错误]： 学生实例不允许访问 addChild 的方法')
    }

    getChildren(name: Type.Student.Name | null | undefined): Type.Composite[]{
        throw new Error('[错误]： 学生实例不允许访问 getChildren 的方法')
    };

    get children(){
        throw new Error('[错误]： 学生实例不允许访问 children 属性 的方法')
        let children: Type.Composite[] = [];
        return children   
    }

    set children(child: Type.Composite[]){
        throw new Error('[错误]： 学生实例不允许访问 children 属性 的方法')
    }
}


/**
 * 组合类
 */
class Composite implements Type.Composite {
    name: Type.Student.Name;
    type: Type.Composite.CompositeType = COM
    children: Type.Composite[] = [];
    constructor(name: Type.Student.Name){
        this.name = name;
    }
    goToClass(name: Type.Student.Name | null | undefined): void{
        let children = this.getChildren(name)
        children.forEach(child => {
            child.goToClass(undefined);
        })
    }
    
    addChild(...child: Type.Composite[]): Type.Composite{
        this.children.push(...child)
        return this;
    }

    getChildren(name: Type.Student.Name | null | undefined): Type.Composite[]{
        let children: Type.Composite[] = []
        if(name === null || name === undefined || this.name === name){
            // 匹配名称把全部的 student 返回回去
            this.children.forEach(child => {
                if(child.type === COM){
                    children.push(...child.getChildren(undefined))
                }else{
                    children.push(child);
                }
            })

        }else{
            // 没有匹配的继续像下寻找
            for(let child of this.children){
                if(child.type === COM){
                    children.push(...child.getChildren(name))
                }else{
                    if(child.name === name){
                        children.push(child)
                        break;
                    }
                }
            }
        }
        return children;
    };
}


/**
 * 业务逻辑
 */

const school = new Composite('S-A');
let allClass: Composite[] = []
// 添加班级
for(let i =0; i< 3; i++){
    const _class = new Composite(school.name + `-class-${i}`)
    school.addChild(_class)
    allClass.push(_class);
}

// 添加分组
allClass.forEach(_class => {
    const allGroup: Composite[] = [];
    for(let i =0; i< 2; i++){
        const group = new Composite(_class.name+`-grop-${i}`)
        _class.addChild(group)
        allGroup.push(group)
    }
    // 为分组添加学生
    allGroup.forEach(group => {
        for(let i =0; i< 2; i++){
            group.addChild(new Student(group.name + `-student-${i}`))
        }
    })
})

// 测试访问全部
school.goToClass(undefined)

// 测试访问一个班
console.log('测试访问一个班--------------------------------')
school.goToClass("S-A-class-2")

// 测试访问一个组
console.log('测试访问一个组--------------------------------')
school.goToClass("S-A-class-2-grop-1")


// 测试访问一位
console.log('测试访问一个位--------------------------------')
school.goToClass("S-A-class-2-grop-1-student-1")


}





 


