import { useRole } from "../../context/roleContext";
import { getDoc, setDoc, doc, getDocs, collection } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function Account() {
  const role = useRole();
  const [userData, setUserData] = useState({
    email: "",
    name: "",
    role: "",
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState(""); // 用來追蹤對話框類型
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] =
    useState(false);
  const [adminAccounts, setAdminAccounts] = useState([]);
  const [pendingRoleUpdates, setPendingRoleUpdates] = useState({});
  const auth = getAuth();

  useEffect(() => {
    const fetchUserData = async (userId) => {
      const userDocRef = doc(db, "admins", userId);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        setUserData(userDoc.data());
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUserData(user.uid);
      }
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
          setAdminAccounts(accounts);
        }
      };

      fetchAdminAccounts();
    }
  }, [role]);

  const handleNameChange = (e) => {
    setUserData({ ...userData, name: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userDocRef = doc(db, "admins", auth.currentUser.uid);

    // Allow the current user to update their own role
    if (userData.role !== undefined) {
      await setDoc(userDocRef, {
        ...userData,
      });
    }

    setDialogType("self"); // Set dialog type to "self" (save personal data)
    setIsDialogOpen(true);
  };

  const handleRoleChange = (accountId, newRole) => {
    setPendingRoleUpdates((prev) => {
      const updatedRoles = {
        ...prev,
        [accountId]: newRole,
      };
      console.log("Pending role updates:", updatedRoles);
      return updatedRoles;
    });
  };

  const applyPendingRoleUpdates = async () => {
    try {
      console.log("Applying pending role updates:", pendingRoleUpdates);

      const updatePromises = Object.entries(pendingRoleUpdates).map(
        async ([accountId, newRole]) => {
          console.log(`Updating role for ${accountId} to ${newRole}`);
          const userDocRef = doc(db, "admins", accountId);
          await setDoc(userDocRef, { role: newRole }, { merge: true });
        },
      );

      await Promise.all(updatePromises);

      // Re-fetch admin accounts
      const querySnapshot = await getDocs(collection(db, "admins"));
      const updatedAccounts = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setAdminAccounts(updatedAccounts);
      setPendingRoleUpdates({});
      setDialogType("others");
      setIsDialogOpen(true);
      console.log("Roles updated successfully.");
    } catch (error) {
      console.error("Error updating roles: ", error);
    }
  };

  const handleConfirmUpdates = () => {
    setIsConfirmationDialogOpen(true);
  };

  const handleConfirm = () => {
    applyPendingRoleUpdates();
    setIsConfirmationDialogOpen(false);
  };

  const handleCancel = () => {
    setPendingRoleUpdates({});
    setIsConfirmationDialogOpen(false);
  };

  return (
    <div className="flex w-fit flex-wrap p-8 lg:gap-12">
      <form className="ml-4 flex h-fit w-fit flex-col" onSubmit={handleSubmit}>
        <h1 className="mb-6 border-b-2 border-b-slate-400 pb-1 text-xl">
          管理者資訊
        </h1>
        <fieldset className="mb-4 flex items-center">
          <label className="mr-6 font-medium">帳號名稱</label>
          <input
            type="text"
            value={userData.name}
            onChange={handleNameChange}
            className="h-10 rounded-md border border-stone-200 bg-white px-3 py-2 text-base placeholder:text-stone-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-stone-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          ></input>
        </fieldset>
        <fieldset className="mb-4 flex items-center">
          <label className="mr-6 font-medium">電子信箱</label>
          <input
            type="email"
            value={userData.email}
            disabled
            className="h-10 rounded-md border border-stone-200 bg-white px-3 py-2 text-base placeholder:text-stone-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-stone-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          ></input>
        </fieldset>
        <fieldset className="mb-4 flex items-center">
          <div className="">
            <label className="mr-6 font-medium">帳號權限</label>
            {role === 1 && <p className="text-xs text-red-600">無法修改權限</p>}
          </div>
          <select
            value={userData.role}
            onChange={(e) =>
              setUserData({ ...userData, role: parseInt(e.target.value) })
            }
            disabled={role === 1 && auth.currentUser.uid !== userData.id} // Disable if not top-level admin or updating someone else
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
            {adminAccounts
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
                    value={pendingRoleUpdates[account.id] ?? account.role}
                    onChange={(e) =>
                      handleRoleChange(account.id, parseInt(e.target.value))
                    }
                    className="ml-2 h-10 rounded-md border border-stone-200 bg-white px-2 py-2 text-base placeholder:text-stone-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-stone-400 focus-visible:ring-offset-2"
                    disabled={account.role === 0} // Disable if current role is top-level admin
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
            disabled={Object.keys(pendingRoleUpdates).length === 0} // Disable if no role updates are pending
          >
            確認變更
          </button>
          {isConfirmationDialogOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
              <div className="rounded-md bg-white p-4 shadow-lg">
                <p>您確定要應用角色變更嗎？</p>
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={handleConfirm}
                    className="ml-2 rounded-md bg-[#006c98] px-4 py-2 text-white hover:bg-[#20556a] active:bg-[#20556a]"
                  >
                    確認
                  </button>
                  <button
                    onClick={handleCancel}
                    className="ml-2 rounded-md bg-gray-500 px-4 py-2 text-white hover:bg-gray-600 active:bg-gray-700"
                  >
                    取消
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Confirmation Dialog */}
      {isConfirmationDialogOpen && (
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
      {/* Alert Dialog */}
      {isDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
          <div className="w-80 rounded bg-white p-6 shadow-lg">
            <h2 className="text-lg font-semibold">
              {dialogType === "self" ? "個人資料已更新" : "權限已更新"}
            </h2>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setIsDialogOpen(false)}
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
