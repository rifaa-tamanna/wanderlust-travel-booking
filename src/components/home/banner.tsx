import Image from "next/image";
import { ArrowRight } from "lucide-react";

const searchFields = [
  { label: "Location", value: "Address, City Or Zip" },
  { label: "Date/Duration", value: "Anytime/3 Days" },
  { label: "Budget", value: "$0 -$3000" },
  { label: "People", value: "5 -10" },
];

export function Banner() {
  return (
    <section className="relative flex min-h-[calc(100svh-52px)] flex-col">
      {/* Background */}
      <Image
        src="/images/Banner.png"
        alt="Coastal destination"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/25" />

      {/* Hero content */}
      <div className="relative flex flex-1 flex-col items-center justify-center px-6 py-20 text-center">
        <h1 className="max-w-4xl text-balance font-display text-5xl leading-[1.05] font-medium text-white md:text-6xl lg:text-[76px]">
          Discover Your Next Adventure
        </h1>
        <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/90 md:text-base">
          Explore breathtaking destinations and create unforgettable memories
          with our curated travel experiences.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <button className="flex h-11 items-center gap-3 bg-[#00a6c0] px-8 text-xs font-semibold tracking-[0.12em] text-white uppercase transition-colors hover:bg-[#0090aa]">
            Explore Now
            <ArrowRight className="size-4" strokeWidth={2} />
          </button>
          <button className="h-11 bg-white/20 px-8 text-xs font-semibold tracking-[0.12em] text-white uppercase backdrop-blur-sm transition-colors hover:bg-white/30">
            View Destination
          </button>
        </div>
      </div>

      {/* Search bar */}
      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-2 gap-1.5 px-3 pb-3 md:grid-cols-5 md:px-4">
        {searchFields.map((field) => (
          <button
            key={field.label}
            className="bg-[#3d3d3d]/35 px-6 py-4 text-left backdrop-blur-[2px] transition-colors hover:bg-[#3d3d3d]/50"
          >
            <p className="text-[15px] font-semibold text-white">
              {field.label}
            </p>
            <p className="mt-0.5 text-xs text-white/75">{field.value}</p>
          </button>
        ))}
        <button className="bg-[#00a6c0] px-6 py-4 text-lg font-semibold text-white transition-colors hover:bg-[#0090aa]">
          Search
        </button>
      </div>
    </section>
  );
}
