import { TodoItem } from './TodoItem.js'

export class TodoList {
    _list = []
    _maxId = 0

    constructor(container, amountCounter, amountDoneCounter, clearBtn) {
        this.container = container
        this.list = document.createElement('div')
        this.list.classList.add('app__list')
        this.amountCounter = amountCounter
        this.amountDoneCounter = amountDoneCounter
        this.clearBtn = clearBtn

        container.innerHTML = ''
        container.append(this.list)

        this.checkEmpty()
        this.getListLength()
        this.getLastDoneLength()
    }

    getListLength(){
        this.amountCounter.textContent = this._list.length
        return this._list.length
    }

    getLastDoneLength(){
        this._listDoneLength = this._list.filter(item => item.done == true).length
        this.amountDoneCounter.textContent = this._list.length - this._listDoneLength
    }

    checkEmpty(){
        this.empty ? [this.empty.remove(), this.clearBtn.disabled = false] : null

        if (!this._list.length) {
            this.empty = document.createElement('div')
            this.empty.classList.add('app__empty')
            this.emptyText = document.createElement('p')
            this.emptyText.classList.add('app__empty__text')
            this.emptyText.textContent = 'to-do list is empty'

            this.empty.append(this.emptyText)
            this.list.append(this.empty)

            this.clearBtn.disabled = true
        }
    }

    getNewId(){
        for (const item of this._list) {
            if (item.id > this._maxId) this._maxId = item.id
        }
        this._maxId++
        return this._maxId
    }

    add(title, done = false){
        let id = this.getNewId()
        let newTodoItem = new TodoItem(this, title, done, id)
        this._list.push(newTodoItem)

        this.checkEmpty()
        this.getListLength()
        this.getLastDoneLength()
    }

    delete(value) {
        let id = value

        for (let i = 0; i <this._list.length; i++) {
            if (this._list[i].id == id) {
                this._list.splice(i, 1)
            }
        }

        this.checkEmpty()
        this.getListLength()
        this.getLastDoneLength()
    }

    clearList() {
        this._list = []
        this.list.innerHTML = ''

        this.getListLength()
        this.getLastDoneLength()
        this.checkEmpty()
    }
    
}

