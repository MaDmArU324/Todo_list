import '../Todos/models/todo-models';
import { Todo } from '../Todos/models/todo-models';
/**
 * 
 * @param {Todo} todo 
 */
export const createTodoHtml = (todo) =>{
    if(!todo){
        throw new Error("Object is required")
    }
    const html = `<li class=${todo.done? "completed": "Pending"} data-id=${todo.id}>
    <div class="view">
        <input class="toggle" type="checkbox" ${todo.done? "checked": "unchecked"}>
        <label>${todo.description}</label>
        <button class="destroy"></button>
    </div>
    <input class="edit" value="Create a TodoMVC template">
 `;
    const lielement = document.createElement('li');
    lielement.innerHTML = html;
    lielement.classList.add(todo.done? "completed": "Pending");
    lielement.setAttribute('data-id', todo.id);


    
    return lielement

};