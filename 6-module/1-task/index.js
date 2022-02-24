/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */


export default class UserTable {
  constructor(rows) {
    this.data = rows;
    this.elem = this.createTable();
  }

  createTable() {// Прототипы
    const table = document.createElement('table');//this.table
    const thead = document.createElement('thead');// если через this то это будут свойства??
    const tbody = document.createElement('tbody');
    table.setAttribute('id','table');
    thead.insertAdjacentHTML('beforeend', `<tr>
    <th>Имя</th>
    <th>Возраст</th>
    <th>Зарплата</th>
    <th>Город</th>
    <th></th>
    </tr>`)
    
    for (const item of this.data) {// можно ли подставить rows, видимость item
      const tr = document.createElement('tr');
      
      
      for (const key in item) {
       let text = item[key];
       const td = document.createElement('td');
       td.innerHTML = text;// можно ли как то иначе добавить text
       tr.insertAdjacentHTML('beforeend', `<td>${text}</td>`)//Вставка еще не в браузер
      }
      
      tr.insertAdjacentHTML('beforeend', '<td><button>X</button></td>')
      tr.querySelector('button').addEventListener('click', () => { // можно ли передать функцию без стрелочной, 
        this.onDelete(tr)
      })
      tbody.appendChild(tr)
      
    }
    table.appendChild(thead);
    table.appendChild(tbody);
    return table;
    
  }
  onDelete(tr) {
    tr.remove()

  }

} 

  
  
     
  


