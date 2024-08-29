import { useRole } from "../../context/roleContext";

export default function SpotManage() {
  const role = useRole();

  if (role === 1) {
    return <div className="">你沒有權限~無法編輯此頁面</div>;
  }

  return <div>編輯景點頁面內容</div>;
}
