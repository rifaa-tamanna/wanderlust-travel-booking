"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Calendar, MapPin, Star } from "lucide-react";

type TravelPackage = {
  _id: string;
  name: string;
  country: string;
  category: string;
  price: string | number;
  duration: string;
  departureDate?: string;
  imageUrl?: string;
  description?: string;
};

const FALLBACK_IMAGE = "/images/Banner.png";

function rating(id: string): string {
  const sum = id
    .split("")
    .reduce((acc, ch) => acc + ch.charCodeAt(0), 0);

  return (4 + (sum % 10) / 10).toFixed(1);
}

type DestinationsGridProps = {
  destinations: TravelPackage[];
};

export function DestinationsGrid({
  destinations,
}: DestinationsGridProps) {
  return (
    <section className="w-full bg-background px-6 py-12">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <h1 className="text-4xl font-light tracking-tight text-foreground md:text-5xl">
          Explore All Destinations
        </h1>

        <p className="mt-3 text-sm text-muted-foreground">
          Find your perfect travel experience from our curated collection
        </p>

        {/* Count */}
        <p className="mt-5 text-sm text-muted-foreground">
          Showing {destinations.length} destinations
        </p>

        {/* Cards */}
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.map((destination) => (
            <article
              key={destination._id}
              className="rounded-sm border border-border bg-white p-3 shadow-sm"
            >
              {/* Image */}
              <div className="relative h-44 w-full overflow-hidden rounded-md">
                <Image
                  src={destination.imageUrl || FALLBACK_IMAGE}
                  alt={destination.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />

                <span className="absolute right-2 top-2 flex items-center gap-1 rounded-md bg-white px-2 py-1 text-xs font-semibold shadow-sm">
                  {rating(destination._id)}
                  <Star className="size-3 fill-black text-black" />
                </span>
              </div>

              {/* Details */}
              <div className="px-1 pb-1 pt-3">
                <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MapPin className="size-4" />
                  {destination.country}
                </p>

                <div className="mt-1 flex items-baseline justify-between gap-2">
                  <h2 className="truncate text-lg font-semibold text-foreground">
                    {destination.name}
                  </h2>

                  <p className="shrink-0 font-semibold text-foreground">
                    ${destination.price}
                    <span className="text-xs font-normal text-muted-foreground">
                      {" "}/Person
                    </span>
                  </p>
                </div>

                <p className="mt-1.5 flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Calendar className="size-4" />
                  {destination.duration}
                </p>

                <Link
                  href={`/destinations/${destination._id}`}
                  className="mt-3 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-[#00A8E8]"
                >
                  Book Now
                  <ArrowUpRight className="size-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
