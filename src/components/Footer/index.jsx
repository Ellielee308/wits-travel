export default function Footer() {
  return (
    <div className="flex h-[130px] w-full flex-col items-center justify-center border border-black lg:fixed lg:bottom-0">
      <div>李雨潔 姚乃文 張量 林佳璇 吳芷吟</div>
      <div className="flex items-center justify-center space-x-2 text-gray-800">
        <span>React</span>
        <span className="mx-2 h-3 border border-black"></span>
        <span>Git</span>
        <span className="mx-2 h-3 border border-black"></span>
        <span>Tailwind</span>
        <span className="mx-2 h-3 border border-black"></span>
        <span>Firebase</span>
      </div>
    </div>
  );
}
