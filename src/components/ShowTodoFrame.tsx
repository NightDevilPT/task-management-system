import { AddNewTodo, UpdateTodo } from "@/redux/TodoSlicer";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { TodoProps } from "@/types/TypesFiles";
import React, { ChangeEvent, FormEvent, MouseEvent } from "react";

import { AiFillCloseSquare } from "react-icons/ai";

const ShowTodoFrame = ({
	data,
	showAddTodo,
	todoType,
	setTodoData,
	setShowAddTodo,
}: TodoProps) => {
	const todoStatusType: string[] = ["Todo", "In Progress", "Completed"];
	const dispatch = useAppDispatch();

	const HandleAddTodo=(event:MouseEvent<HTMLButtonElement>)=>{
		event.preventDefault();
		if(data.title===""||data.description===""||data.description==="/n"){
			alert("All fields are required...");
			return;
		}

		if(todoType==="add todo"){
			const newTodo = {
				id:data.id,
				title:data.title,
				status:data.status,
				description:data.description
			}
	
			dispatch(AddNewTodo(newTodo));
		}else{
			const updatedTodo = {
				id:data.id,
				title:data.title,
				status:data.status,
				description:data.description
			}
	
			dispatch(UpdateTodo(updatedTodo));
		}
		setShowAddTodo(false);
	}

	return (
		<div
			className={`fixed w-screen h-screen top-0 left-0 ${
				showAddTodo ? "scale-1" : "scale-0"
			} transition-all duration-500 backdrop-blur flex justify-center items-center`}>
			<div className="relative w-[300px] h-auto rounded bg-slate-200 flex justify-start items-center flex-col">
				<button
					className="bg-slate-200"
					onClick={(event: MouseEvent<HTMLButtonElement>) => {
						setShowAddTodo(false);
					}}>
					<AiFillCloseSquare className="absolute top-[-40px] right-0 w-[35px] h-[35px] text-red-700 rounded cursor-pointer" />
				</button>
				<h1 className="w-full h-[50px] flex justify-center items-center bg-slate-900 rounded-tl-sm rounded-tr-sm text-xl capitalize text-slate-200 font-bold">
					{todoType}
				</h1>
				<form className="w-full h-auto px-3 flex justify-start items-center flex-col gap-3 py-4">
					<input
						type="text"
						value={data.id}
						className="w-full h-[35px] bg-slate-500 rounded px-3 text-slate-300 text-xl border-none outline-none"
						disabled
					/>

					<input
						type="text"
						value={data.title}
						className="w-full h-[35px] bg-slate-50 rounded px-3 text-slate-800 text-base border-none outline-none placeholder:text-slate-400"
						placeholder="write title..."
						onChange={(event: ChangeEvent<HTMLInputElement>) => {
							setTodoData((pre) => ({
								...pre,
								title: event.target.value,
							}));
						}}
					/>

					<select
						className="w-full h-[35px] bg-slate-50 rounded px-3 text-slate-800 text-base border-none outline-none"
						onChange={(event: ChangeEvent<HTMLSelectElement>) => {
							console.log(event.target.value);
							setTodoData((pre) => ({
								...pre,
								status: event.target.value,
							}));
						}}>
						{todoStatusType.map((items, index) => {
							return (
								<option
									key={"todoTypes_" + items + "_" + index}
									value={items}>
									{items}
								</option>
							);
						})}
					</select>

					<textarea
						value={data.description}
						className="w-full h-[70px] py-1 bg-slate-50 rounded px-3 text-slate-800 text-base border-none outline-none placeholder:text-slate-400 resize-none"
						placeholder="write description..."
						onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
							setTodoData((pre) => ({
								...pre,
								description: event.target.value,
							}));
						}}
					/>

					<div className="w-full h-[35px] mt-3 flex justify-between">
						<button
							className="w-[120px] h-full px-3 py-1 text-slate-200 bg-red-600 rounded font-bold flex justify-center items-center cursor-pointer"
							onClick={(event: MouseEvent<HTMLButtonElement>) => {
								event.preventDefault();
								setTodoData({
									id:0,
									title: "",
									status: "",
									description: "",
								});
							}}>
							Cancel
						</button>

						<button type="submit" className="w-[120px] h-full px-3 py-1 text-slate-200 bg-green-600 rounded font-bold capitalize" onClick={HandleAddTodo}>
							{todoType}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default ShowTodoFrame;
