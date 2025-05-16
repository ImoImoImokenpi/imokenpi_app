import React from "react";
import { Kakeibo } from "../lib/interface";
import { deleteKakeibo } from "../app/api/kakeiboApi/fetch";

type Props = {
    kakeibo: Kakeibo[];
    onDelete: () => void;
};

const KakeiboList = ({kakeibo, onDelete}: Props) => {
    const handleDelete = async (id: number) => {
        await deleteKakeibo(id);
        onDelete();
    } 

    return(
        <div>
            <ul className="space-y-2">
                {kakeibo.map((item) => (
                    <li
                    key={item.id}
                    className="flex justify-between items-center px-4 py-3 bg-white border rounded shadow-sm"
                    >
                        <div className="flex flex-col text-sm text-gray-700">
                        <span className="font-semibold">{item.title}</span>
                        <span className="text-gray-400 text-xs">
                            📅 {item.date.slice(5, 10)}
                        </span>
                        </div>
                        <div className="flex items-center gap-4">
                        <span>
                            ￥{item.amount.toLocaleString()}
                        </span>
                        <button
                            onClick={() => handleDelete(item.id)}
                            className="text-gray-400 text-red-600"
                            title="削除"
                        >
                            ✕
                        </button>
                        </div>
                    </li>
                    // <li 
                    //     key={item.id}
                    //     className="flex justify-between items-center px-4 py-2 bg-gray-100 rounded shadow-md"
                    // >
                    //     <span className="text-gray-800">{item.title}: {item.amount}: {item.date.slice(5, 10)}</span>
                    //     <span
                    //         onClick={() => handleDelete(item.id)}
                    //         className="text-red-500 hover:text-red-700 text-xl" aria-label="削除"
                    //     >
                    //         ×
                    //     </span>
                    // </li>
                ))}
            </ul>
        </div>
    );
};

export default KakeiboList;