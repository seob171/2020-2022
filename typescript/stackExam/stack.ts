{
    interface IStack{
        readonly size:number
        push(value:string):void
        pop():string
    }

    type StackNode = {
        readonly value:string;
        readonly next?:StackNode
    }

    class Stack implements IStack{

        private _size: number = 0
        private head?:StackNode

        get size(){
            return this._size
        }

        push(value:string){
            const node: StackNode = {value,next:this.head}
            this.head = node
            this._size++
        }

        pop():string{
            if(this.head == null) throw new Error('스택이 비었습니다.')
            const node = this.head
            this.head = node.next
            this._size--
            return node.value

        }
    }

    const stack = new Stack()
    stack.push('hello 1')
    stack.push('world 2')
    stack.push('seob 3')
}