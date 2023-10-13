import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { InTodos } from './interface'


interface InTodosState {
    todos: InTodos[]
    todosFilter: InTodos[]
    disableInput: boolean
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
    todosFilter: [],
    modal: false,
    disableInput: false,
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
        setFilterState(state, action: PayloadAction<InTodos[]>) {
            state.todosFilter = action.payload
        },
        setEditTaskState(state, action: PayloadAction<InTodos>) {
            state.task = action.payload
        },
        setDisableInputState(state, action: PayloadAction<boolean>) {
            state.disableInput = action.payload
        },
        setDeleteTaskState(state, action: PayloadAction<InTodos>) {
            let newTodo = [...state.todos]
            const index = state.todos.findIndex((e: InTodos) => e.id === action.payload.id)
            newTodo[index] = { ...action.payload, isDeleted: true }
            state.todos = newTodo
            state.todosFilter = newTodo
       
        },
        setUpdateTaskState(state, action: PayloadAction<InTodos>) {
            let newTodo = [...state.todos]
            const index = state.todos.findIndex((e: InTodos) => e.id === action.payload.id)
            newTodo[index] = { ...action.payload }
            state.todos = newTodo
            state.todosFilter = newTodo
        }
    }
})

export const { setTodoState, setModalState, setFilterState, setEditTaskState, setDisableInputState, setDeleteTaskState, setUpdateTaskState } = todoSlice.actions
export const useTodoState = (state: any) => state.todoState.todos
export const useModalState = (state: any) => state.todoState.modal
export const useTaskEditState = (state: any) => state.todoState.task
export const useFilterState = (state: any) => state.todoState.todosFilter
export const useDisableInput = (state: any) => state.todoState.disableInput
export default todoSlice.reducer
