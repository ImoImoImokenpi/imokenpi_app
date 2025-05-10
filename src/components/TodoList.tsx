import React from "react";
import { Todo } from "../lib/interface";
import { deleteTodo } from "../lib/fetch";

type Props = {
    todo: Todo[];
    onDelete: () => void;
};

const TodoList = ({todo, onDelete}: Props) => {
    const handleDelete = async (id: number) => {
        await deleteTodo(id);
        onDelete();
    } 

    return(
        <div>
            <ul className="space-y-2">
                {todo.map((item) => (
                    <li 
                        key={item.id}
                        className="flex justify-between items-center px-4 py-2 bg-gray-100 rounded shadow-md"
                    >
                        <span className="text-gray-800">{item.title}</span>
                        <span
                            onClick={() => handleDelete(item.id)}
                            className="text-red-500 hover:text-red-700 text-xl" aria-lavel="削除"
                        >
                            ×
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;