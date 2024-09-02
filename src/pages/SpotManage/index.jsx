import { useState } from "react";
import List from "./List";
import AddForm from "./AddForm";
import EditForm from "./EditForm";

import { useRole } from "../../context/roleContext";

export default function SpotManage() {
  const role = useRole();
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState({});
  const [detailsVisibility, setDetailsVisibility] = useState({}); //管理顯示景點細節狀態

  function handleCloseAllDetails() {
    setDetailsVisibility({});
  }

  const areAllDetailsHidden = Object.values(detailsVisibility).every(
    (isVisible) => !isVisible,
  );

  if (role === 1) {
    return (
      <div className="w-4/5 bg-white px-7 py-5">
        <div className="flex h-full w-full items-center justify-center bg-gray-200 text-center">
          管理者沒有權限
          <br />
          無法編輯此頁面
        </div>
      </div>
    );
  }

  return (
    <div className="w-4/5 bg-white px-7 py-5">
      <div className="flex flex-row items-center justify-between bg-white">
        <h1 className="mr-auto select-none py-6 text-2xl font-semibold text-gray-800">
          {showAddForm ? "新增景點" : showEditForm.id ? "編輯景點" : "景點管理"}
        </h1>
        {showAddForm || showEditForm.id ? null : (
          <button
            className={`mb-4 mr-4 h-8 self-end rounded-lg ${areAllDetailsHidden ? "bg-gray-300" : "bg-green-800"} duration-400 px-4 text-sm text-white transition-all`}
            onClick={() => handleCloseAllDetails()}
            disabled={areAllDetailsHidden}
          >
            全部收起
          </button>
        )}

        {showEditForm.id ? (
          <button
            className="mb-4 h-8 self-end rounded-lg bg-[#006c98] px-4 text-sm text-white transition-all duration-300"
            onClick={() => setShowEditForm({})}
          >
            取消編輯
          </button>
        ) : (
          <button
            className="mb-4 h-8 self-end rounded-lg bg-[#006c98] px-4 text-sm text-white transition-all duration-300"
            onClick={() => setShowAddForm(!showAddForm)}
          >
            {showAddForm ? "取消新增" : "新增景點"}
          </button>
        )}
      </div>
      {showAddForm ? (
        <AddForm />
      ) : showEditForm.id ? (
        <EditForm showEditForm={showEditForm} />
      ) : (
        <List
          detailsVisibility={detailsVisibility}
          setDetailsVisibility={setDetailsVisibility}
          setShowEditForm={setShowEditForm}
        />
      )}
    </div>
  );
}
