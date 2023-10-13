import React, { useState } from 'react'
import { createColumnHelper } from "@tanstack/react-table";
import { DataTable } from "@/components/table/index";
import { AiFillDelete } from 'react-icons/ai';
import { FiEdit } from 'react-icons/fi';
import {  InTodos } from '@/store/todo/interface';
import { useDispatch, useSelector } from 'react-redux';
import { setDeleteTaskState, setEditTaskState, setModalState, useModalState, useTodoState } from '@/store/todo/todoSlice';
import Pagination from '../pagination';
import { toast } from 'react-toastify';

type Todo = {
  id: number;
  todo: string;
  completed: boolean;
  userId: number
};

const List = () => {
  const todos = useSelector(useTodoState)
  const modalTask = useSelector(useModalState)
  const dispatch = useDispatch()
  const columnHelper = createColumnHelper<Todo>();
  const postXpage = 10
  const [endValue, setEndValue] = useState<number>(postXpage)
  const [startValue, setStartValue] = useState<number>(0)

  const columns = [
    columnHelper.accessor("id", {
      cell: (info) => info.getValue(),
      header: "Id"
    }),
    columnHelper.accessor("todo", {
      cell: (info) => info.getValue(),
      header: "Descripción",
    }),
    columnHelper.accessor("completed", {
      cell: (info) => info.getValue() ? "Completado" : "No completado",
      header: "Completado",
    }),
    columnHelper.accessor("userId", {
      cell: (info) =>
        <div className='flex items-center space-x-2'>
          <FiEdit onClick={() =>editHandler(info.row.original)} className='cursor-pointer' />
          <AiFillDelete onClick={() => deleteList(info.row.original)} className='cursor-pointer' />
        </div>,
      header: "Acciones",
    })
  ];

  const editHandler =  (payload: InTodos) => {
    dispatch(setModalState(!modalTask))
    dispatch(setEditTaskState(payload))
  }

  const prev = () => {
    setStartValue((startValue) => startValue - postXpage)
    setEndValue((endValue) => endValue - postXpage)
  }

  const next = () => {
    setStartValue((startValue) => startValue + postXpage)
    setEndValue((endValue) => endValue + postXpage)
  }
  const deleteList = (payload:InTodos) => {
    dispatch(setDeleteTaskState(payload))
    toast.success('Tarea eliminada!', {
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

  return (
    <div className='flex flex-col '>
      <DataTable columns={columns} data={todos.filter((e: InTodos) => !e.isDeleted).slice(startValue, endValue)} />
      <div className='flex items-center mt-2 justify-end'>
        <Pagination startValue={startValue} endValue={endValue} totalItems={todos.filter((e: InTodos) => !e.isDeleted).length} prev={prev} next={next} />
      </div>
    </div>
  )
}

export default List