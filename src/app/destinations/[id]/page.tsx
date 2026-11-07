import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import {
  ArrowLeft,
  CalendarDays,
  Check,
  MapPin,
  Star,
} from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import { DestinationActions } from "@/components/destination/destination-actions";
import BookingCard from "@/components/booking/BookingCard";
import { getTokenFromServer } from "@/lib/getTokenFromServer";

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

// The API has no highlights field — reuse the description's sentences.
function toHighlights(description: string) {
  const sentences = description
    .split(/[.!?]+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean);
  return sentences.slice(0, 6);
}

async function loadDestination(id: string) {

 // Access Token   ( lib folder er vitor fucntion execute kora ache )
 const token = await getTokenFromServer() 
 
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_API_URL}/destinations/${id}`, {
      headers: {
        authorization: `Bearer ${token}`
      }
    });
    if (!res.ok) return null;
    return (await res.json()) as Destination;
  } catch {
    return null;
  }
}

async function DestinationDetails({ id }: { id: string }) {
  const destination = await loadDestination(id);
  if (!destination?.name) {
    notFound();
  }

  const description = destination.description || "";
  const highlights = toHighlights(description);

  return (
    <main className="mx-auto max-w-5xl px-4 pb-20 md:px-6">
      {/* Top actions */}
      <div className="mt-8 flex items-center justify-between gap-4">
        <Link
          href="/destinations"
          className="flex items-center gap-2 text-sm text-neutral-600 transition-colors hover:text-[#00a6c0]"
        >
          <ArrowLeft className="size-4" />
          Back to Destinations
        </Link>
        <DestinationActions
          destinationId={destination._id}
          destinationName={destination.name}
        />
      </div>

      {/* Hero image */}
      <div className="relative mt-6 aspect-[8/3] overflow-hidden bg-neutral-100">
        <Image
          src={destination.imageUrl || FALLBACK_IMAGE}
          alt={destination.name}
          fill
          priority
          sizes="(min-width: 1024px) 960px, 100vw"
          className="object-cover"
        />
      </div>

      {/* Details */}
      <div className="mt-8 grid gap-10 border-t border-neutral-200 pt-8 lg:grid-cols-[1fr_320px]">
        {/* Left content */}
        <div>
          <p className="flex items-center gap-1.5 text-sm text-neutral-500">
            <MapPin className="size-4 text-neutral-400" />
            {destination.country}
          </p>
          <h1 className="mt-2 font-display text-4xl font-medium text-neutral-900 md:text-5xl">
            {destination.name}
          </h1>
          <p className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
            <span className="flex items-center gap-1.5">
              <Star className="size-4 fill-emerald-500 text-emerald-500" />
              <span className="font-semibold text-neutral-900">4.9</span>
              <span className="text-neutral-500">(234 reviews)</span>
            </span>
            <span className="flex items-center gap-1.5 font-medium text-neutral-700">
              <CalendarDays className="size-4 text-neutral-400" />
              {destination.duration || "Flexible duration"}
            </span>
          </p>

          <h2 className="mt-8 font-display text-2xl font-medium text-neutral-900">
            Overview
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-neutral-500">
            {description || "No description provided yet."}
          </p>

          {highlights.length > 0 && (
            <>
              <h2 className="mt-8 font-display text-2xl font-medium text-neutral-900">
                Highlights
              </h2>
              <ul className="mt-4 grid gap-x-10 gap-y-3 sm:grid-cols-2">
                {highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex items-start gap-2.5 text-sm text-neutral-600"
                  >
                    <Check className="mt-0.5 size-4 shrink-0 text-emerald-500" />
                    {highlight}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        {/* Booking card */}
        <BookingCard destination={destination} />

      </div>
    </main>
  );
}

function DetailsSkeleton() {
  return (
    <main className="mx-auto max-w-5xl px-4 pb-20 md:px-6">
      <Skeleton className="mt-8 h-10 w-64" />
      <Skeleton className="mt-6 aspect-[8/3] rounded-none" />
      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_320px]">
        <div className="space-y-3">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-4 w-48" />
          <Skeleton className="mt-6 h-6 w-36" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-2/3" />
        </div>
        <Skeleton className="h-96" />
      </div>
    </main>
  );
}

export default function DestinationDetailsPage({
  params,
}: PageProps<"/destinations/[id]">) {
  return (
    <Suspense fallback={<DetailsSkeleton />}>
      <DestinationDetailsWrapper params={params} />
    </Suspense>
  );
}

async function DestinationDetailsWrapper({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <DestinationDetails id={id} />;
}
