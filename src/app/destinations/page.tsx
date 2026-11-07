import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { connection } from "next/server";
import { ArrowUpRight, CalendarDays, MapPin, Star } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

type Destination = {
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

// Cache Components requires opting into request-time data access

async function getDestinations(): Promise<Destination[]> {
  await connection();
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_API_URL}/destinations`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`API responded with ${res.status}`);
  }
  const data = await res.json();
  return Array.isArray(data) ? (data as Destination[]) : [];
}

function DestinationCard({ destination }: { destination: Destination }) {
  return (
    <article className="group">
      <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100">
        <Image
          src={destination.imageUrl || FALLBACK_IMAGE}
          alt={destination.name}
          fill
          loading="lazy"
          sizes="(min-width: 1024px) 340px, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <Badge className="absolute top-3 right-3 h-7 gap-1.5 rounded-md bg-white/90 px-3 text-sm font-semibold text-neutral-900">
          4.5
          <Star className="size-3.5! fill-neutral-900" />
        </Badge>
      </div>

      <div className="mt-3 space-y-1.5">
        <p className="flex items-center gap-1.5 text-sm text-neutral-500">
          <MapPin className="size-4 text-neutral-400" />
          {destination.country}
        </p>
        <div className="flex items-baseline justify-between gap-3">
          <h2 className="truncate font-display text-xl font-medium text-neutral-900 md:text-2xl">
            {destination.name}
          </h2>
          <p className="shrink-0 whitespace-nowrap text-neutral-900">
            <span className="text-lg font-semibold md:text-xl">
              ${destination.price}
            </span>
            <span className="text-xs text-neutral-500">/Person</span>
          </p>
        </div>
        <p className="flex items-center gap-1.5 text-sm text-neutral-500">
          <CalendarDays className="size-4 text-neutral-400" />
          {destination.duration}
        </p>
        <Link
          href={`/destinations/${destination._id}`}
          className="mt-2 inline-flex items-center gap-2 text-xs font-semibold tracking-[0.1em] text-[#00a6c0] uppercase underline underline-offset-4 transition-colors hover:text-[#0090aa]"
        >
          Book Now
          <ArrowUpRight className="size-4" strokeWidth={2} />
        </Link>
      </div>
    </article>
  );
}

function CardsGrid({ destinations }: { destinations: Destination[] }) {
  return (
    <div className="grid gap-x-7 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
      {destinations.map((destination) => (
        <DestinationCard
          key={destination._id}
          destination={destination}
        />
      ))}
    </div>
  );
}

function LoadingGrid() {
  return (
    <div className="grid gap-x-7 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index}>
          <Skeleton className="aspect-[16/10] rounded-none" />
          <Skeleton className="mt-3 h-4 w-24" />
          <Skeleton className="mt-2 h-6 w-3/4" />
          <Skeleton className="mt-2 h-4 w-32" />
          <Skeleton className="mt-2 h-4 w-20" />
        </div>
      ))}
    </div>
  );
}

async function DestinationsContent() {
  let destinations: Destination[];
  try {
    destinations = await getDestinations();
  } catch {
    return (
      <p className="rounded-lg border border-destructive/30 bg-destructive/5 p-6 text-sm text-destructive">
        Failed to load destinations — make sure the API is running on{" "}
        <code className="font-mono"></code>.
      </p>
    );
  }

  if (destinations.length === 0) {
    return (
      <p className="p-6 text-sm text-neutral-500">
        No destinations yet.{" "}
        <Link
          href="/add-destination"
          className="text-[#00a6c0] underline underline-offset-4"
        >
          Add one
        </Link>
        .
      </p>
    );
  }

  return (
    <CardsGrid destinations={destinations} />
  );
}

export default function AllDestinationsPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-16 md:px-8">
      <header className="mb-10">
        <h1 className="text-4xl font-light tracking-tight text-neutral-900 md:text-5xl">
          Explore All Destinations
        </h1>
        <p className="mt-3 text-sm text-neutral-500">
          Find your perfect travel experience from our curated collection
        </p>
      </header>
      <Suspense fallback={<LoadingGrid />}>
        <DestinationsContent />
      </Suspense>
    </main>
  );
}
