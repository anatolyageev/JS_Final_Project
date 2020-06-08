export default class View {
    list = document.querySelector('.todos-list');
    table = document.querySelector('.table');
    spanAll = document.querySelector('.b-all');
    spanDone = document.querySelector('.b-done');

    addListeners(onTodoClick, allTodosDone, allTodosNotDone, addTodo, onTodoClickTable) {
        // document.querySelector('.todos-list').addEventListener('click', onTodoClick);
        document.querySelector('.mark-all-btn').addEventListener('click', allTodosDone);
        document.querySelector('.reset-btn').addEventListener('click', allTodosNotDone);
        document.querySelector('.add-btn').addEventListener('click', addTodo);
        document.querySelector('.table').addEventListener('click', onTodoClickTable);
        // document.addEventListener("DOMContentLoaded", () => { document.querySelector("td").addEventListener('click', onDeleteClickTable);
    // });
    // document.querySelector('.table').addEventListener('click', onDeleteClickTable);
    }

    render(data) {
        this.spanDone.innerHTML = `Done: ${data.reduce((count,el)=>{
                if(el.isDone){
                    count++;
                }
                return count;
        },0)}`;

        this.spanAll.innerHTML = `All: ${data.length}`;

        this.table.innerHTML = data.map(todo => {
            const className = todo.isDone ? 'class = "done"' : '';
            return `
            <tr>
                <td ${className} data-id=${todo.id}>${todo.text}</td>
                <td>  
                 <button type="button" class="btn btn-default btn-sm del-todo" data-id=${todo.id}>
                     <i class="fas fa-trash-alt del-todo" data-id=${todo.id} ></i> 
                 </button>
                </td>
            </tr>`
        }).join('');

    }

    getNewTodo() {
        let text = document.querySelector('.form-control');
        let resalt = text.value;
        text.value = '';
        return resalt;
    }

}