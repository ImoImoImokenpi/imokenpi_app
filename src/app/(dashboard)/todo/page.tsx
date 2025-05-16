"use client";

import React, { useEffect, useState } from "react";
import Header from "../../../components/Header";
import TodoList from "../../../components/TodoList";
import { fetchTodos, addTodo } from "../../api/todoApi/fetch";

const TodoPage = () => {
  const [todo, setTodo] = useState<any>([]);
  const [addTask, setAddTask] = useState("");

  const getTodos = async () => {
    const todo = await fetchTodos();
    setTodo(todo);
  };

  useEffect(() => {
    getTodos();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!addTask.trim()) return;

    const added = await addTodo(addTask);
    if (added) {
      setTodo([...todo, ...added]);
      setAddTask("");
    }
  };

  return (
    <>
        <Header />
        <section className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-2xl font-bold mb-4 text-center text-gray-800">やることリスト</h3>
            <form onSubmit={handleSubmit} className="flex items-center mb-6">
                <input
                value={addTask}
                onChange={(e) => setAddTask(e.target.value)}
                type="text"
                placeholder="タスクを入力"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                type="submit"
                className="w-full py-2 bg-teal-500 text-white rounded hover:bg-teal-600"
                >
                追加
                </button>
            </form>
        <TodoList todo={todo} onDelete={getTodos} />
        </section>
    </>
  );
};

export default TodoPage;
