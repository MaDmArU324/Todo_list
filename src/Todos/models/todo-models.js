import {v4} from 'uuid'

export class Todo {
    constructor(description){
        this.id = v4()
        this.description = description
        this.createdAt = new Date()
        this.done = false

    };
};

const Filters = {
    All: "All",
    Completed: "Completed",
    Pending: 'Pending'
};

const state = {
    Todos:[
    ],
    filter: Filters.All
};

const initStore = () =>{
    loadStore()
    console.log('Store ready🫐')
    console.log(state)
};

const loadStore = () =>{
    if(!localStorage.getItem('state')) return
    const { Todos = [], filter = Filters.All} = JSON.parse(localStorage.getItem("state"))
    console.log(JSON.parse(localStorage.getItem("state")))
    state.Todos = Todos
    state.filter = filter

};
const getTodos = () =>{
    return state.Todos
}
const saveStateLocalStorage = () =>{
    localStorage.setItem("state", JSON.stringify(state))
};


/**
 * 
 * @param {String} description 
 */
const addTodo = (description) =>{
    if(!description){
        throw new Error("Description required")
    };
    const newTodo = new Todo(description);
    state.Todos.push(newTodo);
    saveStateLocalStorage();
    
};

/**
 * 
 * @param {String} todoid 
 */
const toggleTodo = (todoid) =>{
    if(!todoid){
        throw new Error("Id required");
    };
    const selected = state.Todos.filter(Todo => Todo.id === todoid);
    if(selected[0] === undefined) throw new Error("The id doesn't exist")
    selected[0].done = !selected[0].done;
    saveStateLocalStorage();
};

const deleteTodo = (todoid) => {
    if(!todoid){
        throw new Error("Id required");
    };
    state.Todos = state.Todos.filter(Todo => Todo.id !== todoid)
    saveStateLocalStorage();
};

const deleteCompleted = () =>{
    state.Todos = state.Todos.filter(Todo => !Todo.done);
    saveStateLocalStorage();
};

/**
 * 
 * @param {String} newFilter 
 */
const setFilter = (newFilter = Filters.All) => {
    if (!(Object.keys(Filters).includes(newFilter))) {
        throw new Error("The filter doesn't exist")}
    
    state.filter= newFilter
    saveStateLocalStorage();
};

const getCurrentFilter = () => {
    return state.filter
};

const getTodosbyfilter = (filter = Filters.All) => {
    switch(filter){
        case Filters.All:
            return [...state.Todos];
        case Filters.Completed:
            return state.Todos.filter(Todo => Todo.done);
        case Filters.Pending:
            return state.Todos.filter(Todo => !Todo.done);
        default:
            throw new Error("Filter not found")
    };
};

const counter = () =>{
    const pendings = state.Todos.filter(Todo => !Todo.done)
    const counter = pendings.length
    return counter
};




export default{
    initStore,
    loadStore,
    addTodo,
    toggleTodo,
    deleteCompleted,
    deleteTodo,
    setFilter,
    getCurrentFilter,
    getTodosbyfilter,
    state,
    Filters,
    getTodos,
    counter,
    saveStateLocalStorage
};