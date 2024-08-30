import { useState } from "react";
import List from "./List";
import AddForm from "./AddForm";

import { useRole } from "../../context/roleContext";

export default function SpotManage() {
  const role = useRole();
  const [showAddForm, setShowAddForm] = useState(false);

  if (role === 1) {
    return <div className="">你沒有權限~無法編輯此頁面</div>;
  }

  return (
    <div className="w-4/5 bg-white px-7 py-5">
      <div className="flex flex-row items-center justify-between bg-white">
        <h1 className="select-none py-6 text-2xl font-semibold text-gray-800">
          {showAddForm ? "新增景點" : "編輯景點"}
        </h1>
        <button
          className="mb-4 h-8 self-end rounded-lg bg-[#006c98] px-4 text-sm text-white transition-all duration-300"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          {showAddForm ? "取消新增" : "新增景點"}
        </button>
      </div>
      {showAddForm ? <AddForm /> : <List />}
    </div>
  );
}
