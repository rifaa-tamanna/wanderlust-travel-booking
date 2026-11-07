"use client";

import { getTokenFromClient } from "@/lib/getTokenFromClient";
import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  Eye,
  MapPin,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Booking = {
  _id: string;
  destinationId: string;
  name: string;
  country?: string;
  imageUrl: string;
  price: string | number;
  duration?: string;
  departureDate?: string;
  bookingDate?: string;
  status?: string;
};

type MyBookingCardProps = {
  bookingsData: Booking[];
};

const formatDate = (date?: string) => {
  if (!date) return "Date not available";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Date not available";
  }

  return parsedDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const MyBookingCard = ({ bookingsData }: MyBookingCardProps) => {
  const router = useRouter();

  const handleCancleBookings = async (id: string) => {
    
    // Token Access ( lib er vitor token access function execute kora ache )
    const token = await getTokenFromClient();

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_API_URL}/my-bookings/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (res.ok) {
      router.push("/my-bookings");
    }

    // console.log("data", data);
  };

  return (
    <main className="min-h-screen bg-background px-4 py-10 text-foreground sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        {/* Page Heading */}
        <div className="mb-7">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            My Bookings
          </h1>

          <p className="mt-2 text-sm text-muted-foreground sm:text-base">
            Manage and view your upcoming travel plans
          </p>
        </div>

        {/* Booking List */}
        {bookingsData.length > 0 ? (
          <div className="space-y-4">
            {bookingsData.map((booking) => {
              const status = booking.status || "Confirmed";
              const isConfirmed = status.toLowerCase() === "confirmed";

              return (
                <div
                  key={booking._id}
                  className="flex flex-col gap-4 border border-border bg-card p-4 shadow-sm transition-shadow hover:shadow-md sm:flex-row sm:items-center sm:gap-5"
                >
                  {/* Destination Image */}
                  <div className="relative h-52 w-full shrink-0 overflow-hidden sm:h-36 sm:w-[260px]">
                    <Image
                      src={booking.imageUrl}
                      alt={booking.name}
                      fill
                      unoptimized
                      className="object-cover transition-transform duration-300 hover:scale-105"
                      sizes="(max-width: 640px) 100vw, 260px"
                    />
                  </div>

                  {/* Booking Information */}
                  <div className="flex min-w-0 flex-1 flex-col justify-between gap-3">
                    <div>
                      {/* Status */}
                      <div
                        className={`mb-2 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${
                          isConfirmed
                            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                            : "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400"
                        }`}
                      >
                        {isConfirmed ? (
                          <CheckCircle2 size={13} />
                        ) : (
                          <Clock3 size={13} />
                        )}

                        {status}
                      </div>

                      {/* Destination Name */}
                      <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                        {booking.name}
                      </h2>

                      {/* Departure Date */}
                      <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                        <CalendarDays size={15} />
                        <span>
                          Departure: {formatDate(booking.departureDate)}
                        </span>
                      </div>

                      {/* Booking ID */}
                      <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin size={15} />
                        <span>Booking ID: {booking._id}</span>
                      </div>

                      {/* Price */}
                      <p className="mt-2 text-2xl font-semibold text-cyan-600">
                        ${Number(booking.price).toLocaleString("en-US")}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center gap-2 sm:justify-end">
                      <button
                        onClick={() => handleCancleBookings(booking._id)}
                        type="button"
                        title="Connect your booking cancellation API"
                        className="inline-flex items-center justify-center gap-2 border border-red-400 px-4 py-2 text-xs font-medium text-red-500 opacity-80 sm:text-sm"
                      >
                        <Trash2 size={14} />
                        Cancel
                      </button>

                      <Link
                        href={`/destinations/${booking.destinationId}`}
                        className="inline-flex items-center justify-center gap-2 bg-cyan-600 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-cyan-700 sm:text-sm"
                      >
                        <Eye size={15} />
                        View
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="flex min-h-[350px] flex-col items-center justify-center border border-dashed border-border bg-card px-5 text-center">
            <MapPin size={45} className="mb-4 text-muted-foreground" />

            <h2 className="text-xl font-semibold">No Bookings Yet!</h2>

            <p className="mt-2 max-w-sm text-sm text-muted-foreground">
              You haven't booked any destinations yet. Explore amazing places
              and plan your next adventure.
            </p>

            <Link
              href="/destinations"
              className="mt-6 bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Explore Destinations
            </Link>
          </div>
        )}
      </div>
    </main>
  );
};

export default MyBookingCard;
