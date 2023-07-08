import { TodoTypes } from "@/types/TypesFiles";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";


interface TodoSlicer {
    todos:TodoTypes[]
}

const initialState:TodoSlicer = {
    todos:[]
}


const todoSlicer = createSlice({
    name:"todoSlicer",
    initialState,
    reducers:{
        AddNewTodo:(state,action:PayloadAction<TodoTypes>)=>{
            state.todos.push(action.payload);
        },
        AddAllTodos:(state,action:PayloadAction<TodoTypes[]>)=>{
            state.todos = [...action.payload];
        },
        RemoveTodo:(state,action:PayloadAction<TodoTypes>)=>{
            state.todos = state.todos.filter((items)=>items.id!==action.payload.id);
        },
        UpdateTodo:(state,action:PayloadAction<TodoTypes>)=>{
            const allTodos:TodoTypes[] = [];

            state.todos.map((items,index)=>{
                if(items.id===action.payload.id){
                    allTodos.push(action.payload);
                }else{
                    allTodos.push(items);
                }
            });
            state.todos = allTodos;
        },
        
    }
});

export const {AddNewTodo,AddAllTodos,RemoveTodo,UpdateTodo} = todoSlicer.actions;
export default todoSlicer.reducer;