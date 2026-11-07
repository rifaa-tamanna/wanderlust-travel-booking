"use client";

import { ArrowRight, Check } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

const perks = [
  "Free cancellation up to 7 days",
  "Travel insurance included",
  "24/7 customer support",
];

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

type BookingCardProps = {
  destination: Destination;
};

const BookingCard = ({ destination }: BookingCardProps) => {
  const router = useRouter();

  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleBooking = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const departureDate = formData.get("departureDate") as string;

    const data = {
      username: user?.name,
      email: user?.email,
      image: user?.image,

      destinationId: destination._id,
      name: destination.name,
      country: destination.country,
      category: destination.category,
      price: destination.price,
      duration: destination.duration,
      imageUrl: destination.imageUrl,

      departureDate,
      bookingDate: new Date(),
    };

     // Token Access ( lib er vitor token access function execute kora ache )
     const token = await getTokenFromClient()

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_API_URL}/booking`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data),
    });

    const bookingRes = await res.json();

    if (res.ok) {
      router.push("/my-bookings");
    }

    // console.log("bookingRes", bookingRes);
  };

  return (
    <aside className="h-fit rounded-sm border border-border p-5">
      <p className="text-sm text-muted-foreground">Starting from</p>

      <p className="mt-1 text-3xl font-semibold text-[#00A8E8]">
        ${destination.price}
      </p>

      <p className="mt-1 text-xs text-muted-foreground">per person</p>

      <form onSubmit={handleBooking}>
        <Input
          type="date"
          name="departureDate"
          aria-label="Departure date"
          defaultValue={destination.departureDate}
          className="mt-4"
        />

        <Button
          type="submit"
          className="mt-4 w-full bg-[#00A8E8] text-white hover:bg-[#0095d1]"
        >
          Book Now
          <ArrowRight />
        </Button>
      </form>

      <ul className="mt-5 space-y-3 border-t border-border pt-5">
        {perks.map((perk) => (
          <li
            key={perk}
            className="flex items-center gap-2 text-xs text-muted-foreground"
          >
            <Check className="size-4 shrink-0 text-green-600" />
            {perk}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default BookingCard;
