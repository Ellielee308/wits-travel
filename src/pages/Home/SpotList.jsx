import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import taipei from "./taipei.jpg";

function SpotList() {
  return (
    <div className="mx-6 my-4">
      <Tabs defaultValue="card">
        <TabsList>
          <TabsTrigger value="card">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
              />
            </svg>
          </TabsTrigger>
          <TabsTrigger value="list">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
          </TabsTrigger>
        </TabsList>
      </Tabs>
      {/* <div className="flex items-center">
        <p className="mx-2 text-center">檢視</p>
        <button className="mx-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
            />
          </svg>
        </button>
        <button className="mx-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
          </svg>
        </button>
      </div> */}

      <Tabs defaultValue="card">
        <TabsList>
          <TabsTrigger value="card">依卡片排序</TabsTrigger>
          <TabsTrigger value="list">依列表排序</TabsTrigger>
        </TabsList>
        <TabsContent value="card" className="mt-4">
          <div className="grid grid-cols-2 gap-5 lg:grid-cols-5">
            {Array(6)
              .fill("")
              .map((_, index) => (
                <a href="#" className="relative" key={index}>
                  <div className="h-64 w-full overflow-hidden rounded-xl">
                    <img
                      src={taipei}
                      alt="台北"
                      className="h-full w-full transform object-cover transition-transform duration-500 ease-in-out hover:scale-110"
                    />
                    <div className="absolute bottom-0 left-0 h-1/4 w-full rounded-xl bg-gradient-to-t from-slate-700/80 via-slate-700/40 to-transparent">
                      <h2 className="z-10 ml-4 mt-2 text-2xl text-white">
                        台北
                      </h2>
                    </div>
                  </div>
                </a>
              ))}
          </div>
        </TabsContent>
        <TabsContent value="list" className="mt-4">
          <div className="flex flex-col gap-x-5 gap-y-4 lg:grid lg:grid-cols-2">
            {Array(6)
              .fill("")
              .map((_, index) => (
                <a href="#" className="relative" key={index}>
                  <div className="flex gap-3" key={index}>
                    <img
                      className="size-24 rounded-lg object-cover"
                      src={taipei}
                      alt="Taipei"
                    />
                    <div>
                      <h2 className="text-base">台北</h2>
                      <p className="mt-1 text-sm">
                        北台灣的中心城市，為金融、經濟、政治、科技、教育、文化等領域的發展中心。
                      </p>
                    </div>
                  </div>
                </a>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default SpotList;
