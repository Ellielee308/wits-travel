import { useState } from "react";

export default function Footer() {
  const [hoveredPerson, setHoveredPerson] = useState(null);

  const persons = [
    { name: "李雨潔", intro: "嗨！我的英文名字叫做 Ellie~" },
    { name: "姚乃文", intro: "我是姚乃文，我做簡報的速度超級快！" },
    { name: "林佳璇", intro: "嗨~我是林佳璇，我中午都會帶便當!" },
    { name: "吳芷吟", intro: "嗨嗨我是吳芷吟，我樂於分享好吃的糖果~" },
    { name: "張量", intro: "我是張量~我喜歡咖波><" },
  ];

  return (
    <div className="relative flex h-[130px] w-full flex-col items-center justify-center bg-[#006c98] text-base text-white md:h-20">
      <div className="flex space-x-4">
        {persons.map((person, index) => (
          <div
            key={index}
            onMouseEnter={() => setHoveredPerson(person.name)}
            onMouseLeave={() => setHoveredPerson(null)}
            className="relative cursor-pointer hover:rounded-md hover:text-gray-300"
          >
            {person.name}
            {hoveredPerson === person.name && (
              <div className="absolute bottom-full left-1/2 w-48 -translate-x-1/2 transform rounded-md bg-black p-2 text-sm text-white">
                {person.intro}
              </div>
            )}
          </div>
        ))}
      </div>
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
