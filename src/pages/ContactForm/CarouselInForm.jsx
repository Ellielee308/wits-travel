import { useState, useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { SpotsContext } from "../../components/spotsContext";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const CarouselInForm = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const spots = useContext(SpotsContext);
  const intervalIdRef = useRef(null);
  const intervalTime = 3000;

  useEffect(() => {
    if (spots && spots.length > 0) {
      intervalIdRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % spots.length);
      }, intervalTime);
    }

    return () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
      }
    };
  }, [intervalTime, spots]);

  const isVisible = (index) => {
    const visibleIndices = [
      currentIndex,
      (currentIndex + 1) % spots.length,
      (currentIndex + 2) % spots.length,
    ];
    return visibleIndices.includes(index);
  };

  const handleMouseEnter = () => {
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
    }
  };

  const handleMouseLeave = () => {
    if (spots && spots.length > 0) {
      intervalIdRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % spots.length);
      }, intervalTime);
    }
  };

  return (
    <Carousel
      opts={{
        align: "start",
      }}
      orientation="vertical"
      className="mb-8 mt-8 w-full max-w-xs"
    >
      <CarouselContent className="mt-2 h-[80vh]">
        {spots
          .filter((spot) => !spot.hidden)
          .map((spot, index) => (
            <CarouselItem
              key={index}
              className={`basis-1/3 pt-1 ${isVisible(index) ? "block" : "hidden"} `}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Link to={`/spot?id=${spot.id}`}>
                <div className="group relative p-1">
                  <Card>
                    <CardContent className="relative flex items-center justify-center p-4">
                      <img
                        src={spot.main_img}
                        alt={spot.name}
                        className="max-h-[90%] max-w-[90%] object-contain"
                      />

                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100">
                        <span className="text-center text-white">
                          {spot.title}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </Link>
            </CarouselItem>
          ))}
      </CarouselContent>
    </Carousel>
  );
};

export default CarouselInForm;
