import { InTodos } from '@/store/todo/interface';
import { setDisableInputState, setTodoState, useFilterState, useTodoState } from '@/store/todo/todoSlice';
import clsx from 'clsx';
import React from 'react'
import { MdArrowDropDown } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';

const filterStatus = [
    {
        value: "all",
        label: "Todas"
    }, {
        value: "pending",
        label: "Tareas pendientes"
    }, {
        value: "complete",
        label: "Tareas completadas"
    }
]

const InputSearch = () => {
    const filterData = useSelector(useFilterState)
    const dispatch = useDispatch()
    const [dropdown, setDropdown] = React.useState<boolean>(false)
    const [dropdownFilter, setDropdownFilter] = React.useState<string>("all")

    //permite crear una tarea
    const onSubmit = (el: any) => {
        const result = el.target.value
   
        if (result.trim() !== "") {
            const filter = filterData.filter((e: InTodos) => e.todo.toLowerCase().includes(result.toLowerCase()))
            if (filter.length) {
                dispatch(setTodoState(filter))
                dispatch(setDisableInputState(true))
            }
        } else {
            dispatch(setTodoState(filterData))
            dispatch(setDisableInputState(false))
        }
    }

    //filtramos los elementos de una array dependiendo de la condición y se setea al gestor de estados[redux]
    const onFilter = (key: string) => {
        setDropdownFilter(key)
        switch (key) {
            case "all":
                return dispatch(setTodoState(filterData))
            case "pending":
                return dispatch(setTodoState(filterData.filter((e: InTodos) => e.completed === false)))
            case "complete":
                return dispatch(setTodoState(filterData.filter((e: InTodos) => e.completed)))
            default:
                return dispatch(setTodoState(filterData))
        }
    }

    return (
        <div className="flex relative">
            <button onClick={() => setDropdown(!dropdown)} className="flex-shrink-0 z-5 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600" type="button">{filterStatus.find((e: any) => e.value === dropdownFilter)?.label}  <MdArrowDropDown className='h-5 w-5' /></button>
            <div className={clsx("z-10 absolute top-12   bg-white divide-y divide-gray-100 rounded-lg shadow-lg w-44 dark:bg-gray-700", dropdown ? 'block' : 'hidden')}>
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-button">
                    {filterStatus.map((e: any, i: number) => (
                        <li key={i}>
                            <button type="button" onClick={() => onFilter(e.value)} className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{e.label}</button>
                        </li>
                    ))}
                </ul>
            </div>
            <input type="text" onChange={onSubmit} className="block p-2.5 pr-10 w-full z-5 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" />
        </div>
    )
}

export default InputSearch