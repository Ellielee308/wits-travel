import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SpotsContext } from "../../components/spotsContext";
import { useContext } from "react";

function SpotList() {
  const spots = useContext(SpotsContext);

  return (
    <div className="mx-6 my-4 lg:mx-8 xl:mx-auto xl:max-w-[1136px]">
      <Tabs defaultValue="card">
        <div className="flex justify-between">
          <h2 className="text-2xl font-semibold tracking-wide md:text-3xl">
            探索熱門景點
          </h2>
          <TabsList>
            <TabsTrigger value="card">
              <span className="hidden lg:inline">依卡片排序</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 lg:hidden"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
                />
              </svg>
            </TabsTrigger>
            <TabsTrigger value="list">
              <span className="hidden lg:inline">依列表排序</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 lg:hidden"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="card" className="mt-2">
          <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
            {spots.map((spot, index) => (
              <a href="#" className="relative" key={index}>
                <div className="h-64 w-full overflow-hidden rounded-xl">
                  <img
                    src={spot.main_img}
                    alt={spot.subtitle}
                    className="h-full w-full transform object-cover transition-transform duration-500 ease-in-out hover:scale-110"
                  />
                  <div className="absolute bottom-0 left-0 mb-2 w-full rounded-xl bg-gradient-to-t from-slate-700/80 via-slate-700/40 to-transparent md:mb-0 md:h-2/6">
                    <h2 className="z-10 mb-2 ml-4 mt-2 text-2xl text-white">
                      {spot.subtitle}
                    </h2>
                    <div className="ml-4 mr-2 hidden rounded-2xl border-[.8px] border-solid px-3 py-1 text-sm text-[rgba(255,255,255,0.77)] md:inline">
                      {spot.city}
                    </div>
                    <div className="ml-1 mr-2 hidden rounded-2xl border-[.8px] border-solid px-3 py-1 text-sm text-[rgba(255,255,255,0.77)] md:inline">
                      {spot.spot_category}
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="list" className="mt-2">
          <div className="flex flex-col gap-x-5 gap-y-4 md:grid md:grid-cols-2">
            {spots.map((spot, index) => (
              <a href="#" className="relative" key={index}>
                <div className="flex gap-3" key={index}>
                  <img
                    src={spot.main_img}
                    alt={spot.subtitle}
                    className="size-24 rounded-lg object-cover md:size-28"
                  />
                  <div>
                    <h2 className="text-xl">{spot.subtitle}</h2>
                    <p className="mb-2 mt-1 text-base">{spot.brief}</p>

                    <div className="mr-2 hidden rounded bg-[rgba(209,250,229,0.6)] px-3 py-1 text-xs text-[#004B67] lg:inline xl:text-sm">
                      {spot.city}
                    </div>
                    <div className="mr-2 hidden rounded bg-[rgba(209,250,229,0.6)] px-3 py-1 text-xs text-[#004B67] lg:inline xl:text-sm">
                      {spot.spot_category}
                    </div>
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
