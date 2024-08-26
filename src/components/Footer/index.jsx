export default function Footer() {
  return (
    <div className="flex h-[130px] w-full flex-col items-center justify-center border border-black text-lg md:fixed md:bottom-0 lg:md:text-xl">
      <div>李雨潔 姚乃文 林佳璇 吳芷吟 張量</div>
      <div className="flex items-center justify-center space-x-2 text-gray-800">
        <span className="text-lg lg:text-xl">React</span>
        <span className="mx-2 h-3 border border-black"></span>
        <span className="text-lg lg:text-xl">Git</span>
        <span className="mx-2 h-3 border border-black"></span>
        <span className="text-lg lg:text-xl">Tailwind</span>
        <span className="mx-2 h-3 border border-black"></span>
        <span className="text-lg lg:text-xl">Firebase</span>
      </div>
    </div>
  );
}
