import { Destination } from "@/types/destination";
import FeaturedCarousel from "./FeaturedCarousel";

const FeaturedSection = async () => {
  let destinations: Destination[] = [];

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_API_URL}/featured-destinations`);

    if (!res.ok) {
      throw new Error("Failed to fetch destinations");
    }

    destinations = await res.json();
  } catch (error) {
    console.error("Featured destinations error:", error);
  }

  return (
    <section className="w-full bg-white py-16 md:py-20">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10 lg:px-14">
        {/* Section Header */}
        <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-[#171717] sm:text-4xl md:text-[42px]">
              Featured Destinations
            </h2>

            <p className="mt-2 text-sm text-gray-500 md:text-base">
              Handpicked travel experiences for the adventure seekers
            </p>
          </div>

          <a
            href="/destinations"
            className="group flex w-fit items-center gap-4 border border-[#20B5D2] px-5 py-3 text-xs font-medium uppercase tracking-wide text-[#20B5D2] transition-all duration-300 hover:bg-[#20B5D2] hover:text-white"
          >
            All Destinations
            <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
        </div>

        {/* Featured Carousel */}
        {destinations.length > 0 ? (
          <FeaturedCarousel destinations={destinations} />
        ) : (
          <div className="flex min-h-52 items-center justify-center text-gray-500">
            No featured destinations available.
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedSection;
