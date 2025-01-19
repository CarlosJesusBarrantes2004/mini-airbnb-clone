import { useState, useEffect } from "react";
import { images } from "../data/images";

export const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section
      aria-label="Galería de imágenes"
      className="max-w-2xl mx-auto my-8"
    >
      <div className="relative h-56 sm:h-64 xl:h-80 2xl:h-96 rounded-lg overflow-hidden">
        {images.map((item, index) => (
          <div
            key={item.id}
            className={`absolute w-full h-full transition-opacity duration-700 ease-in-out
              ${index === currentIndex ? "opacity-100" : "opacity-0"}`}
          >
            <img
              src={item.img}
              className="object-cover w-full h-full"
              alt={item.description}
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
              <h3 className="text-2xl font-semibold text-white sm:text-3xl">
                {item.title}
              </h3>
            </div>
          </div>
        ))}

        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 flex space-x-3">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors
                ${index === currentIndex ? "bg-white" : "bg-white/50"}`}
              aria-label={`Ir a imagen ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
