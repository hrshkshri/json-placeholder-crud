"use client";

import { useState } from "react";
import { type Todo } from "@/lib/types";
import { Trash2 } from "lucide-react";

const TodoLists = (props: { todoList: Todo[] }) => {
  const [list, setList] = useState<Todo[]>(props.todoList);

  const handleCheck = (id: number) => {
    const updatedList = list.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setList(updatedList);
  };

  const handleDelete = (id: number) => {
    const updatedList = list.filter((todo) => todo.id !== id);
    setList(updatedList);
  };

  return (
    <div className="flex flex-col gap-8">
      {list.map((todo) => (
        <div
          key={todo.id}
          className={`flex items-center justify-between py-4 px-6 rounded-lg shadow-md border ${
            todo.completed
              ? "bg-amber-100 border-amber-300"
              : "bg-white border-amber-500"
          } transition-all duration-300`}
        >
          <div className="flex items-center gap-4">
            <input
              type="checkbox"
              onClick={() => handleCheck(todo.id)}
              checked={todo.completed}
              className="w-5 h-5 text-amber-600 rounded-lg border-gray-300"
            />
            <h5
              className={`text-xl font-semibold ${
                todo.completed ? "line-through text-gray-500" : "text-gray-900"
              }`}
            >
              {todo.title}
            </h5>
          </div>
          <button
            onClick={() => handleDelete(todo.id)}
            className="text-red-500 hover:text-red-700 transition-all duration-300"
          >
            <Trash2 size={20} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default TodoLists;
