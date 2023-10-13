import React from 'react'
import { BsCheckLg } from 'react-icons/bs';
import { Field, Form, Formik } from 'formik';
import todoApi from '@/store/todo/todoApi';
import { setFilterState, setTodoState, useDisableInput, useTodoState } from '@/store/todo/todoSlice';
import { AiOutlineCheck } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import { toast } from 'react-toastify';
import ButtonSubmmit from '../buttonSubmitt';

const SubmitTask = () => {
    const todos = useSelector(useTodoState)
    const disableInput = useSelector(useDisableInput)
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
            dispatch(setFilterState([...todos, result.data]))
            resetForm()
            toast.success('Tarea creada correctamente!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }

    return (
        <Formik initialValues={{ todo: "", completed: false }} onSubmit={onSubmit}>
            {(props) => (
                <Form className="max-w-lg  p-4 space-x-2 flex items-center dark:!text-white bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <Field name="completed">
                        {({ field, form }: any) => (
                            <span onClick={() => form.setFieldValue(field.name, !field.value)} className={clsx('cursor-pointer border rounded-full text-white', field.value ? 'bg-green-700 p-1  border-white' : 'p-3 border-gray-300 ')}>  {field.value && <AiOutlineCheck />}  </span>
                        )}
                    </Field>
                    <Field name="todo">
                        {({ field, form }: { field: any, form: any }) => (
                            <input disabled={disableInput} type='text' {...field} className='w-full outline-0 focus:no-underline text-sm dark:bg-gray-800' placeholder='write a text' />
                        )}
                    </Field>
                    <div className='p-0.5'>
                        {props.values.todo &&
                            <ButtonSubmmit isLoading={props.isSubmitting} />
                        }
                    </div>
                </Form>
            )}
        </Formik>
    )
}

export default SubmitTask