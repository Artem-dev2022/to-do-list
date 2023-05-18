import { TodoItem } from './TodoItem.js'
import { TodoList } from './TodoList.js'

const container = document.getElementById('app-list')
const listContainer = document.getElementById('list-container')
const inputTodo = document.getElementById('input-todo')
const addTodo = document.getElementById('add-todo')
const errorMessage = document.querySelector('.error')
const itemsAmount = document.getElementById('amount')
const itemsDoneAmount = document.getElementById('amount-done')

const clearPopup = document.querySelector('.dark-bg-clear')
const clearBtn = document.querySelector('.app__bottom__btn')
const clearDenyBtn = document.querySelector('.popup-clear__btn-deny')
const clearClearBtn = document.querySelector('.popup-clear__btn-remove')


let newList = new TodoList(listContainer, itemsAmount, itemsDoneAmount, clearBtn)

addTodo.addEventListener('click', () => {
    if (!inputTodo.value.length) {
        errorMessage.classList.add('error-active')
        return
    } else {
        errorMessage.classList.remove('error-active')
    }

    newList.add(inputTodo.value)

    console.log(newList)
    inputTodo.value = ''
})

clearBtn.addEventListener('click', () => {
    clearPopup.classList.add('dark-bg-active')
    clearDenyBtn.addEventListener('click', () => {
        clearPopup.classList.remove('dark-bg-active')
    })

    clearClearBtn.addEventListener('click', () => {
        newList.clearList()
        clearPopup.classList.remove('dark-bg-active')
    })
})

const popup = document.querySelector('.dark-bg-popup')
const denyBtn = document.querySelector('.popup__btn-deny')
denyBtn.addEventListener('click', () => {
    popup.classList.remove('dark-bg-active')
})