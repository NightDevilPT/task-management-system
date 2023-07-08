import React, { Dispatch } from "react"

// ----- Type For Frames Children
export interface Children {
    children:React.ReactNode
}

// ----- Type Todo 
export type TodoTypes = {
    id:number,
    title:string,
    status:string,
    description:string
}


export type TodoProps = {
    id?:number|undefined,
    data:TodoTypes,
    showAddTodo?:boolean,
    todoType:string,
    setShowAddTodo:Dispatch<React.SetStateAction<boolean>>,
    setTodoData:Dispatch<React.SetStateAction<TodoTypes>>,
    setTodoType:Dispatch<React.SetStateAction<string>>
}