import { useState } from "react";
import List from "./List";
import AddForm from "./AddForm";

export default function SpotManage() {
  const [showAddForm, setShowAddForm] = useState(false);
  return (
    <div className="ml-48 mt-[60px] bg-white px-7 py-5 outline outline-1 outline-slate-600">
      <div className="flex flex-row items-center justify-between">
        <h1 className="select-none py-6 pl-6 text-2xl font-semibold text-gray-800">
          景點管理
        </h1>
        <button
          className="mb-4 mr-9 h-8 self-end rounded-lg bg-[#006c98] px-4 text-sm text-white transition-all duration-300"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          {showAddForm ? "取消新增" : "新增景點"}
        </button>
      </div>
      {showAddForm ? <AddForm /> : <List />}
    </div>
  );
}
