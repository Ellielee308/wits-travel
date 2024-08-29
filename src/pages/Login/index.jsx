import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

export default function Login() {
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth();

  function onSubmit(e) {
    e.preventDefault();
    if (isRegistering) {
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          navigate("/backstage");
        })
        .catch((error) => {
          console.error("註冊錯誤:", error.message);
        });
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          navigate("/backstage");
        })
        .catch((error) => {
          console.error("登入錯誤:", error.message);
          // firebase預設密碼至少為 6 碼
        });
    }
  }

  return (
    <div className="z-0 mx-auto mt-[60px] flex min-h-[80vh] justify-center md:mx-12 lg:mx-40">
      <img
        src="https://firebasestorage.googleapis.com/v0/b/witz-ec201.appspot.com/o/9780.svg?alt=media&token=6802e3ce-6b12-41e1-a8f1-fa6301a9093a"
        className="mt-36 hidden h-52 md:block lg:mt-24 lg:h-72"
      ></img>
      <div className="ml-0 mt-12 h-3/5 w-96 rounded-md bg-slate-100 p-8 pb-14 md:ml-16 lg:ml-24 lg:w-[440px]">
        <h1 className="text-2xl">
          {isRegistering ? "後台註冊帳號" : "後台登入"}
        </h1>
        <form className="my-8 flex-col" onSubmit={onSubmit}>
          <fieldset>
            <label className="items-center text-base font-medium">
              電子信箱
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mb-3 mt-1 flex h-10 w-full rounded-md border border-stone-200 bg-white px-3 py-2 text-base placeholder:text-stone-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-stone-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            ></input>
          </fieldset>
          <fieldset>
            <label
              value={password}
              className="items-center text-base font-medium"
            >
              密碼
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="mb-3 mt-1 flex h-10 w-full rounded-md border border-stone-200 bg-white px-3 py-2 text-base placeholder:text-stone-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-stone-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            ></input>
          </fieldset>
          <button className="active: mt-6 w-full rounded-md bg-[#006c98] px-5 py-2 text-white hover:bg-[#20556a] active:bg-[#20556a]">
            {isRegistering ? "註冊" : "登入"}
          </button>
          <div className="my-2 flex flex-row justify-center text-center text-gray-600 hover:text-gray-900">
            <p className="mr-4">
              {isRegistering ? "已有帳號嗎?" : "還沒有帳號嗎?"}
            </p>
            <p
              className="border-b-2 border-slate-300 px-2 font-semibold tracking-widest text-[#20556a]"
              onClick={() => setIsRegistering(!isRegistering)}
            >
              {isRegistering ? "登入" : "註冊"}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
