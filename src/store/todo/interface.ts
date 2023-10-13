export interface InData  {
    todos: InTodos[]
    total: number
    skip: number,
    limit: number
}
export interface InTodos {
    id:number
    todo: string
    completed:boolean
    userId:number
    isDeleted?:boolean
} 
