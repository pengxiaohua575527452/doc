// 单向循环链表

console.log('单向循环链表')


 

module SinglyLinkedCirclarList {

    export declare namespace SinglyLinkedCirclarList {
        type SinglyLinkedCirclarListNode = SinglyLinkedCirclarList.Node | null

        interface Node {
            next: Node
            data: Node.Data;
            isMatch(id: Node.Data.Id): Boolean
             
        }

        namespace Node{
            interface Data {
                id: Data.Id;
                isMatch(id: SinglyLinkedCirclarList.Node.Data.Id): Boolean
            }
            namespace Data {
                type Id = String;
            }
        }

        interface List {
            head: SinglyLinkedCirclarListNode;
            addNode(node: SinglyLinkedCirclarListNode): List;
            removeNode(id: Node.Data.Id): SinglyLinkedCirclarListNode
        }
        namespace List{

        }
    }
}

module SinglyLinkedCirclarList {

    export class Data implements SinglyLinkedCirclarList.Node.Data {
        id: SinglyLinkedCirclarList.Node.Data.Id;
        constructor(id: SinglyLinkedCirclarList.Node.Data.Id){
            this.id = id;
        }
        isMatch(id: SinglyLinkedCirclarList.Node.Data.Id): Boolean{
            return this.id === id;
        }
    }

    /**
     * 单向循环链表节点类
     */
    export class Node implements SinglyLinkedCirclarList.Node{
        next: SinglyLinkedCirclarList.Node;
        data: SinglyLinkedCirclarList.Node.Data
        constructor(
            data: SinglyLinkedCirclarList.Node.Data,
        ){
            this.data = data;
            this.next = this;
        }
        isMatch(id: SinglyLinkedCirclarList.Node.Data.Id): Boolean{  
            return this.data.isMatch(id)
          
        }
    }

    /**
     * 单向循环链表类
     */
    export class List implements SinglyLinkedCirclarList.List {
        head: SinglyLinkedCirclarList.SinglyLinkedCirclarListNode;
        size: number = 0
        constructor(head: SinglyLinkedCirclarList.SinglyLinkedCirclarListNode = null){
            this.head = head;
        }
        // 只是用 节点的 .next 属性
        addNode(node: SinglyLinkedCirclarList.Node): List {
            if(this.head === null){
                this.head = node
            }else {
                let currentNode: SinglyLinkedCirclarList.SinglyLinkedCirclarListNode = this.head
                let lastNode: SinglyLinkedCirclarList.SinglyLinkedCirclarListNode = null;
                do{
                    lastNode = currentNode;
                    currentNode = currentNode.next;
                }while(currentNode !== this.head)
                
                lastNode.next = node;
                node.next = this.head;
            }
 
            this.size++;
            return this;
        };
       
        removeNode(id: SinglyLinkedCirclarList.Node.Data.Id): SinglyLinkedCirclarList.SinglyLinkedCirclarListNode {

            if(this.head === null){
                return null;
            }

            let preNode: SinglyLinkedCirclarList.SinglyLinkedCirclarListNode = null;
            let removeNode: SinglyLinkedCirclarList.SinglyLinkedCirclarListNode = this.head 
            let hasMatch: boolean = false;
            do{
                if(removeNode.isMatch(id)){
                    hasMatch = true;
                }else{
                    preNode = removeNode;
                    removeNode = removeNode.next;
                }
            // 只能够遍历一遍 
            // 没有匹配的
            }while(removeNode !== this.head && hasMatch === false )

            if(hasMatch && preNode === null && removeNode.next === this.head){
                // 删除的是 head 节点 链表只有一个head节点
                this.head = null;
                this.size--;
                return removeNode;
            }else if(hasMatch && preNode === null && removeNode.next !== this.head){
                // 删除的是 head 节点， 链表不止一个head 借节点 
                this.head = removeNode.next;
                let lastNode = this.head;
                while(lastNode.next !== removeNode){
                    lastNode = lastNode.next;
                }
                lastNode.next = this.head;
                this.size--;
                return removeNode;
            }else if(hasMatch && preNode !== null){
                // 删除的不是head节点
                preNode.next = removeNode.next;
                this.size--;
                return removeNode;
            }else if(!hasMatch){
                // 没有匹配的
                return null
            }else{
                throw new Error('删除节点出错')
            }
        }
        
    }

    // 测试插入 元素
    function testInsertNode(){
        let a = ["a","b"]
        let list = new List();
        a.forEach(item => {
            list.addNode(new Node( new Data(item)))
        })
        console.log(list)
    }

    
    // 测试删除 head节点 ，链表只有一个节点
    function testRemoveHead(){
        let a = ["a"]
        let list = new List();
        a.forEach(item => {
            list.addNode(new Node(new Data(item)))
        })
        list.removeNode("a")
        console.log(list)
    }
    
    

    // 测试删除 head节点， 链表有2个节点
    function testRemoveHeadWith2Node(){
        let a = ["a", "b"]
        let list = new List();
        a.forEach(item => {
            list.addNode(new Node(new Data(item)))
        })
        list.removeNode("a")
        console.log(list)
    }

    // 测试删除 一个节点
    function testRemoveNormalNode(){
        let a = ["a", "b"]
        let list = new List();
        a.forEach(item => {
            list.addNode(new Node(new Data(item)))
        })
        list.removeNode("b")
        console.log(list)
    }

    testInsertNode()
    testRemoveHead()
    testRemoveHeadWith2Node()
    testRemoveNormalNode()
    
}
















 
 