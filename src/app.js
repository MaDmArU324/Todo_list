import html from './app.html?raw'
import TodoStore, { Todo } from '../src/Todos/models/todo-models'
import "./use-cases/index"
import { renderTodos } from './use-cases/index';


const elementID = {
    Todolist: '.todo-list', 
    Input: "#new-todo-input",
    DeleteCompleted: '.clear-completed',
    Delete : ".destroy",
    CounterP : "#pending-count",
    Completed: "#completed",
    Pendings: "#pendings",
    All: "#All"

}
/**
 * 
 * @param {HTMLElement} elementid 
 */
export const App = (elementid) =>{
    

    const displayTodos = () =>{
        const todos = TodoStore.getTodosbyfilter(TodoStore.getCurrentFilter());
        const Pendings = document.querySelector(elementID.CounterP)
        Pendings.innerHTML =  TodoStore.counter()
        renderTodos(elementID.Todolist, todos)


    };
    
    (()=>{
        TodoStore.initStore()
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementid).append(app);
        displayTodos();


        
    })()

    // listeners
    const newTodo = document.querySelector(elementID.Input);
    const TodoList = document.querySelector(elementID.Todolist);
    const deleteComp = document.querySelector(elementID.DeleteCompleted);
    const seeCompleted = document.querySelector(elementID.Completed)
    const seePendings = document.querySelector(elementID.Pendings)
    const seeAll = document.querySelector(elementID.All)
    newTodo.addEventListener('keyup', (event)=>{
        if(event.keyCode !== 13)
            return 

        if(event.target.value.trim().length === 0 ) 
            return

        TodoStore.addTodo(event.target.value);
        displayTodos();
        event.target.value = "";
    });
    TodoList.addEventListener('click', (event)=>{
        if(!(event.target.className === 'toggle')) return;
        const element = event.target.closest("[data-id]");
        TodoStore.toggleTodo(element.getAttribute('data-id'));
        displayTodos();

    })
    TodoList.addEventListener('click', (event)=>{
        if(!(event.target.className === "destroy")) return;
        const element = event.target.closest("[data-id]");
        TodoStore.deleteTodo(element.getAttribute('data-id'));
        displayTodos();
    })
    deleteComp.addEventListener('click', (event)=>{
        TodoStore.deleteCompleted();
        displayTodos();
    })
    seeAll.addEventListener('click', (event)=>{
        if(TodoStore.getCurrentFilter() === TodoStore.Filters.All) return
        seeAll.classList.add("selected")
        TodoStore.setFilter(TodoStore.Filters.All);
        renderTodos(elementID.Todolist, TodoStore.getTodosbyfilter(TodoStore.Filters.All))
        displayTodos()
    })
    seeCompleted.addEventListener('click', (event) =>{
        if(TodoStore.getCurrentFilter() === TodoStore.Filters.Completed) return
        seeAll.classList.add("selected")
        TodoStore.setFilter(TodoStore.Filters.Completed);
        renderTodos(elementID.Todolist, TodoStore.getTodosbyfilter(TodoStore.Filters.Completed))
        displayTodos()
    })
    seePendings.addEventListener('click', (event)=>{
        if(TodoStore.getCurrentFilter() === TodoStore.Filters.Pending) return
        seeAll.classList.add("selected")
        TodoStore.setFilter(TodoStore.Filters.Pending);
        renderTodos(elementID.Todolist, TodoStore.getTodosbyfilter(TodoStore.Filters.Pending))
        displayTodos()
    })





    
}
;
