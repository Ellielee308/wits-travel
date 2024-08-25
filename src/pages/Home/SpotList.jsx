import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import taipei from "./taipei.jpg";

function SpotList() {
  return (
    <div className="mx-6 my-4 lg:mx-8 xl:mx-auto xl:max-w-[1136px]">
      <div className="flex justify-between">
        <h2 className="text-3xl font-semibold tracking-wide">探索熱門城市</h2>
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
      </div>

      <Tabs defaultValue="card">
        <div className="flex justify-between">
          <h2 className="text-3xl font-semibold tracking-wide">探索熱門城市</h2>
          <TabsList>
            <TabsTrigger value="card">依卡片排序</TabsTrigger>
            <TabsTrigger value="list">依列表排序</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="card" className="mt-2">
          <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
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
                    <div className="absolute bottom-0 left-0 h-2/6 w-full rounded-xl bg-gradient-to-t from-slate-700/80 via-slate-700/40 to-transparent">
                      <h2 className="z-10 mb-2 ml-4 mt-2 text-2xl text-white">
                        台北
                      </h2>
                      {Array(2)
                        .fill("")
                        .map((_, index) => (
                          <a
                            href="#"
                            key={index}
                            className={`mr-2 hidden rounded-2xl border-[.8px] border-solid px-3 py-1 text-sm text-[rgba(255,255,255,0.77)] md:inline ${
                              index === 0 ? "ml-4" : ""
                            }`}
                          >
                            熱門票券
                          </a>
                        ))}
                    </div>
                  </div>
                </a>
              ))}
          </div>
        </TabsContent>
        <TabsContent value="list" className="mt-2">
          <div className="flex flex-col gap-x-5 gap-y-4 md:grid md:grid-cols-2">
            {Array(6)
              .fill("")
              .map((_, index) => (
                <a href="#" className="relative" key={index}>
                  <div className="flex gap-3" key={index}>
                    <img
                      className="size-24 rounded-lg object-cover md:size-28"
                      src={taipei}
                      alt="Taipei"
                    />
                    <div>
                      <h2 className="text-xl">台北</h2>
                      <p className="mb-4 mt-1 text-base">
                        台灣首都，為金融、政治、科技、文化的發展中心
                      </p>
                      {Array(3)
                        .fill("")
                        .map((_, index) => (
                          <a
                            href="#"
                            key={index}
                            className="mr-2 hidden rounded bg-[rgba(209,250,229,0.6)] px-3 py-1 text-sm text-[#004B67] xl:inline"
                          >
                            {/* 資料庫設計需討論有哪些標籤，目前想到有:最夯景點、交通票券 */}
                            熱門票券
                          </a>
                        ))}
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
