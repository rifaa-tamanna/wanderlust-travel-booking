"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
  MapPin,
  CalendarDays,
  ArrowUpRight,
  ArrowLeft,
  ArrowRight,
  Star,
} from "lucide-react";

import { Destination } from "@/types/destination";

interface FeaturedCarouselProps {
  destinations: Destination[];
}

const FeaturedCarousel = ({ destinations }: FeaturedCarouselProps) => {
  const carouselRef = useRef<HTMLDivElement>(null);

  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollCarousel = (direction: "prev" | "next") => {
    const container = carouselRef.current;

    if (!container) return;

    const card = container.querySelector<HTMLElement>(
      "[data-destination-card]",
    );

    if (!card) return;

    const gap = 16;
    const scrollAmount = card.offsetWidth + gap;

    container.scrollBy({
      left: direction === "next" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  };

  const handleScroll = () => {
    const container = carouselRef.current;

    if (!container) return;

    const card = container.querySelector<HTMLElement>(
      "[data-destination-card]",
    );

    if (!card) return;

    const scrollAmount = card.offsetWidth + 16;

    const index = Math.round(container.scrollLeft / scrollAmount);

    setCurrentIndex(Math.min(index, destinations.length - 1));
  };

  return (
    <div className="w-full">
      {/* Carousel Cards */}
      <div
        ref={carouselRef}
        onScroll={handleScroll}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-3 scrollbar-hide"
      >
        {destinations.map((destination) => (
          <article
            key={destination._id}
            data-destination-card
            className="w-[88%] shrink-0 snap-start sm:w-[48%] lg:w-[calc(50%-8px)]"
          >
            {/* Image */}
            <div className="group relative h-[220px] overflow-hidden bg-gray-100 sm:h-[260px] lg:h-[285px]">
              <img
                src={destination.imageUrl}
                alt={destination.name}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Rating */}
              <div className="absolute right-3 top-3 flex items-center gap-1 bg-white/90 px-3 py-1.5 text-sm font-semibold text-gray-800 shadow-sm backdrop-blur-sm">
                {destination.rating ?? 4.5}

                <Star size={15} fill="currentColor" className="text-black" />
              </div>
            </div>

            {/* Destination Details */}
            <div className="pt-4">
              {/* Country and Price */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <MapPin size={16} />
                  <span>{destination.country}</span>
                </div>

                <p className="whitespace-nowrap text-xl font-semibold text-[#171717] sm:text-2xl">
                  ${destination.price}
                  <span className="text-xs font-normal text-gray-500">
                    /Person
                  </span>
                </p>
              </div>

              {/* Destination Name */}
              <h3 className="mt-2 text-xl font-medium tracking-tight text-[#171717] sm:text-2xl">
                {destination.name}
              </h3>

              {/* Duration */}
              <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                <CalendarDays size={15} />

                <span>{destination.duration}</span>
              </div>

              {/* Booking Link */}
              <Link
                href={`/destinations/${destination._id}`}
                className="group mt-5 inline-flex items-center gap-2 text-sm font-medium uppercase text-[#20B5D2] underline underline-offset-4 transition-colors hover:text-[#148BA5]"
              >
                Book Now
                <ArrowUpRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </Link>
            </div>
          </article>
        ))}
      </div>

      {/* Carousel Footer */}
      <div className="mt-9 flex items-center gap-6">
        {/* Current Page */}
        <div className="flex shrink-0 items-center gap-1 text-xl font-medium text-[#171717]">
          <span>{currentIndex + 1}</span>

          <span className="text-gray-400">/{destinations.length}</span>
        </div>

        {/* Progress Line */}
        <div className="relative h-px flex-1 bg-gray-200">
          <div
            className="absolute left-0 top-0 h-px bg-[#20B5D2] transition-all duration-300"
            style={{
              width: `${((currentIndex + 1) / destinations.length) * 100}%`,
            }}
          />
        </div>

        {/* Navigation Buttons */}
        <div className="flex shrink-0 items-center gap-3">
          <button
            onClick={() => scrollCarousel("prev")}
            disabled={currentIndex === 0}
            aria-label="Previous destination"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 text-gray-500 transition-all hover:border-[#20B5D2] hover:text-[#20B5D2] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ArrowLeft size={18} />
          </button>

          <button
            onClick={() => scrollCarousel("next")}
            disabled={currentIndex >= destinations.length - 1}
            aria-label="Next destination"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 text-gray-500 transition-all hover:border-[#20B5D2] hover:text-[#20B5D2] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedCarousel;
