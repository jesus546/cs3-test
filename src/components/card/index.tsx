import { InTodos } from '@/store/todo/interface'
import { setDeleteTaskState, setUpdateTaskState, useTodoState } from '@/store/todo/todoSlice'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AiFillDelete, AiOutlineCheck } from 'react-icons/ai';
import { FiEdit } from 'react-icons/fi';
import clsx from 'clsx';
import Pagination from '../pagination';
import Skeleton from '../loading';
import SubmitTask from './submitTask';
import EmptyState from '../emptyState';
import { toast } from 'react-toastify';

const Card: React.FC<{ isLoading: boolean }> = ({ isLoading }) => {
    const todos = useSelector(useTodoState)
    const postXpage = 5
    const [endValue, setEndValue] = useState<number>(postXpage)
    const [startValue, setStartValue] = useState<number>(0)
    const [avalibleForm, setAvalibleForm] = useState<number>(0)
    const [textTodo, setTextTodo] = useState<string>("")
    const [invalid, setInvalid] = useState<boolean>(false)
    const dispatch = useDispatch()

    const editTaskHandler = async (payload: InTodos) => {
        if (payload.todo.length) {
            setAvalibleForm(0)
            setTextTodo("")
            dispatch(setUpdateTaskState(payload))
            setInvalid(false)
        } else {
            return setInvalid(true)     
        }

    }
    const deleteList = (payload: InTodos) => {
        dispatch(setDeleteTaskState(payload))
        toast.error('Tarea eliminada!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }

    const prev = () => {
        setStartValue((startValue) => startValue - postXpage)
        setEndValue((endValue) => endValue - postXpage)
    }

    const next = () => {
        setStartValue((startValue) => startValue + postXpage)
        setEndValue((endValue) => endValue + postXpage)
    }
    const onChangeText = (e:any) => {
        const result = e.target.value
        setTextTodo(result)
        setInvalid(false)
    }

    return (
        <div className='flex  items-center justify-center'>
            <div className='flex space-y-3 flex-col'>
                <SubmitTask />
                <div className="max-w-lg p-2 w-full space-y-2 bg-white text-gray-700 border dark:text-white border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    {isLoading ?
                        <Skeleton />
                        :
                        <>
                            {todos.length ?
                                <>
                                    {
                                        todos.filter((e: InTodos) => !e.isDeleted).slice(startValue, endValue).map((e: InTodos, i: number) => (
                                            <div key={i} className={clsx('flex group justify-between  rounded p-2 items-center space-x-2', avalibleForm !== e.id && 'hover:bg-slate-200  dark:hover:bg-gray-400')}>
                                                <div className='flex overflow-hidden items-center w-full space-x-3'>
                                                    <span onClick={() => editTaskHandler({ ...e, completed: !e.completed })} className={clsx('cursor-pointer border  rounded-full text-white', e.completed ? 'bg-green-700 p-1  border-white' : 'p-3 border-gray-300 group-hover:text-slate-200 ')}> {e.completed && <AiOutlineCheck />}  </span>
                                                    {avalibleForm === e.id ?
                                                        <div className='flex flex-col space-y-1 w-full'>
                                                            <input type='text' value={textTodo} onChange={onChangeText} onBlur={() => editTaskHandler({ ...e, todo: textTodo })} 
                                                               className={clsx('!w-full outline-none text-sm group-hover:bg-slate-200 border border-gray-600 rounded-lg px-1  py-2 dark:group-hover:bg-gray-400  dark:bg-gray-800', invalid && "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500")} />
                                                            {invalid && <p className="mt-2 text-sm text-red-600 dark:text-red-500">El campo es requerido.</p> }
                                                        </div>

                                                        :
                                                        <span className='text-sm' >{e.todo}</span>
                                                    }
                                                </div>
                                                {avalibleForm !== e.id &&
                                                    <div className='flex space-x-2 items-center'>
                                                        <FiEdit onClick={() => (setAvalibleForm(e.id), setTextTodo(e.todo))} className=' cursor-pointer hidden group-hover:block' />
                                                        <AiFillDelete onClick={() => deleteList(e)} className='cursor-pointer  hidden group-hover:block' />
                                                    </div>
                                                }
                                            </div>
                                        ))
                                    }
                                </>
                                :
                                <EmptyState />
                            }
                        </>
                    }
                    <div className='flex items-center justify-between px-2'>
                        {isLoading ?
                            <div className="animate-pulse w-24 ">
                                <div className="h-2 bg-slate-200 w-full rounded"></div>
                            </div>
                            :
                            <span>
                                {todos.filter((e: InTodos) => !e.isDeleted).length} Tareas
                            </span>
                        }
                        <Pagination startValue={startValue} endValue={endValue} totalItems={todos.filter((e: InTodos) => !e.isDeleted).length} prev={prev} next={next} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card