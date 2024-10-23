import React, { useEffect } from "react";
import tick from "../assets/tick.svg";
import bin from "../assets/bin.svg";
import veryImportance from "../assets/veryImportance.svg";
import sadBoi from "../assets/sadBoi.svg";
import { useTodoStore } from "../store/TodoStore";
import { toast } from "react-toastify";

const TodoList = () => {
  const { todos, loading, fetchTodos, removeTodo, checked } = useTodoStore();

  // auto list refresh
  useEffect(() => {
    fetchTodos();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // แสดงข้อความโหลดระหว่างที่รอข้อมูล
  }
  // dd/mm/yyyy date formate
  const formatDate = (date) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(date).toLocaleDateString("en-GB", options);
  };

  // warning alert
  const isDueSoon = (dueDate) => {
    const dueTimestamp = new Date(dueDate).getTime(); // แปลง due_date เป็น timestamp
    const now = Date.now(); // วันปัจจุบันในรูปแบบ timestamp
    const threeDaysInMillis = 3 * 24 * 60 * 60 * 1000; // คำนวณ 3 วันเป็น milliseconds
    // ตรวจสอบว่าค่า dueDate จะต้องอยู่ใน 3 วันจากวันปัจจุบัน
    return dueTimestamp - now <= threeDaysInMillis && dueTimestamp - now >= 0; // ค่าต้องเป็นบวกเพื่อไม่ให้เป็นวันในอดีต
  };

  const handleToggleComplete = async (Id, is_checked) => {
    await checked(Id, { is_checked: !is_checked });
  };

  const handleDelete = async (Id) => {
    await removeTodo(Id);
  };

  const critShow = () => {
    toast.warn("Due within 3 day");
  };

  if (loading && todos.length === 0) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  // const finishedTask = [...todos].map (() => )
  const sortedTodos = [...todos].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <div>
      <div className="flex gap-1 justify-end h-full my-2 text-gray-500 font-bold">
        <p> You have {sortedTodos.length} tasks </p>
        <p className="text-emerald-300 ">
          {todos.filter((todo) => todo.is_checked).length} finished{" "}
        </p>
        <p>and</p>
        <p className="text-red-500">
          {" "}
          {sortedTodos.length - todos.filter((todo) => todo.is_checked)}{" "}
          Unfinished
        </p>
      </div>
      <div className="max-h-60 overflow-y-scroll ">
        {sortedTodos.length === 0 ? (
          <div className="flex flex-col items-center justify-center">
            <div className="text-center p-8 text-gray-500">
              No tasks found. Add a new task to get started!
            </div>
            <img className="w-36 " src={sadBoi} alt="" />
          </div>
        ) : (
          sortedTodos.map((todo) => (
            <div key={todo.task_id} className="flex items-center my-3 gap-2">
              <div className="flex flex-1 items-center cursor-pointer">
                <img
                  src={tick}
                  alt="Complete"
                  className={`w-7 cursor-pointer ${
                    todo.is_checked ? "" : "grayscale"
                  }`}
                  onClick={() =>
                    handleToggleComplete(todo.task_id, todo.is_checked)
                  }
                />
                <p
                  className={`text-slate-700 ml-4 text-[17px] font-semibold ${
                    todo.is_checked ? "line-through" : ""
                  }`}
                >
                  {todo.task_name}
                </p>
                {isDueSoon(todo.due_date) && !todo.is_checked && (
                  <img
                  onClick={critShow}
                    src={veryImportance}
                    alt="Importance"
                    className="ml-2 w-7"
                  />
                )}
              </div>
              <div>
                <p
                  className={`font-bold ${
                    isDueSoon(todo.due_date) && !todo.is_checked
                      ? "text-red-500"
                      : "text-slate-500"
                  }`}
                >
                  {formatDate(todo.due_date)}
                </p>
              </div>
              <div className="flex gap-2">
                <img
                  src={bin}
                  alt="Delete"
                  className="w-5 cursor-pointer mr-2 hover:scale-110 transition-transform"
                  onClick={() => handleDelete(todo.task_id)}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TodoList;
