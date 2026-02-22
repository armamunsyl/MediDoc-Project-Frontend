import React, { useEffect, useState } from 'react';

const slides = [
  {
    image: '/banner1.png',
    badge: 'Smart Medical Records',
    title: '60% to 80% of  in rural areas deprived of proper medical treatment.',
    
    buttonText: 'Explore Features',
  },
  {
    image: '/banner2.png',
    badge: 'Faster Clinical Workflow',
    title: 'Focus More on Patient Care',
    description:
      'Reduce paperwork, streamline appointments, and keep your team aligned in one place.',
    buttonText: 'Get Started',
  },
  {
    image: '/banner3.png',
    badge: 'Trusted & Secure',
    title: 'Globally 58.4% Newly Graduate Doctor Jobless',
    description:
      'Enterprise-grade protection and intuitive tools to power clinics, doctors, and staff.',
    buttonText: 'View Dashboard',
  },
];

const Banner = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const goPrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1,
    );
  };

  const goNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  return (
    <section className="mx-auto mt-5 w-[96%] max-w-7xl">
      <div className="relative h-[45vh] min-h-[320px] overflow-hidden rounded-2xl md:h-[50vh] lg:h-[60vh]">
        {slides.map((slide, index) => (
          <div
            key={slide.image}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ${
              index === activeIndex ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ backgroundImage: `url(${slide.image})` }}
            aria-hidden={index !== activeIndex}
          >
            <div className="absolute inset-0 bg-black/50" />
            <div className="relative z-10 flex h-full max-w-xl flex-col justify-center gap-5 px-6 text-white sm:px-10 lg:px-14">
              <p className="w-fit rounded-full border border-white/35 bg-black/25 px-4 py-1 text-xs font-medium uppercase tracking-[0.22em] sm:text-sm">
                {slide.badge}
              </p>
              <h2 className="text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
                {slide.title}
              </h2>
              <p className="max-w-lg text-base text-slate-200 sm:text-lg">
                {slide.description}
              </p>
              <div>
                <button
                  type="button"
                  className="rounded-full bg-emerald-400 px-7 py-3 text-base font-bold text-slate-900 transition hover:bg-emerald-300"
                >
                  {slide.buttonText}
                </button>
              </div>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={goPrev}
          className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/30 bg-black/30 px-3 py-2 text-xl text-white transition hover:bg-black/55"
          aria-label="Previous slide"
        >
          ‹
        </button>

        <button
          type="button"
          onClick={goNext}
          className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/30 bg-black/30 px-3 py-2 text-xl text-white transition hover:bg-black/55"
          aria-label="Next slide"
        >
          ›
        </button>

        <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
          {slides.map((slide, index) => (
            <button
              key={`${slide.image}-dot`}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`h-2.5 w-2.5 rounded-full transition ${
                index === activeIndex ? 'bg-emerald-400' : 'bg-white/45'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Banner;
