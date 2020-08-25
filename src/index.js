import './styles.css';

import { Task } from './classes/task.class';
import { TaskList } from './classes/list-task.class';
import { createTaskHtml } from './js/componentes';


export const taskArray = new TaskList();
console.log(taskArray);
taskArray.taskArray.forEach( task =>  createTaskHtml( task ));
