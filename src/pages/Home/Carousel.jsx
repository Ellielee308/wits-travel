import {
  Carousel as UICarousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "@heroicons/react/solid";

export default function Carousel() {
  return (
    <>
      <div className="relative mx-auto mt-16 w-full">
        <UICarousel>
          <div className="absolute left-1/2 top-4 z-10 flex h-14 w-11/12 -translate-x-1/2 transform items-center rounded-full bg-white px-4 py-2 shadow-lg">
            <SearchIcon className="mr-2 h-5 w-5 text-gray-500" />
            <Input
              className="h-full w-full border-none focus:ring-0"
              type="text"
              placeholder="搜尋景點或地區"
            />
          </div>
          <CarouselContent className="flex">
            <CarouselItem className="w-full flex-shrink-0">
              <img
                src="https://via.placeholder.com/800x400?text=Slide+1"
                alt="Slide 1"
                className="h-96 w-full md:h-64"
              />
              <div className="absolute bottom-16 right-10 text-xl">地區名</div>
              <div className="text-1xl absolute bottom-10 right-10">景點名</div>
            </CarouselItem>
            <CarouselItem className="w-full flex-shrink-0">
              <img
                src="https://via.placeholder.com/800x400?text=Slide+2"
                alt="Slide 2"
                className="h-96 w-full md:h-64"
              />
            </CarouselItem>
            <CarouselItem className="w-full flex-shrink-0">
              <img
                src="https://via.placeholder.com/800x400?text=Slide"
                alt="Slide 3"
                className="h-96 w-full md:h-64"
              />
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 transform rounded-full bg-black p-2 text-white md:hidden" />
          <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 transform rounded-full bg-black p-2 text-white md:hidden" />
        </UICarousel>

        {/* Indicators */}
        <div className="absolute bottom-4 left-1/2 hidden -translate-x-1/2 transform space-x-2 md:flex">
          <span className="h-2 w-2 rounded-full bg-gray-500"></span>
          <span className="h-2 w-2 rounded-full bg-gray-500"></span>
          <span className="h-2 w-2 rounded-full bg-gray-500"></span>
        </div>
      </div>
    </>
  );
}
