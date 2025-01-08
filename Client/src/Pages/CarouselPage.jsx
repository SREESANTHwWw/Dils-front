import React, { useState } from 'react';

const CarouselPage = () => {
  const slides = [
    {
      imgSrc: '../../assets/brushcutter.png',
      imgAlt: '',
    },
    {
      imgSrc: '../../assets/rewind.jpg',
      imgAlt: 'Vibrant abstract painting with swirling red, yellow, and pink hues on a canvas.',
    },
    {
      imgSrc: '../../assets/images',
      imgAlt: 'Vibrant abstract painting with swirling blue and purple hues on a canvas.',
    },
  ];

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

  return (
    <div className="relative w-full overflow-hidden mt-40 ">
      <button
        type="button"
        className="absolute left-5 top-1/2 z-20 flex rounded-full -translate-y-1/2 items-center justify-center bg-white/40 p-2 text-neutral-600 transition hover:bg-white/60 dark:bg-neutral-950/40 dark:text-neutral-300"
        aria-label="previous slide"
        onClick={previousSlide}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="3" className="size-5 md:size-6 pr-0.5" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
      </button>

      <button
        type="button"
        className="absolute right-5 top-1/2 z-20 flex rounded-full -translate-y-1/2 items-center justify-center bg-white/40 p-2 text-neutral-600 transition hover:bg-white/60 dark:bg-neutral-950/40 dark:text-neutral-300"
        aria-label="next slide"
        onClick={nextSlide}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="3" className="size-5 md:size-6 pl-0.5" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>

      <div className="relative min-h-[50svh] w-full">
        {slides.map((slide, index) => (
          <div key={index} className={`absolute inset-0 transition-opacity duration-1000 ${currentSlideIndex === index ? 'opacity-100' : 'opacity-0'}`}>
            <img className="absolute w-full h-full inset-0 object-cover" src={slide.imgSrc} alt={slide.imgAlt} />
          </div>
        ))}
      </div>

      <div className="absolute rounded-md bottom-3 left-1/2 z-20 flex -translate-x-1/2 gap-4 bg-white/75 px-1.5 py-1 dark:bg-neutral-950/75">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`size-2 cursor-pointer rounded-full transition ${currentSlideIndex === index ? 'bg-neutral-600' : 'bg-neutral-600/50'}`}
            onClick={() => setCurrentSlideIndex(index)}
            aria-label={`slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default CarouselPage;
