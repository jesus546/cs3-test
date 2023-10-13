import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { InTodos } from './interface'

interface InTodosState {
    todos: InTodos[]
    modal: boolean,
    task: InTodos
}

export const taskInitial = {
    id: 0,
    todo: "",
    completed: false,
    userId: 0
}

const initialState: InTodosState = {
    todos: [],
    modal: false,
    task: taskInitial
}

export const todoSlice = createSlice({
    name: 'todoState',
    initialState,
    reducers: {
        setTodoState(state, action: PayloadAction<InTodos[]>) {
            state.todos = action.payload
        },
        setModalState(state, action: PayloadAction<boolean>) {
            state.modal = action.payload
        },
        setEditTaskState(state, action: PayloadAction<InTodos>) {
            state.task = action.payload
        },
        setDeleteTaskState(state, action: PayloadAction<InTodos>) {
            let newTodo = [...state.todos]
            const index = state.todos.findIndex((e: InTodos) => e.id === action.payload.id)
            newTodo[index] =  { ...action.payload, isDeleted: true  }
            state.todos = newTodo
        },
        setUpdateTaskState(state, action: PayloadAction<InTodos>) {
            let newTodo = [...state.todos]
            const index = state.todos.findIndex((e: InTodos) => e.id === action.payload.id)
            newTodo[index] =  { ...action.payload }
            state.todos = newTodo
        }
    }
})

export const { setTodoState, setModalState, setEditTaskState, setDeleteTaskState, setUpdateTaskState } = todoSlice.actions
export const useTodoState = (state: any) => state.todoState.todos
export const useModalState = (state: any) => state.todoState.modal
export const useTaskEditState = (state: any) => state.todoState.task
export default todoSlice.reducer

function deleteTodo(id: any): any {
    throw new Error('Function not implemented.')
}
