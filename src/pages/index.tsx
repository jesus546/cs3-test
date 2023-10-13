import Nav from '@/components/nav';
import { useDispatch, useSelector } from 'react-redux';
import { useDarkState } from '@/store/dark/darkSlice';
import todoApi from '@/store/todo/todoApi';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import List from '@/components/list';
import Card from '@/components/card';
import { setModalState, setTodoState, useModalState } from '@/store/todo/todoSlice';
import ModalTask from '@/components/modalTask';

const todoOptions = [
  {
    title: "Card",
    value: "card"
  },
  {
    title: "Lista",
    value: "list"
  }
]

export default function Home() {
  const dark = useSelector(useDarkState)
  const modalTask = useSelector(useModalState)
  const [selectItem, setSelectItem] = useState<string>(todoOptions[0].value)
  const { data, isLoading } = todoApi.useAllTodoQuery()
  const dispatch = useDispatch()

  useEffect(() => {
    if (data) {
      dispatch(setTodoState(data.todos))
    }
  }, [data, dispatch])


  const interfacePages = (key: string) => {
    switch (key) {
      case "list":
        return <List />
      case "card":
        return <Card isLoading={isLoading} />
      default:
        return <Card  isLoading={isLoading} />
    }
  }

  return (
    <main
      className={`flex min-h-screen flex-col  ${dark && 'dark'}`}
    >
      <Nav />
      <div className='space-y-3  pt-20 p-8'>
        <div className='flex justify-between '>
          <div className='flex space-x-2 items-center'>
            <span className="self-center text-lg md:block  sm:hidden font-semibold whitespace-nowrap ">Tareas</span>
            <div className='flex space-x-2 border py-1.5 px-2 rounded items-center'>

              {todoOptions.map((e: { title: string, value: string }, i: number) => (
                <div onClick={() => setSelectItem(e.value)} className={clsx('rounded cursor-pointer hover:text-white hover:bg-gray-800   text-sm text-dark font-semibold  px-1.5', selectItem === e.value && 'text-white bg-gray-800')} key={i}>{e.title}</div>
              ))}

            </div>
          </div>
          <button onClick={() => dispatch(setModalState(!modalTask))} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3.5 py-2  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Crear tarea</button>
        </div>
        {interfacePages(selectItem)}
      </div>
      <ModalTask />
    </main>
  )
}
