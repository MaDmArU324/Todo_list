import { Todo } from '../Todos/models/todo-models';
import { createTodoHtml } from './todo-HTML';

let element;
/**
 * 
 * @param {String} elementId 
 * @param {Todo} todos 
 */
export const renderTodos = ( elementId, todos = []) =>{
    if(!element){
        element = document.querySelector(elementId); 
    };
    if(!element){
        throw new Error("You need to put an existing element in order to append something")
    };

    element.innerHTML = ''
    
    todos.forEach(todo => {
        element.append(createTodoHtml(todo));
    });

};