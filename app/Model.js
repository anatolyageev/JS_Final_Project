export default class Model{
    todos = [];

    generateTodoItem(text){
        return{
            text,
            isDone:false,
            id: Date.now()
        }
    }

    loadDefaultData(loadDoneCallback) {
        //AJAX - Asinchron JS and XML
        const aja = new XMLHttpRequest();
        //вешаем слушателя для окончания загрузки данных
        aja.onload = () => {
            const data = JSON.parse(aja.responseText);
            this.todos.push(...data);
            loadDoneCallback();
        }
        // указываем как и куда делаем запрос
        aja.open('GET', './data/data.json');
        aja.send();
    }

    generateTodoItem(text){
        return {
            text,
            isDone : false,
            id : Date.now()
        }
    }

    addNewItem(text){
        this.todos.push(this.generateTodoItem(text));
    }

    setIsDone(){
        this.todos.forEach(todo => todo.isDone = true);
    }

    setIsNotDone(){
        this.todos.forEach(todo => todo.isDone = false);
    }

    setByClick(id){
        this.todos.forEach(todo => todo.id == id ? todo.isDone = !todo.isDone : null);
    }

    delByClick(id){
        this.todos = this.todos.filter((todo)=>{
            return todo.id != id;
        });
    }
    
}