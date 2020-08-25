import '../css/componentes.css';

import { Task } from '../classes/task.class';
import { TaskList } from '../classes/list-task.class';
import { taskArray } from '../index';

//Referencias
const ulListTask = document.querySelector('.list-group-flush');
const inputTask  = document.querySelector('.inputTask');
const btnDeleteCompleted = document.querySelector('#delCom');
const divFilters         = document.querySelector('.filters');
const btnFilter          = document.querySelectorAll('.filter');

 export const createTaskHtml = ( task ) => {

    const liHtml = `
    <li class="list-group-item" data-id="${ task.id }">
        <div class="custom-control custom-checkbox my-1 mr-sm-2 div-options">
            <input type="checkbox" ${ task.completed ? 'checked' : '' }>
            <label id="label" class="${ ( task.completed ) ? 'completed' : '' }">${ task.task }</label>
            <span class="close float-right fa fa-window-close"></span>
        </div>
    </li>
    `;


    const div = document.createElement('div');
    div.innerHTML = liHtml;
    ulListTask.append(div.firstElementChild);
    return div.firstElementChild;
}




//Eventos
inputTask.addEventListener('keyup', (e) => {
    if( e.keyCode == 13 ){
        
        const newTask = new Task( e.target.value );
        taskArray.newTask( newTask );
        //console.log(taskArray);
        createTaskHtml( newTask );
        inputTask.value = '';
    }
});


ulListTask.addEventListener('click', (e) => {
   
    const nameElem = e.target.localName;
    const elemFull = e.target.parentElement.parentElement;
    const elemId   = elemFull.getAttribute('data-id');
    const label    = e.target.parentElement.children[1];
    //console.log(nameElem);
    //console.log(elemFull);
    //console.log(elemId);
    //console.log(label);

    if(nameElem.includes('input')){
        taskArray.checkCompleted( elemId );
        elemFull.classList.toggle('completed');
        label.classList.toggle('completed');
        //console.log(taskArray);
        //console.log(elemFull);
        //console.log(label);
    }else if( nameElem.includes('span') ){
        taskArray.deleteTask( elemId );
        //console.log(taskArray);
        ulListTask.removeChild(elemFull);
    }


});


btnDeleteCompleted.addEventListener('click', () => {
    
    taskArray.deleteAllCompleted();
    console.log(taskArray);
    for( let i = ulListTask.children.length - 1;i >= 0; i-- ){
        const li = ulListTask.children[i];
        console.log(li);
        if( li.classList.contains('completed') ){
            ulListTask.removeChild( li );
        }
    }
});


divFilters.addEventListener('click', (e) => {
    const elemento = e.target;
    const filter   = elemento.getAttribute('data-name');
    console.log(filter);

    btnFilter.forEach( btn => btn.classList.remove('active') );
    elemento.classList.add('active');

    for(const elem of  ulListTask.children){
        elem.classList.remove('hidden');
        console.log(elem);
        const completed = elem.classList.contains('completed');
        switch( filter ){
            case 'slopes':
                if( completed ){
                    elem.classList.add('hidden');
                }
            break;
            case 'completed':
                if( !completed ){
                    elem.classList.add('hidden');
                }
        }
    }
});
