import { useState } from "react";
import List from "./List";
import AddForm from "./AddForm";

export default function SpotManage() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [detailsVisibility, setDetailsVisibility] = useState({}); //管理顯示景點細節狀態

  function handleCloseAll() {
    setDetailsVisibility({});
  }

  const areAllDetailsHidden = Object.values(detailsVisibility).every(
    (isVisible) => !isVisible,
  );

  return (
    <div className="w-4/5 bg-white px-7 py-5">
      <div className="flex flex-row items-center justify-between bg-white">
        <h1 className="mr-auto select-none py-6 text-2xl font-semibold text-gray-800">
          {showAddForm ? "新增景點" : "編輯景點"}
        </h1>
        {showAddForm ? null : (
          <button
            className={`mb-4 mr-4 h-8 self-end rounded-lg ${areAllDetailsHidden ? "bg-gray-300" : "bg-green-800"} duration-400 px-4 text-sm text-white transition-all`}
            onClick={() => handleCloseAll()}
            disabled={areAllDetailsHidden}
          >
            全部收起
          </button>
        )}

        <button
          className="mb-4 h-8 self-end rounded-lg bg-[#006c98] px-4 text-sm text-white transition-all duration-300"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          {showAddForm ? "取消新增" : "新增景點"}
        </button>
      </div>
      {showAddForm ? (
        <AddForm />
      ) : (
        <List
          detailsVisibility={detailsVisibility}
          setDetailsVisibility={setDetailsVisibility}
        />
      )}
    </div>
  );
}
