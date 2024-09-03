import { RoleContext } from "../../context/roleContext";
import { getDoc, setDoc, doc, getDocs, collection } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { useReducer, useEffect, useContext } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const initialState = {
  userData: {
    email: "",
    name: "",
    role: "",
  },
  isAlertDialogOpen: false,
  alertDialogContent: "",
  isConfirmationDialogOpen: false,
  otherAdminRoles: [],
  pendingRoleUpdates: {},
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_USER_DATA":
      return { ...state, userData: action.payload };
    case "TOGGLE_ALERT_DIALOG":
      return { ...state, isAlertDialogOpen: action.payload };
    case "SET_ALERT_DIALOG_CONTENT":
      return { ...state, alertDialogContent: action.payload };
    case "TOGGLE_CONFIRMATION_DIALOG":
      return { ...state, isConfirmationDialogOpen: action.payload };
    case "SET_OTHER_ADMIN_ROLES":
      return { ...state, otherAdminRoles: action.payload };
    case "SET_PENDING_ROLE_UPDATES":
      return { ...state, pendingRoleUpdates: action.payload };
    case "RESET_PENDING_ROLE_UPDATES":
      return { ...state, pendingRoleUpdates: {} };
    default:
      return state;
  }
}

function Account() {
  const role = useContext(RoleContext);
  const auth = getAuth();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchUserData = async (userId) => {
      const userDocRef = doc(db, "admins", userId);
      const userDoc = await getDoc(userDocRef);

      dispatch({ type: "SET_USER_DATA", payload: userDoc.data() });
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      fetchUserData(user.uid);
    });

    return () => unsubscribe();
  }, [auth]);

  useEffect(() => {
    if (role !== undefined) {
      const fetchAdminAccounts = async () => {
        if (role === 0) {
          const querySnapshot = await getDocs(collection(db, "admins"));
          const accounts = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          dispatch({ type: "SET_OTHER_ADMIN_ROLES", payload: accounts });
        }
      };

      fetchAdminAccounts();
    }
  }, [role]);

  const handleNameChange = (e) => {
    dispatch({
      type: "SET_USER_DATA",
      payload: { ...state.userData, name: e.target.value },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userDocRef = doc(db, "admins", auth.currentUser.uid);

    // Allow the current user to update their own role
    if (state.userData.role !== undefined) {
      await setDoc(userDocRef, {
        ...state.userData,
      });
    }

    dispatch({ type: "SET_ALERT_DIALOG_CONTENT", payload: "self" });
    dispatch({ type: "TOGGLE_ALERT_DIALOG", payload: true });
  };

  const handleRoleChange = (accountId, newRole) => {
    const updatedRoles = {
      ...state.pendingRoleUpdates,
      [accountId]: newRole,
    };
    dispatch({ type: "SET_PENDING_ROLE_UPDATES", payload: updatedRoles });
  };

  const applyPendingRoleUpdates = async () => {
    try {
      const updatePromises = Object.entries(state.pendingRoleUpdates).map(
        async ([accountId, newRole]) => {
          const userDocRef = doc(db, "admins", accountId);
          await setDoc(userDocRef, { role: newRole }, { merge: true });
        },
      );

      await Promise.all(updatePromises);

      const querySnapshot = await getDocs(collection(db, "admins"));
      const updatedAccounts = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      dispatch({ type: "SET_OTHER_ADMIN_ROLES", payload: updatedAccounts });
      dispatch({ type: "RESET_PENDING_ROLE_UPDATES" });
      dispatch({ type: "SET_ALERT_DIALOG_CONTENT", payload: "others" });
      dispatch({ type: "TOGGLE_ALERT_DIALOG", payload: true });
    } catch (error) {
      console.error("Error updating roles: ", error);
    }
  };

  const handleConfirmUpdates = () => {
    dispatch({ type: "TOGGLE_CONFIRMATION_DIALOG", payload: true });
  };

  const handleConfirm = () => {
    // 檢查是否有不合法的更新
    const invalidUpdates = Object.keys(state.pendingRoleUpdates).filter(
      (id) =>
        state.otherAdminRoles.find((account) => account.id === id).role === 0,
    );

    if (invalidUpdates.length > 0) {
      alert("無法更改最高管理者的權限");
      return;
    }

    applyPendingRoleUpdates();
    dispatch({ type: "TOGGLE_CONFIRMATION_DIALOG", payload: false });
  };

  const handleCancel = () => {
    dispatch({ type: "RESET_PENDING_ROLE_UPDATES" });
    dispatch({ type: "TOGGLE_CONFIRMATION_DIALOG", payload: false });
  };

  const handleAlertDialogConfirm = () => {
    dispatch({ type: "TOGGLE_ALERT_DIALOG", payload: false });
    window.location.reload();
  };

  return (
    <div className="flex w-fit flex-wrap gap-12 p-8">
      <form className="ml-4 flex h-fit w-fit flex-col" onSubmit={handleSubmit}>
        <h1 className="mb-6 border-b-2 border-b-slate-400 pb-1 text-xl">
          管理者資訊
        </h1>
        <fieldset className="mb-4 flex items-center">
          <label className="mr-6 font-medium">帳號名稱</label>
          <input
            type="text"
            value={state.userData.name}
            onChange={handleNameChange}
            className="h-10 rounded-md border border-stone-200 bg-white px-3 py-2 text-base placeholder:text-stone-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-stone-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          ></input>
        </fieldset>
        <fieldset className="mb-4 flex items-center">
          <label className="mr-6 font-medium">電子信箱</label>
          <input
            type="email"
            value={state.userData.email}
            disabled
            className="h-10 rounded-md border border-stone-200 bg-white px-3 py-2 text-base placeholder:text-stone-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-stone-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          ></input>
        </fieldset>
        <fieldset className="mb-4 flex items-center">
          <div>
            <label className="mr-6 font-medium">帳號權限</label>
            {role === 1 && <p className="text-xs text-red-600">無法修改權限</p>}
          </div>
          <select
            value={state.userData.role}
            onChange={(e) => {
              // 如果當前用戶是小編且正在編輯其他人的帳號，則阻止更改
              if (role === 1 && auth.currentUser.uid !== state.userData.id) {
                alert("您無法修改權限");
                return;
              }
              dispatch({
                type: "SET_USER_DATA",
                payload: { ...state.userData, role: parseInt(e.target.value) },
              });
            }}
            disabled={role === 1 && auth.currentUser.uid !== state.userData.id} // Disable if not top-level admin or updating someone else
            className="h-10 w-60 rounded-md border border-stone-200 bg-white px-2 py-2 text-base placeholder:text-stone-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-stone-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value={0}>最高管理者</option>
            <option value={1}>小編</option>
          </select>
        </fieldset>
        <button
          type="submit"
          className="mt-6 w-28 self-center rounded-md bg-[#006c98] px-5 py-2 text-white hover:bg-[#20556a] active:bg-[#20556a]"
        >
          儲存
        </button>
      </form>
      {role === 0 && (
        <div className="ml-4 flex h-fit flex-col">
          <h2 className="border-b-2 border-b-slate-400 pb-1 text-xl">
            其他管理者
          </h2>
          <ul className="mt-4 flex flex-col">
            {state.otherAdminRoles
              .filter((account) => account.id !== auth.currentUser.uid)
              .map((account) => (
                <li
                  key={account.id}
                  className="mb-4 flex items-center justify-between"
                >
                  <p className="mr-2">
                    {account.name} ({account.email})
                  </p>
                  <select
                    value={state.pendingRoleUpdates[account.id] ?? account.role}
                    onChange={(e) =>
                      handleRoleChange(account.id, parseInt(e.target.value))
                    }
                    className="ml-2 h-10 rounded-md border border-stone-200 bg-white px-2 py-2 text-base placeholder:text-stone-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-stone-400 focus-visible:ring-offset-2"
                    disabled={account.role === 0}
                  >
                    <option value={0}>最高管理者</option>
                    <option value={1}>小編</option>
                  </select>
                </li>
              ))}
          </ul>
          <button
            onClick={handleConfirmUpdates}
            className="mt-6 w-28 self-center rounded-md bg-[#006c98] px-5 py-2 text-white hover:bg-[#20556a] active:bg-[#20556a]"
            disabled={Object.keys(state.pendingRoleUpdates).length === 0} // Disable if no role updates are pending
          >
            確認變更
          </button>
        </div>
      )}

      {state.isConfirmationDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
          <div className="w-80 rounded bg-white p-6 shadow-lg">
            <h2 className="text-lg font-semibold">變更權限</h2>
            <p className="mt-2 text-gray-700">確定要變更其他管理者的權限嗎？</p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleCancel}
                className="mr-4 rounded-md bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
              >
                取消
              </button>
              <button
                onClick={handleConfirm}
                className="rounded-md bg-[#006c98] px-4 py-2 text-white hover:bg-[#20556a]"
              >
                確認
              </button>
            </div>
          </div>
        </div>
      )}
      {state.isAlertDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
          <div className="w-80 rounded bg-white p-6 shadow-lg">
            <h2 className="text-lg font-semibold">
              {state.alertDialogContent === "self"
                ? "個人資料已更新"
                : "權限已更新"}
            </h2>
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleAlertDialogConfirm}
                className="rounded-md bg-[#006c98] px-4 py-2 text-white hover:bg-[#20556a]"
              >
                確認
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Account;
