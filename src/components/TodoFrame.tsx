import { RemoveTodo } from "@/redux/TodoSlicer";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { TodoProps } from "@/types/TypesFiles";
import React, { MouseEvent } from "react";

import { BiEdit } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";

const TodoFrame = ({
	data,
	id,
	todoType,
	setTodoData,
	setShowAddTodo,
	setTodoType,
}: TodoProps) => {
	const dispatch = useAppDispatch();
	const DateTime: any = `${new Date(data.id).toLocaleString([], {
		hour12: true,
	})}`;

	const handleUpdateTodo = (event: MouseEvent<HTMLButtonElement>) => {
		setTodoData(data);
		setTodoType("update todo");
		setShowAddTodo(true);
	};

	const handleRemoveTodo = (event: MouseEvent<HTMLButtonElement>) => {
		dispatch(RemoveTodo(data));
	};

	return (
		<div className="h-auto bg-slate-900 rounded p-3 flex justify-start items-center flex-col">
			<div className="w-full h-[35px] flex justify-between items-center">
				<span
					className={`w-auto h-auto ${
						data.status === "Todo"
							? "bg-orange-500"
							: data.status === "In Progress"
							? "bg-sky-600"
							: "bg-green-600"
					} flex justify-center items-center font-bold text-slate-800 px-2 rounded`}>
					{data.status}
				</span>

				<div className="w-auto h-full flex gap-2">
					<button
						className="w-auto h-full p-1 bg-green-600 rounded"
						onClick={handleUpdateTodo}>
						<BiEdit className="w-full h-full text-slate-100" />
					</button>
					<button
						className="w-auto h-full p-1 bg-red-600 rounded"
						onClick={handleRemoveTodo}>
						<MdDeleteForever className="w-full h-full text-slate-100" />
					</button>
				</div>
			</div>

			<span className="w-full h-auto mt-1 text-base text-slate-500 font-bold italic text-right">
				{DateTime}
			</span>

			<div className="w-full h-auto mt-1 flex flex-col">
				<span className="w-full h-auto text-base text-slate-500 font-bold italic">
					Title
				</span>
				<span className="w-full h-auto text-2xl font-bold text-slate-200">
					{data.title}
				</span>
			</div>

			<div className="w-full h-auto mt-1 flex flex-col">
				<span className="w-full h-auto text-base text-slate-500 font-bold italic">
					Description
				</span>
				<span className="w-full h-auto text-xl font-bold text-slate-200">
					{data.description}
				</span>
			</div>
		</div>
	);
};

export default TodoFrame;
