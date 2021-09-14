"use strict";
// 迪米特法则  - 只和朋友类交流
// 方法只能够使用传递进来的参数对象
// 和自身的属性方法
console.log('迪米特法则');
// 在类型中规范 耦合强度
class Student {
    constructor(id = "") {
        if (id.length === 0) {
            throw new Error('错误');
        }
        this.id = id;
    }
}
class Group {
    constructor(student = []) {
        this.students = [];
        this.students = student;
    }
    // addStudent方法 同 类Demeter.Student 是一个弱耦合状态
    // 只要类型正确即可
    addStudent(student) {
        this.students.push(student);
        return this;
    }
    // removeStudent方法 同类 Demeter.Student 是一个 次弱耦合状态
    // 应为 removeStudent 方法的内部使用了 Demeter.Student.id 属性的值
    // 一旦 Demeter.Student 类型发生了变化，标识符不是id的时候
    // 就需要在次修改这个 Group 类 【原则上这个是不会发生修改的】
    removeStudent(id) {
        const index = this.students.findIndex(student => student.id === id);
        if (index === -1) {
            throw new Error('错误没有匹配的对象');
        }
        else {
            return this.students.splice(index, 1)[0];
        }
    }
    ;
    getCount() {
        return this.students.length;
    }
}
class Leader {
    constructor() {
    }
    // 朋友类 goup 班级
    // 之间是弱耦合关系, 只调用了对象的一个方法
    countStudents(group) {
        console.log(group.getCount());
    }
}
class Teacher {
    constructor() { }
    // leader 和 Grop 是类 Teacher 的朋友类型
    // 是弱耦合关系
    command(leader, group) {
        leader.countStudents(group);
        return this;
    }
}
