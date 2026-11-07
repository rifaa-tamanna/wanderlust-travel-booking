import MyBookingCard from "@/components/booking/MyBookingCard";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";


type Booking = {
  _id: string;
  destinationId: string;
  name: string;
  country?: string;
  imageUrl: string;
  price: number;
  duration?: string;
  departureDate?: string;
  bookingDate?: string;
  status?: string;
};



const MyBookingPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  if (!user?.email) {
    return (
      <div className="min-h-screen bg-background px-5 py-16 text-center text-foreground">
        <h2 className="text-2xl font-semibold">Please Sign In</h2>
        <p className="mt-2 text-muted-foreground">
          Sign in to view your bookings.
        </p>
        <Link
          href="/signin"
          className="mt-5 inline-block rounded-md bg-primary px-6 py-2 text-primary-foreground"
        >
          Sign In
        </Link>
      </div>
    );
  }

  let bookingsData: Booking[] = [];

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API_URL}/my-bookings/${encodeURIComponent(user.email)}`,
      { cache: "no-store" },
    );

    if (!res.ok) {

      throw new Error("Failed to fetch bookings");
    }

    bookingsData = await res.json();
  } catch (error) {
    console.error("Booking fetch error:", error);
  }

  return (
    <MyBookingCard bookingsData={bookingsData}></MyBookingCard>
  );
};

export default MyBookingPage;
