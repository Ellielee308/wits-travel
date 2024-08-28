export default function Login() {
  return (
    <div className="z-0 mx-32 mt-[60px] flex min-h-[90vh] justify-center lg:mx-40">
      <img
        src="https://firebasestorage.googleapis.com/v0/b/witz-ec201.appspot.com/o/9780.svg?alt=media&token=6802e3ce-6b12-41e1-a8f1-fa6301a9093a"
        className="mt-60 h-64 lg:h-80"
      ></img>
      <div className="ml-12 mt-32 h-3/5 w-96 bg-zinc-100 p-8 pb-14 lg:w-[480px]">
        <h1 className="text-2xl">後台登入</h1>
        <div className="my-8 flex-col">
          <div>
            <label className="items-center text-base font-medium">
              電子郵件
            </label>
            <input className="mb-3 mt-1 flex h-10 w-full rounded-md border border-stone-200 bg-white px-3 py-2 text-base placeholder:text-stone-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-stone-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"></input>
          </div>
          <div className="">
            <label className="items-center text-base font-medium">密碼</label>
            <input className="mb-3 mt-1 flex h-10 w-full rounded-md border border-stone-200 bg-white px-3 py-2 text-base placeholder:text-stone-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-stone-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"></input>
          </div>
          <button className="mt-6 w-full rounded-md bg-[#006c98] px-5 py-2 text-white">
            登入
          </button>
          <div className="my-2 flex flex-row justify-center text-center text-gray-600 hover:text-gray-900">
            <p>還沒有帳號嗎?</p>
            <a className="px-3">註冊</a>
          </div>
        </div>
      </div>
    </div>
  );
}
