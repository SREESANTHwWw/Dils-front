import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CarouselPage = () => {
  const slides = [
    { imgSrc: "/banner3.jpg", imgAlt: "" },
    { imgSrc: "/obanner2.jpg", imgAlt: "rewind" },
    {
      imgSrc: "/banner1.jpg",
      imgAlt:
        "Vibrant abstract painting with swirling blue and purple hues on a canvas.",
    },
  ];

  const navigate = useNavigate();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const previousSlide = () => {
    setCurrentSlideIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentSlideIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  const navtoProducts = () => {
    navigate("/products");
  };

  return (
    <div className="relative w-full mt-40 overflow-hidden transition-transform duration-500 ease-in-out  hover:shadow-xl">
      {/* Navigation Buttons */}
      <button
        type="button"
        className="absolute left-5 top-1/2 z-20 flex -translate-y-1/2 items-center justify-center rounded-full bg-white/60 p-2 text-neutral-600 transition hover:bg-white dark:bg-neutral-950/50 dark:text-neutral-300"
        aria-label="previous slide"
        onClick={previousSlide}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          stroke="currentColor"
          fill="none"
          strokeWidth="3"
          className="size-5 md:size-6"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5 8.25 12l7.5-7.5"
          />
        </svg>
      </button>

      <button
        type="button"
        className="absolute right-5 top-1/2 z-20 flex -translate-y-1/2 items-center justify-center rounded-full bg-white/60 p-2 text-neutral-600 transition hover:bg-white dark:bg-neutral-950/50 dark:text-neutral-300"
        aria-label="next slide"
        onClick={nextSlide}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          stroke="currentColor"
          fill="none"
          strokeWidth="3"
          className="size-5 md:size-6"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>

      {/* Slides Container */}
      <div className="relative w-full min-h-[60vh] overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-transform duration-700 ease-in-out ${
              index === currentSlideIndex
                ? "translate-x-0 opacity-100"
                : "translate-x-full opacity-0"
            }`}
          >
            <img
              className="absolute inset-0 h-full w-full object-cover"
              src={slide.imgSrc}
              alt={slide.imgAlt}
            />
          </div>
        ))}
      </div>

      {/* Dots Indicator */}
      <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 gap-2 bg-white/75 px-3 py-2 rounded-full dark:bg-neutral-950/75">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`h-3 w-3 rounded-full transition ${
              currentSlideIndex === index ? "bg-blue-700" : "bg-gray-400"
            }`}
            onClick={() => setCurrentSlideIndex(index)}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Show More Button */}
      <div className="absolute bottom-5 right-5 z-30">
        <button
          onClick={navtoProducts}
          className="w-[140px] h-[40px] rounded-md bg-blue-950 text-white text-sm font-semibold transition-all hover:bg-blue-700 hover:scale-105 hover:shadow-lg"
        >
          Show More
        </button>
      </div>
    </div>
  );
};

export default CarouselPage;
