export default function Footer() {
  return (
    <div className="flex h-[130px] w-full flex-col items-center justify-center bg-[#006c98] text-base text-white md:h-20">
      <div>李雨潔 姚乃文 林佳璇 吳芷吟 張量</div>
      <div className="flex items-center justify-center space-x-2 text-base text-white">
        <span>React</span>
        <span className="mx-2 h-4 border-[0.5px]"></span>
        <span>Git</span>
        <span className="mx-2 h-4 border-[0.5px]"></span>
        <span>Tailwind</span>
        <span className="mx-2 h-4 border-[0.5px]"></span>
        <span>Firebase</span>
        <span className="mx-2 h-4 border-[0.5px]"></span>
        <span>Shadcn</span>
      </div>
    </div>
  );
}
