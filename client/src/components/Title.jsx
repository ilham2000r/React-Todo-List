import React from "react";
import todoLogo from "../assets/todoLogo.svg";

const Title = () => {
  return (
    <div className="flex items-center mt-7 gap-2">
      <img className="w-12" src={todoLogo} alt="" />
      <h1 className="text-3xl font-semibold text-black">To-Do List</h1>
    </div>
  )
}

export default Title;
