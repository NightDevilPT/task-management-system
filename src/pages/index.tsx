import ShowTodoFrame from "@/components/ShowTodoFrame";
import TodoFrame from "@/components/TodoFrame";
import { useAppSelector } from "@/redux/store";
import { TodoTypes } from "@/types/TypesFiles";
import React, { ChangeEvent, MouseEvent, useEffect, useState } from "react";

const index = () => {
	const sortList: string[] = ["All", "Todo", "In Progress", "Completed"];
	const todos = useAppSelector((state) => state.todoStore.todos);

	// ------ for Filtered Todo Data to Show
	const [filteredTodo, setFilteredTodo] = useState<TodoTypes[]>([]);

	// ------ For Showing Add or Update Todo Form
	const [showAddTodo, setShowAddTodo] = useState<boolean>(false);

	// ------ This State helps to Make decision for Add or Update Todo
	const [todoType, setTodoType] = useState<string>("add todo");

	useEffect(() => {
		setFilteredTodo([...todos]);
		window.localStorage.setItem("todos", JSON.stringify(todos));
	}, [todos]);

	// ------ This State Helps to Add New Data or Update Data
	const [todoData, setTodoData] = useState<TodoTypes>({
		id: 0,
		title: "",
		status: "Todo",
		description: "",
	});

	const HandleShowTodoFrame = (event: MouseEvent<HTMLButtonElement>) => {
		setTodoData({
			id: new Date().getTime(),
			title: "",
			status: "Todo",
			description: "",
		});
		setTodoType("add todo");
		setShowAddTodo(true);
	};

	const HandleFilterTodos = (event: ChangeEvent<HTMLSelectElement>) => {
		let filter: TodoTypes[] = [];
		if (event.target.value !== "All") {
			filter = todos.filter(
				(items) => items.status === event.target.value
			);
			setFilteredTodo(filter);
			return;
		}
		setFilteredTodo([...todos]);
	};

	return (
		<React.Fragment>
			<button
				className="fixed right-4 bottom-3 w-auto h-auto px-5 py-3 bg-sky-600 flex justify-center items-center rounded font-bold text-slate-200 text-xl"
				onClick={HandleShowTodoFrame}>
				Add Todo
			</button>
			<div className="w-screen h-[80px]">
				<header className="container h-full flex justify-center items-center border-b-2 border-slate-600 text-3xl text-slate-200 font-bold max-sm:text-2xl">
					Task Management System
				</header>

				<div className="container mt-3 h-[50px] flex justify-center items-center gap-2">
					<span className="text-slate-200 font-bold text-xl">
						Sort By :
					</span>
					<select
						className="w-[200px] h-[30px] outline-none border-none rounded text-center"
						onChange={HandleFilterTodos}>
						{sortList.map((items, index) => {
							return (
								<option
									key={"sort_" + items + "_" + index}
									value={items}>
									{items}
								</option>
							);
						})}
					</select>
				</div>
z
				<div className="container h-auto max-h-[calc(100vh-240px)] overflow-y-auto grid grid-cols-3 gap-3 max-lg:grid-cols-2 max-sm:grid-cols-1 max-md:px-2">
					{filteredTodo?.map((items, index) => {
						return (
							<TodoFrame
								key={items.id}
								data={items}
								todoType={todoType}
								setTodoData={setTodoData}
								showAddTodo={showAddTodo}
								setShowAddTodo={setShowAddTodo}
								setTodoType={setTodoType}
							/>
						);
					})}
				</div>
			</div>

			<ShowTodoFrame
				data={todoData}
				todoType={todoType}
				setTodoData={setTodoData}
				showAddTodo={showAddTodo}
				setShowAddTodo={setShowAddTodo}
				setTodoType={setTodoType}
			/>
		</React.Fragment>
	);
};

export default index;
