

export class TaskList{

    constructor(){
        this.showLocalStorage();
    }


    newTask( task ){
        this.taskArray.push( task );
        this.storeLocalStorage();
    }

    checkCompleted( id ){
        
        for( const task of this.taskArray ){
           
            if( task.id == id ){
                task.completed = !task.completed;
                this.storeLocalStorage();
                break;
            }
        }
    }

    deleteTask( id ){
        this.taskArray = this.taskArray.filter( task => task.id != id );
        this.storeLocalStorage();
    }

    deleteAllCompleted(){
        this.taskArray = this.taskArray.filter( task => !task.completed );
        this.storeLocalStorage();
    }

    storeLocalStorage(){
        localStorage.setItem('task', JSON.stringify(this.taskArray));
    }

    showLocalStorage(){
        if( localStorage.getItem('task') ){
            this.taskArray = JSON.parse( localStorage.getItem('task') );
        }else{
            this.taskArray = []; 
        }
    }
}