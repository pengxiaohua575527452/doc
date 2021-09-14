// 迪米特法则  - 只和朋友类交流
// 方法只能够使用传递进来的参数对象
// 和自身的属性方法
console.log('迪米特法则')

// 实例：
// 业务需求 老师让队长统计学生的数量

 





// 设计方案1
// 在接口中定义类朋友关系
// 接口一旦定义完成就不能轻易发生修改
// 可以添加新的接口，不要修改原始接口
declare namespace Demeter{
    
    interface Student{
        id: Student.id
    }
    namespace Student{
        type id =  String;
    }
    
    interface Group{
        students: Student[];
        // Student 是 Group 类的朋友类
        // Student 作为addStudent 方法的参数类型
        addStudent(student: Student): Group

        removeStudent(id: Student.id): Student;
        getCount(): Number
    }
    
    interface Leader{
        // Group 类作为 Leader 类方法方法的参数类型
        // Group 类是 Leader 类的朋友类
        countStudents(group: Group): void
    }

    interface Teacher{
        // Leader Group 类型作为 Teacher 类型方法的输入变量类型
        // Leader Group 是Teacher的朋友类型
        command(leader: Leader, group: Demeter.Group): Teacher
    }
}



// 在类型中规范 耦合强度
class Student implements Demeter.Student{
    id: Demeter.Student.id
    constructor(id: Demeter.Student.id = ""){
        if(id.length === 0){
            throw new Error('错误')
        }
        this.id = id
    }
}

class Group implements Demeter.Group{
    students: Demeter.Student[] = [];
    constructor( student: Demeter.Student[] = []){
        this.students = student;
    }
    // addStudent方法 同 类Demeter.Student 是一个弱耦合状态
    // 只要类型正确即可
    addStudent(student: Demeter.Student): Group{
        this.students.push(student)
        return this
    }

    // removeStudent方法 同类 Demeter.Student 是一个 次弱耦合状态
    // 应为 removeStudent 方法的内部使用了 Demeter.Student.id 属性的值
    // 一旦 Demeter.Student 类型发生了变化，标识符不是id的时候
    // 就需要在次修改这个 Group 类 【原则上这个是不会发生修改的】
    removeStudent(id: Demeter.Student.id): Demeter.Student{
        const index = this.students.findIndex(student => student.id === id)
        if(index === -1){
            throw new Error('错误没有匹配的对象')
        }else{
            return this.students.splice(index, 1)[0]
        }
    };

    getCount(): number{
        return this.students.length;
    }
}


class Leader implements Demeter.Leader {
    
    constructor(){

    }
    
    // 朋友类 goup 班级
    // 之间是弱耦合关系, 只调用了对象的一个方法
    countStudents(group: Demeter.Group): void{
        console.log(group.getCount())
    }

}

class Teacher implements Demeter.Teacher {
    constructor(){}
    // leader 和 Grop 是类 Teacher 的朋友类型
    // 是弱耦合关系
    command(leader: Demeter.Leader, group: Demeter.Group): Teacher{
        leader.countStudents(group)
        return this;
    }
}





 





 