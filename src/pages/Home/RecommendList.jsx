import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { SpotsContext } from "../../components/spotsContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

function RecommendList() {
  const spots = useContext(SpotsContext);
  const sortedSpots = spots.sort((a, b) => b.click_count - a.click_count);

  return (
    <div className="mx-6 my-12 lg:mx-8 xl:mx-auto xl:max-w-[1136px]">
      <h2 className="text-3xl font-semibold tracking-wide">Top 10 熱門</h2>
      <Carousel className="mx-12 lg:mx-8 xl:mx-14 xl:max-w-[1136px]">
        <CarouselContent className="mt-4">
          {sortedSpots.slice(0, 10).map((spot) => (
            <CarouselItem key={spot.id} className="basis-1/2 lg:basis-1/4">
              <Link
                to={`/spot?id=${spot.id}`}
                className="relative mx-1 flex h-full rounded-xl border-[1px]"
              >
                <img
                  src={spot.main_img}
                  className="h-full rounded-xl object-cover md:max-h-64"
                ></img>
                <div className="absolute bottom-0 left-0 h-1/4 w-full rounded-b-xl bg-gradient-to-t from-black to-transparent"></div>
                <p className="absolute bottom-2 mb-2 ml-4 mt-2 text-base text-white md:text-xl">
                  {spot.subtitle}
                </p>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

export default RecommendList;
