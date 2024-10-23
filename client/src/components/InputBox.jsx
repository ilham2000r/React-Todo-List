import React, { useState } from "react";
import { toast } from "react-toastify";
import { useTodoStore } from "../store/TodoStore";

const InputBox = () => {
  const { addTodo, loading } = useTodoStore();
  const initialState = {
    task_name: "",
    due_date: "",
    is_checked: false,
  };

  // สร้าง state สำหรับเก็บค่าจาก input
  const [form, setForm] = useState(initialState);

  // ฟังก์ชันสำหรับจัดการเมื่อมีการเปลี่ยนแปลงใน input
  const handleTaskNameChange = (e) => {
    setForm({
      ...form,
      task_name: e.target.value || "", // อัปเดตเฉพาะ task_name
    });
  };

  // ฟังก์ชันจัดการเมื่อมีการเปลี่ยนแปลงค่า due_date
  const handleDateChange = (e) => {
    setForm({
      ...form,
      due_date: e.target.value || "", // อัปเดตเฉพาะ due_date
    });
  };

  // ฟังก์ชันจัดการเมื่อมีการกดปุ่ม submit
  const handleSubmit = async (e) => {
    e.preventDefault(); // ป้องกันการรีเฟรชหน้าเว็บ
    try {
      if (!validateForm()) return;
      const response = await addTodo(form); // ส่งข้อมูลไปยัง API
      console.log("Response:", response); // ดูผลลัพธ์จาก API
      setForm(initialState); // ล้าง input หลังจากส่งข้อมูลสำเร็จ
    } catch (error) {
      console.error("Error:", error); // จัดการข้อผิดพลาดถ้ามี
    }
  };

  const validateForm = () => {
    if (!form.task_name.trim()) {
      toast.error("Task name is required");
      return false;
    }
    if (!form.due_date) {
      toast.error("Due date is required");
      return false;
    }
    // ตรวจสอบว่า due date ไม่เป็นวันในอดีต
    if (new Date(form.due_date) < new Date().setHours(0, 0, 0, 0)) {
      toast.error("Due date cannot be in the past");
      return false;
    }
    return true;
  };

  return (
    <div>
      <div className="flex items-center mt-7 bg-gray-200 rounded-3xl">
        <input
          className="bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder-text-slate-600 text-black"
          type="text"
          value={form.task_name || ""}
          onChange={handleTaskNameChange}
          disabled={loading}
          placeholder="Add your task"
        />

        <button
          onClick={handleSubmit}
          className="border-none rounded-full bg-amber-400 w-32 h-14 text-white text-lg font-medium cursor-pointer hover:scale-110 hover:shadow-lg duration-300"
        >
          ADD +
        </button>
      </div>
      <div className="flex gap-4 mt-4 w-full justify-end">
        <div className="text-gray-500 font-semibold p-2">due date :</div>
        <input
          className="bg-gray-200 px-4 py-2 rounded-xl justify-center  text-slate-600 font-medium"
          value={form.due_date || ""}
          onChange={handleDateChange}
          disabled={loading}
          type="date"
        />
      </div>
    </div>
  );
};

export default InputBox;
