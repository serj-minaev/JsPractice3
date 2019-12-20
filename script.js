/*Переменные*/

const inputElement = document.querySelector('#input')               //  Находим элемент input
const ulElement = document.querySelector('#list')                   //  Находим список
let todoList = []                                                   //  Массив для вводимого текста

/*Проверка на нажатие Enter*/
inputElement.addEventListener('keydown', () => {          //  Отслеживаем событие клика по клавише
  if (event.key === 'Enter' || event.keyCode === 13){     //  Проверяем, что нажатая клавиша - Enter
    todoList.unshift({                                    //  Добавляем в массив объект
      content: inputElement.value,                        //  (Unshift добвавляет эллемент в начало массива)
      done: false,
      selected: false
    })
    inputElement.value = ''                               //  Очищаем значение поля для ввода

    upgradeView()                                         //  Вызываем функцию upgradeView
  }
})

/*Функция обновления списка*/
function upgradeView () {        //  Объявляем функцию upgradeView
  ulElement.innerHTML = ''       //  Очищаем HTML-код в списке

  for (let i = 0; i < todoList.length; i++){
        const todoItem = todoList[i]

        const liElement = document.createElement('li')    //  Создаем li
        liElement.className = 'list-group-item'           //  Присваеваем class
        ulElement.append(liElement)                       //  Добавляем созданный эллемент в ul

        const divElement = document.createElement('div')    //  Создаем div
        divElement.className = 'form-group form-check'      //  Присваеваем class
        liElement.append(divElement)                        //  Добавляем созданный эллемент в li

        const checkboxElement = document.createElement('input')   //  Создаем input
        divElement.append(checkboxElement)                        //  Добавляем созданный эллемент в div
        checkboxElement.className = 'form-check-input'            //  Присваеваем class
        checkboxElement.id = 'todoItem' + i                       //  Задаем уникальный id (todoItem'i')
        checkboxElement.type = 'checkbox'                         //  Присваеваем type
        checkboxElement.checked = todoItem.selected

        const labelElement = document.createElement('label')  //  Создаем label
        divElement.append(labelElement)                       //  Добавляем созданный эллемент в div
        labelElement.className = 'form-check-label'           //  Присваеваем class
        if (todoItem.done){                                   //  Проверяем, если todoItem выбран, то присваеваем класс
          labelElement.className += ' todoDone'
        }
        labelElement.setAttribute('for','todoItem' + i)      //  Присваеваем аттрибут
        labelElement.innerText = todoItem.content            //  Присваеваем label вывод текста, введённого в input
    
        if (!todoItem.done) { // Если эллемент не отмечен Done, то генерируется только кнопка Done

          const buttonElementDone = document.createElement('button')  //  Создаем button Done
          divElement.append(buttonElementDone)                        //  Добавляем созданный эллемент в div
          buttonElementDone.type = 'button'                           //  Присваеваем type
          buttonElementDone.className = 'btn btn-primary'             //  Присваеваем class
          buttonElementDone.innerText = 'Done'                        //  Добавляем текст внутри кнопки

          buttonElementDone.addEventListener('click', () =>{            //  Вешаем обработчик события на кнопку Done
            todoItem.done = !todoItem.done                              //  Меняем значения Done на противоположное
            upgradeView()                                               //  Обновляем таблицу
          })

        } else {  // Если элемент отмечен как Done, то генерируется кнопка Remove

          const buttonElementRemove = document.createElement('button')  //  Создаем button Remove
          divElement.append(buttonElementRemove)                        //  Добавляем созданный эллемент в div
          buttonElementRemove.type = 'button'                           //  Присваеваем type
          buttonElementRemove.className = 'btn btn-danger'              //  Присваеваем class
          buttonElementRemove.innerText = 'Remove'                      //  Добавляем текст внутри кнопки

          buttonElementRemove.addEventListener('click', () =>{          //  Отслеживаем клик
            todoList = todoList.filter                                  //  Прогоняем через фильтр массива
            (currentTodoItem => currentTodoItem !== todoItem)           //  ?
            // Если фильтр возвращает TRUE, элемент остается в массиве, если FALSE - элемент удаляется

            upgradeView()
          })
        }

    checkboxElement.addEventListener('change', () =>{                 //  Отслеживаем событие изменения checkbox
      todoItem.selected = checkboxElement.checked                     //  Присваеваем значение checked
    })
  }
}

/*Кнопка Done*/
document.querySelector('#doneAction').addEventListener('click', () => {   //  Находим кнопку
  for (const todoItem of todoList) {                                      //  Для каждого элемента todoList
    if (todoItem.selected) {                                              //  Проверяем, если выбран
      todoItem.done = true                                                //  Обозначаем как Done
      todoItem.selected = false                                           //  Убираем галочку checkbox
    }
  }

  upgradeView()
})

/*Кнопка Restore*/
document.querySelector('#restoreAction').addEventListener('click', () => {  //  Находим кнопку
  for (const todoItem of todoList) {                                        //  Для каждого элемента todoList
    if (todoItem.selected) {                                                //  Проверяем, если выбран
      todoItem.done = false                                                 //  Обозначаем как не Done
      todoItem.selected = false                                             //  Убираем галочку checkbox
    }
  }

  upgradeView()
})

/*Кнопка Remove*/
document.querySelector('#removeAction').addEventListener('click', () => {   //  Выбираем кнопку Select All
  todoList = todoList.filter(todoItem => !todoItem.selected)                //  Прогоняем через филь
  //  Если элемент массива НЕ выбран(checkbox no checked), то он остается в массиве
  upgradeView()
})

/*Кнопка Select All*/
document.querySelector('#selectAllAction').addEventListener('click', () => {
  for (const todoItem of todoList) {                                          //  Для каждого элемента todoList
      todoItem.selected = true                                                //  Убираем галочку checkbox
    }

  upgradeView()
})