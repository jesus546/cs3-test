import Nav from '@/components/nav';
import { useDispatch, useSelector } from 'react-redux';
import { useDarkState } from '@/store/dark/darkSlice';
import todoApi from '@/store/todo/todoApi';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import List from '@/components/list';
import Card from '@/components/card';
import { setFilterState, setModalState, setTodoState, useDisableInput, useModalState } from '@/store/todo/todoSlice';
import ModalTask from '@/components/modalTask';
import InputSearch from '@/components/inputSearch';
import { AiFillAppstore, AiOutlineUnorderedList } from 'react-icons/ai';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const todoOptions = [
  {
    icon: <AiFillAppstore />,
    value: "card"
  },
  {
    icon: <AiOutlineUnorderedList />,
    value: "list"
  }
]

export default function Home() {
  const dark = useSelector(useDarkState)
  const modalTask = useSelector(useModalState)
  const disableInput = useSelector(useDisableInput)
  const [selectItem, setSelectItem] = useState<string>(todoOptions[0].value)
  const { data, isLoading } = todoApi.useAllTodoQuery()
  const dispatch = useDispatch()

  useEffect(() => {
    if (data) {
      dispatch(setTodoState(data.todos))
      dispatch(setFilterState(data.todos))
    }
  }, [data, dispatch])

  const interfacePages = (key: string) => {
    switch (key) {
      case "list":
        return <List />
      case "card":
        return <Card isLoading={isLoading} />
      default:
        return <Card isLoading={isLoading} />
    }
  }

  return (
    <main
      className={`flex min-h-screen flex-col  ${dark && 'dark'}`}
    >
      <Nav />
      <div className='space-y-3  pt-24 p-8'>
        <div className='flex sm:flex-col sm:space-y-2 justify-between '>
          <div className='flex md:space-x-2 sm:flex-col sm:space-y-2 sm:items-start items-center'>
            <span className="self-center dark:text-gray-900 text-lg md:block  sm:hidden font-semibold  ">Tareas</span>
            <InputSearch />
            <div className='flex space-x-2 border py-1.5 px-2 rounded items-center'>
              {todoOptions.map((e: { icon: React.JSX.Element, value: string }, i: number) => (
                <div onClick={() => setSelectItem(e.value)} className={clsx('rounded cursor-pointer hover:text-white hover:bg-gray-800   text-sm text-dark font-semibold  px-2 py-2', selectItem === e.value && 'text-white bg-gray-800')} key={i}>{e.icon}</div>
              ))}
            </div>
          </div>
          {selectItem === "list" &&
            <button disabled={disableInput} onClick={() => dispatch(setModalState(!modalTask))} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3.5 py-2  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Crear tarea</button>
          }

        </div>
        {interfacePages(selectItem)}
      </div>
      <ModalTask />
      <ToastContainer/>
    </main>
  )
}
