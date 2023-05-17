import { TodoList } from './TodoList.js'

export class TodoItem {

    constructor(container, title, done = false, id) {
        this.container = container
        this.title = title
        this.done = done
        this.id = id

        this.item = document.createElement('div')
        this.item.classList.add('app__item')
        let itemContent = document.createElement('div')
        itemContent.classList.add('app__item__content')

        let itemLabel = document.createElement('label')
        itemLabel.classList.add('app__item__label')
        

        let checkboxBase = document.createElement('input')
        checkboxBase.classList.add('app__checkbox__base')
        checkboxBase.type = 'checkbox'
        checkboxBase.id = `check${this.id}`

        itemLabel.htmlFor = checkboxBase.id

        checkboxBase.addEventListener('change', () => {
            this.done = !this.done
            console.log(this.done)

            if (this.container instanceof TodoList) {
                this.container.getLastDoneLength(this)
            }
        })

        let checkboxFrame = document.createElement('span')
        checkboxFrame.classList.add('app__checkbox__frame')
        let itemText = document.createElement('p')
        itemText.classList.add('app__item__text')
        itemText.textContent = this.title

        itemLabel.append(checkboxBase, checkboxFrame, itemText)

        this.deleteBtn = document.createElement('button')
        this.deleteBtn.classList.add('app__item__delete')
        this.deleteBtn.innerHTML = `<svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M24.4321 21.0633L33.9625 11.5328C34.6328 10.8625 34.6328 9.7711 33.9625 9.10079C33.2922 8.43047 32.2008 8.43047 31.5305 9.10079L22 18.6313L12.4696 9.10079C11.7992 8.43047 10.7078 8.43047 10.0375 9.10079C9.36721 9.7711 9.36721 10.8625 10.0375 11.5328L19.568 21.0633L10.0461 30.5852C9.37581 31.2555 9.37581 32.3469 10.0461 33.0172C10.3813 33.3524 10.8196 33.5242 11.2578 33.5242C11.6961 33.5242 12.1344 33.3524 12.4696 33.0172L22 23.4867L31.5305 33.0172C31.8656 33.3524 32.3039 33.5242 32.7422 33.5242C33.1805 33.5242 33.6188 33.3524 33.9539 33.0172C34.6242 32.3469 34.6242 31.2555 33.9539 30.5852L24.4321 21.0633Z" fill="#800000"/>
            </svg>`
        
        this.deleteBtn.addEventListener('click', () => {
            this.deleteItem()
        })

        itemContent.append(itemLabel, this.deleteBtn)
        this.item.append(itemContent)

        if (container instanceof TodoList) {
            container.list.append(this.item)
        } else {
            container.append(this.item)
        }
        
    }

    deleteItem(){
        const popup = document.querySelector('.dark-bg-popup')
        const denyBtn = document.querySelector('.popup__btn-deny')
        const removeBtn = document.querySelector('.popup__btn-remove')
        
        popup.classList.add('dark-bg-active')
        document.querySelector('.popup__item-name').textContent = this.title

        denyBtn.addEventListener('click', () => {
            popup.classList.remove('dark-bg-active')
        })

        removeBtn.addEventListener('click', () => {
            this.item.remove()
            popup.classList.remove('dark-bg-active')

            if (this.container instanceof TodoList) {
                this.container.delete(this)
            }
        })
    }
}