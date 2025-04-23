import { create } from "zustand";
import { TodoStore } from "../types/todos.types";

const setTodoStore = create<TodoStore>((set) => ({
    todos: [],
    addTodo(title, description) {
        set((state) => ({
            todos: [...state.todos, { id: Date.now(), title, description, status: false }]
        }))
    },
    updateTodo(id, title, description) {
        set((state) => ({
            todos: state.todos.map((t) => (t.id === id ? { ...t, title, description } : t))
        }))
    },
    updateStatusTodo(id) {
        set((state) => ({
            todos: state.todos.map((t) => (t.id === id) ? { ...t, status: true } : t )
        }))
    },
    deleteTodo(id) {
        set((state) => ({
            todos: state.todos.filter((t) => t.id !== id)
        }))
    },
}))

export default setTodoStore