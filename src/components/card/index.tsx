import { InTodos } from '@/store/todo/interface'
import { setDeleteTaskState, setTodoState, setUpdateTaskState, useTodoState } from '@/store/todo/todoSlice'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AiFillDelete, AiOutlineCheck } from 'react-icons/ai';
import { FiEdit } from 'react-icons/fi';
import { BsCheckLg } from 'react-icons/bs';
import { Field, Form, Formik } from 'formik';
import clsx from 'clsx';
import todoApi from '@/store/todo/todoApi';
import Pagination from '../pagination';

const Card: React.FC<{ isLoading: boolean }> = ({ isLoading }) => {
    const todos = useSelector(useTodoState)
    const postXpage = 5
    const [endValue, setEndValue] = useState<number>(postXpage)
    const [startValue, setStartValue] = useState<number>(0)
    const [avalibleForm, setAvalibleForm] = useState<number>(0)
    const [textTodo, setTextTodo] = useState<string>("")
    const dispatch = useDispatch()
    const [postTask] = todoApi.useAddTodoMutation()

    const onSubmit = async (e: any, { resetForm }: any) => {
        const payload = {
            ...e,
            userId: 5
        }
        const result: any = await postTask(payload)
        if (result) {
            dispatch(setTodoState([...todos, result.data]))
            resetForm()
        }
    }

    const editTaskHandler = async (payload: InTodos) => {
        setAvalibleForm(0)
        setTextTodo("")
        dispatch(setUpdateTaskState(payload))
    }

    const prev = () => {
        setStartValue((startValue) => startValue - postXpage)
        setEndValue((endValue) => endValue - postXpage)
    }

    const next = () => {
        setStartValue((startValue) => startValue + postXpage)
        setEndValue((endValue) => endValue + postXpage)
    }

    return (
        <div className='flex  items-center justify-center'>
            <div className='flex space-y-3 flex-col'>
                <Formik initialValues={{ todo: "", completed: false }} onSubmit={onSubmit}>
                    {(props) => (
                        <Form className="max-w-lg p-4 space-x-2 flex items-center dark:!text-white bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            <Field name="completed">
                                {({ field, form }: any) => (
                                    <span onClick={() => form.setFieldValue(field.name, !field.value)} className={clsx('cursor-pointer border rounded-full text-white', field.value ? 'bg-green-700 p-1  border-white' : 'p-3 border-gray-300 ')}>  {field.value && <AiOutlineCheck />}  </span>
                                )}
                            </Field>
                            <Field name="todo">
                                {({ field, form }: { field: any, form: any }) => (
                                    <input type='text' {...field} className='w-full outline-0 focus:no-underline text-sm dark:bg-gray-800' placeholder='write a text' />
                                )}
                            </Field>
                            <div className='p-0.5'>
                                {props.values.todo &&
                                    <button type="submit" disabled={props.isSubmitting} className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-2 py-2  dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                                        {props.isSubmitting ?
                                            <div role="status">
                                                <svg aria-hidden="true" className="w-4 h-4  text-gray-200 animate-spin dark:text-gray-600 fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
                                                <span className="sr-only">Loading...</span>
                                            </div>
                                            : <BsCheckLg />
                                        }
                                    </button>
                                }
                            </div>
                        </Form>
                    )}
                </Formik>
                <div className="max-w-lg p-2 space-y-2 bg-white text-gray-700 border dark:text-white border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    {isLoading ?
                        <>
                            {[...Array(5)].map((e, i: number) => (
                                <div key={i} className="animate-pulse w-96 flex space-x-4">
                                    <div className="rounded-full bg-slate-200 h-8 w-8"></div>
                                    <div className="flex-1 items-center pt-4 w-full">
                                        <div className="h-2 bg-slate-200 w-full rounded"></div>

                                    </div>
                                </div>
                            ))

                            }
                        </>
                        :
                        <>
                            {todos.filter((e: InTodos) => !e.isDeleted).slice(startValue, endValue).map((e: InTodos, i: number) => (
                                <div key={i} className='flex group justify-between hover:bg-slate-200  dark:hover:bg-gray-400 rounded p-2 items-center space-x-2'>
                                    <div className='flex items-center w-full space-x-3'>
                                        <span onClick={() => editTaskHandler({ ...e, completed: !e.completed })} className={clsx('cursor-pointer border rounded-full text-white', e.completed ? 'bg-green-700 p-1  border-white' : 'p-3 border-gray-300 group-hover:text-slate-200 ')}> {e.completed && <AiOutlineCheck />}  </span>
                                        {avalibleForm === e.id ?
                                            <input type='text' value={textTodo} onChange={(e: any) => setTextTodo(e.target.value)} onBlur={() => editTaskHandler({ ...e, todo: textTodo })} className='!w-full text-sm group-hover:bg-slate-200  dark:group-hover:bg-gray-400 outline-0 dark:bg-gray-800' />
                                            :
                                            <span className='text-sm' >{e.todo}</span>
                                        }
                                    </div>
                                    <div className='flex space-x-2 items-center'>
                                        <FiEdit onClick={() => (setAvalibleForm(e.id), setTextTodo(e.todo))} className=' cursor-pointer hidden group-hover:block' />
                                        <AiFillDelete onClick={() => dispatch(setDeleteTaskState(e))} className='cursor-pointer  hidden group-hover:block' />
                                    </div>
                                </div>
                            ))
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