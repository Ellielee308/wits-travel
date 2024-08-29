import { useContext, useEffect, useRef } from "react";
import { SpotsContext } from "../../components/spotsContext";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const CarouselInForm = () => {
  const spots = useContext(SpotsContext);
  const intervalIdRef = useRef(null);

  useEffect(() => {
    const startCarousel = () => {
      intervalIdRef.current = setInterval(() => {
        const nextButton = document.querySelector("[aria-label='Next']");
        if (nextButton) {
          nextButton.click();
        }
      }, 3500);
    };

    const stopCarousel = () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
      }
    };

    startCarousel();

    return () => stopCarousel();
  }, []);

  const handleMouseEnter = () => {
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
    }
  };

  const handleMouseLeave = () => {
    const startCarousel = () => {
      intervalIdRef.current = setInterval(() => {
        const nextButton = document.querySelector("[aria-label='Next']");
        if (nextButton) {
          nextButton.click();
        }
      }, 3500);
    };
    startCarousel();
  };

  return (
    <Carousel
      opts={{
        align: "start",
      }}
      orientation="vertical"
      className="mt-8 w-full max-w-xs"
    >
      <CarouselContent className="mt-2 h-[80vh]">
        {spots.map((spot, index) => (
          <CarouselItem
            key={index}
            className="basis-1/3 pt-1"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="group relative p-1">
              <Card>
                <CardContent className="relative flex items-center justify-center p-4">
                  <img
                    src={spot.main_img}
                    alt={spot.name}
                    className="max-h-[90%] max-w-[90%] object-contain"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100">
                    <span className="text-c text-white">{spot.title}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext aria-label="Next" />
    </Carousel>
  );
};

export default CarouselInForm;
