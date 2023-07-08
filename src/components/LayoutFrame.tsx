import { AddAllTodos } from "@/redux/TodoSlicer";
import { useAppDispatch } from "@/redux/store";
import { Children } from "@/types/TypesFiles";
import React, { useEffect, useState } from "react";

const LayoutFrame = ({ children }: Children) => {
	const [webLoad, setWebLoad] = useState<boolean>(true);
	const dispatch = useAppDispatch();

	useEffect(() => {
		setWebLoad(true);
		const localTodos: string|null = window.localStorage.getItem("todos");
		if(!localTodos){
			setWebLoad(false);
			return;
		};
		
		dispatch(AddAllTodos(JSON.parse(localTodos)))
		setWebLoad(false);
	}, []);

	return webLoad ? (
		<div className="w-screen h-screen flex justify-center items-center bg-slate-950">
			<div className="w-[120px] h-[120px] rounded-full flex justify-center items-center text-base font-bold text-slate-200 after:w-[120px] after:h-[120px] after:rounded-full after:border-[5px] after:border-x-sky-400 after:border-y-slate-900 after:absolute after:animate-spin">
				Loading...
			</div>
		</div>
	) : (
		<div className="w-screen h-screen bg-slate-950">{children}</div>
	);
};

export default LayoutFrame;
