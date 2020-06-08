import Model from './Model.js';
import View from './View.js';

export default class Controller{
    constructor(){
        this.model = new Model();
        this.view = new View();
        this.model.loadDefaultData(this.onLoadData);
        this.view.render(this.model.todos);
        // this.document.addEventListener("DOMContentLoaded", () => {
        this.view.addListeners(
            this.onTodoClick,
            this.allTodosDone,
            this.allTodosNotDone,
            this.addTodo,
            this.onTodoClickTable
            // ,this.onDeleteClickTable
        )
        // });
    }

    onLoadData = () =>{
        console.log('data is load');
        console.log(this)
        this.view.render(this.model.todos);
    }

    allTodosDone = () => {
        this.model.setIsDone();
        this.view.render(this.model.todos);
     
    }

    allTodosNotDone = () => {
        this.model.setIsNotDone();
        this.view.render(this.model.todos);
    }

    onTodoClick = (ev) => {
        console.log('click to do', ev.target);
        console.dir(ev.target);
    
        const id = ev.target.dataset.id;
        console.log('ID: ', id);
        this.model.setByClick(id);
        this.view.render(this.model.todos);
    }

    addTodo = () => {
        let text = this.view.getNewTodo();
        this.model.addNewItem(text);
        this.view.render(this.model.todos);
    }

    onTodoClickTable = (ev) =>{
        if(ev.target.classList.contains("del-todo")){
            const id = ev.target.dataset.id;
            this.model.delByClick(id);
            this.view.render(this.model.todos);
            return;
        }
        const id = ev.target.dataset.id;
        this.model.setByClick(id);
        this.view.render(this.model.todos);
    }

    // onDeleteClickTable(ev){
    //     console.log("click table del: ", ev.target);
    //     console.dir(ev.target);
        
    //     const id = ev.target.dataset.id;
    //     console.log('ID del: ', id);
    //     this.model.delByClick(id);
    //     this.view.render(this.model.todos);
    // }
}