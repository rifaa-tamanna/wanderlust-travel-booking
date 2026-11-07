"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  useCarousel,
} from "@/components/ui/carousel";

const testimonials = [
  {
    quote:
      '"The Bali Trip Was Absolutely Magical! Every Detail Was Perfectly Planned. The Resorts Were Luxurious And The Cultural Experiences Were Unforgettable."',
    name: "Michael Chen",
    location: "Singapore",
    photo: "/images/person1.png",
  },
  {
    quote:
      '"Swiss Alps Adventure Exceeded All Expectations. The Mountain Views Were Breathtaking And Our Guide Was Incredibly Knowledgeable. Highly Recommend!"',
    name: "Sarah Johnson",
    location: "New York, USA",
    photo: "/images/person2.png",
  },
];

// Round arrow buttons styled to match the design, driven by the carousel context.
function TestimonialArrows() {
  const { scrollPrev, scrollNext, canScrollPrev, canScrollNext } =
    useCarousel();

  const arrowClass =
    "flex size-11 items-center justify-center rounded-full border border-neutral-300 text-neutral-500 transition-colors hover:border-[#00a6c0] hover:text-[#00a6c0] disabled:pointer-events-none disabled:opacity-40";

  return (
    <div className="flex items-center gap-3">
      <button
        aria-label="Previous testimonials"
        className={arrowClass}
        disabled={!canScrollPrev}
        onClick={scrollPrev}
      >
        <ArrowLeft className="size-5" strokeWidth={1.5} />
      </button>
      <button
        aria-label="Next testimonials"
        className={arrowClass}
        disabled={!canScrollNext}
        onClick={scrollNext}
      >
        <ArrowRight className="size-5" strokeWidth={1.5} />
      </button>
    </div>
  );
}

export function Testimonials() {
  return (
    <section className="bg-white py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <Carousel opts={{ align: "start", loop: true }}>
          {/* Heading + carousel controls */}
          <div className="flex items-end justify-between gap-6">
            <div>
              <h2 className="font-display text-4xl font-medium text-neutral-900 md:text-[44px]">
                What Travelers Say
              </h2>
              <p className="mt-3 text-sm text-neutral-500">
                Real experiences from our happy travelers
              </p>
            </div>
            <TestimonialArrows />
          </div>

          {/* Cards */}
          <CarouselContent className="mt-10">
            {testimonials.map((testimonial) => (
              <CarouselItem
                key={testimonial.name}
                className="md:basis-1/2"
              >
                <div className="flex h-full border border-neutral-200">
                  <div className="flex flex-1 flex-col p-7">
                    <blockquote className="text-[17px] leading-snug text-neutral-900">
                      {testimonial.quote}
                    </blockquote>
                    <footer className="mt-auto pt-8">
                      <p className="flex items-center gap-2 text-[15px] text-[#00a6c0]">
                        <span className="h-px w-4 bg-[#00a6c0]" />
                        {testimonial.name}
                      </p>
                      <p className="mt-1 text-xs text-neutral-500">
                        {testimonial.location}
                      </p>
                    </footer>
                  </div>
                  <Image
                    src={testimonial.photo}
                    alt={testimonial.name}
                    width={280}
                    height={360}
                    className="w-[44%] shrink-0 self-stretch object-cover"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
