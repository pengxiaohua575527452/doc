"use strict";
//  双向链表
class Data {
    constructor(id) {
        this.id = id;
    }
    isMath(id) {
        return id === this.id;
    }
}
// 类定义耦合强度
class DoubleLinkedListNode {
    constructor(data, pre = null, next = null) {
        this.data = data;
        this.pre = pre;
        this.next = next;
    }
    removeSelfFromList(head) {
        this.pre !== null ? this.pre.next = this.next : head = this.next;
        this.next !== null ? this.next.pre = this.pre : "";
        return this;
    }
    // 低耦合度 之访问了 
    // DoubleLinkedList.DoubleLinkedListNode.Node.Data.isMath 方法
    findNodeBackward(id) {
        let currentNode = this;
        while (currentNode !== null) {
            if (currentNode.data.isMath(id)) {
                return currentNode;
            }
            else {
                currentNode = currentNode.next;
            }
        }
        return currentNode;
    }
}
// 同 DoubleLinkedListNode 是高耦合度的
// 访问了 DoubleLinkedListNode.next;
// 调用了 DoubleLinkedListNOde.removeSelfFromList && DoubleLinkedListNode.findNodeBackward 方法
class DoubleLinkedList {
    constructor(head = null) {
        this.size = 0;
        this.head = head;
        this.head !== null ? this.size++ : "";
    }
    getHead() {
        return this.head;
    }
    // 定义朋友类 Node
    // 低耦合度 之访问了 DoubleLinkedListNode.next 属性
    addNode(node) {
        let currentNode = this.head;
        let parentNode = this.head;
        while (currentNode !== null) {
            parentNode = currentNode;
            currentNode = currentNode.next;
        }
        if (parentNode === null) {
            this.head = node;
        }
        else {
            parentNode.next = node;
            node.pre = parentNode;
        }
        this.size++;
        return this;
    }
    ;
    // 同 currentNode类是低耦合度
    // 只调用了 DoubleLinkedListNode.removeSelfFromList 方法
    removeNode(id) {
        let currentNode = this.findNode(id);
        if (currentNode !== null) {
            currentNode = currentNode.removeSelfFromList(this.head);
            // 修改成为调用currentNode的删除方法
            // currentNode.pre !== null ? currentNode.pre.next = currentNode.next : this.head = currentNode.next;
            // currentNode.next !== null ? currentNode.next.pre = currentNode.pre : "";
        }
        currentNode !== null ? this.size-- : '';
        return currentNode;
    }
    ;
    // 观察是否可以降低耦合程度
    findNode(id) {
        // 高耦合度 同时耦合了 node.data node.data.id 
        // 同时还访问了 node.next 属性
        // let currentNode = this.head;
        // while(currentNode !== null){
        //     // if(currentNode.data.id === id){
        //     //     return currentNode;
        //     // }
        //     // currentNode = currentNode.next;
        // }
        // return currentNode;
        // 低耦合 之访问了 DoubleLinkedListNode.findNode 方法
        return this.head && this.head.findNodeBackward(id);
    }
    ;
    // 低耦合度 之访问了 DoubleLinkedListNode 类的 next属性
    forEach(callback) {
        let currentNode = this.head;
        while (currentNode !== null) {
            callback(currentNode);
            currentNode = currentNode.next;
        }
    }
}
const doubleLinkedList = new DoubleLinkedList();
let a = [1, 2, 3, 4, 5];
a.sort((a, b) => Math.random() - 0.5);
a.forEach(n => {
    doubleLinkedList.addNode(new DoubleLinkedListNode(new Data(`${n}`)));
});
doubleLinkedList.forEach(node => console.log(node.data.id));
console.log(doubleLinkedList.size);
