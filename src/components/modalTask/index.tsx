import React from 'react'
import Modal from '../modal'
import { Field, Form, Formik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { setEditTaskState, setModalState, setTodoState, setUpdateTaskState, taskInitial, useModalState, useTaskEditState, useTodoState } from '@/store/todo/todoSlice'
import todoApi from '@/store/todo/todoApi'

const ModalTask = () => {
  const todos = useSelector(useTodoState)
  const modalTask = useSelector(useModalState)
  const editTask = useSelector(useTaskEditState)
  const dispatch = useDispatch()
  const [postTask] = todoApi.useAddTodoMutation()
  const [editTaskPut] = todoApi.useUpdatedTodoMutation()
  const onSubmit = async (e: any, { resetForm }: any) => {
    if (editTask.id) {
      const payload = {
        ...editTask,
        ...e
      }
      dispatch(setUpdateTaskState(payload))
      closeModal()
      resetForm()
    } else {
      const payload = {
        ...e,
        userId: 5
      }
      const result: any = await postTask(payload)
      if (result) {
        dispatch(setTodoState([...todos, result.data]))
        closeModal()
        resetForm()
      }
    }

  }
  const closeModal = () => {
    dispatch(setEditTaskState(taskInitial))
    dispatch(setModalState(!modalTask))
  }

  return (

    <Modal showModal={modalTask} setShowModal={closeModal}
      header={editTask.id ? "Editar tarea" : "Agregar tarea"}
    >
      <Formik initialValues={{ todo: editTask.todo, completed: editTask.completed }} onSubmit={onSubmit}>
        {(props) => (
          <Form >
            <div className='flex  flex-col space-y-3 dark:!text-white'>
              <Field name="todo">
                {({ field, form }: { field: any, form: any }) => (
                  <div>
                    <label htmlFor="todo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descripción de la tarea</label>
                    <textarea id="todo" {...field} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                  </div>
                )}
              </Field>
              <Field name="completed">
                {({ field, form }: any) => (
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input id="completed" {...field} type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" />
                    </div>
                    <label htmlFor="completed" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Marcar como completada</label>
                  </div>
                )}
              </Field>
            </div>

            <div className="flex items-center space-x-2 mt-4 border-gray-200 rounded-b dark:border-gray-600">
              <div className='flex flex-col w-full space-y-3'>
                <button type="submit" disabled={props.isSubmitting} className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  {props.isSubmitting ?
                    <div className='flex items-center justify-center' role="status">
                      <svg aria-hidden="true" className="w-4 h-4  text-gray-200 animate-spin dark:text-gray-600 fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
                      <span className="sr-only">Loading...</span>
                    </div>
                    : editTask.id ? "Editar" : "Guardar"
                  }
                </button>
                <button type="reset" onClick={closeModal} className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Cancelar</button>
              </div>
            </div>

          </Form>
        )}
      </Formik>
    </Modal>

  )
}

export default ModalTask