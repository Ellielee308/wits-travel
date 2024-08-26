import {
  Carousel as UICarousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Input } from "@/components/ui/input";

export default function Carousel() {
  return (
    <>
      <div className="relative mx-auto w-full">
        <UICarousel>
          <div className="absolute left-1/2 top-20 z-10 hidden w-full -translate-x-1/2 transform text-center text-2xl lg:block">
            最好的旅遊體驗
          </div>
          <div className="absolute left-1/2 top-4 z-10 flex h-10 w-10/12 -translate-x-1/2 transform items-center rounded-full bg-white px-4 py-2 shadow-lg md:w-[527px] lg:top-32">
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
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
            <Input
              className="focus-visible:ring-stone-0 h-full w-full border-none outline-none focus-visible:ring-0"
              type="text"
              placeholder="搜尋景點或地區"
            />
          </div>
          <CarouselContent className="flex">
            <CarouselItem className="w-full flex-shrink-0">
              <img
                src="https://images.pexels.com/photos/2819082/pexels-photo-2819082.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Slide 1"
                className="lg:h-5/12 h-96 w-full object-cover opacity-50"
              />
              <div className="absolute bottom-12 right-8 text-lg">地區名</div>
              <div className="text-l absolute bottom-6 right-8">景點名</div>
            </CarouselItem>
            <CarouselItem className="w-full flex-shrink-0">
              <img
                src="https://via.placeholder.com/800x400?text=Slide+2"
                alt="Slide 2"
                className="h-96 w-full lg:h-64"
              />
            </CarouselItem>
            <CarouselItem className="w-full flex-shrink-0">
              <img
                src="https://via.placeholder.com/800x400?text=Slide"
                alt="Slide 3"
                className="h-96 w-full lg:h-64"
              />
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious className="absolute left-0 top-1/2 ml-2 -translate-y-1/2 transform rounded-full bg-black p-2 text-white lg:hidden" />
          <CarouselNext className="absolute right-0 top-1/2 mr-2 -translate-y-1/2 transform rounded-full bg-black p-2 text-white lg:hidden" />
        </UICarousel>

        {/* Indicators */}
        <div className="absolute bottom-4 left-1/2 hidden -translate-x-1/2 transform space-x-2 lg:flex">
          <span className="h-2 w-2 rounded-full bg-gray-500"></span>
          <span className="h-2 w-2 rounded-full bg-gray-500"></span>
          <span className="h-2 w-2 rounded-full bg-gray-500"></span>
        </div>
      </div>
    </>
  );
}
