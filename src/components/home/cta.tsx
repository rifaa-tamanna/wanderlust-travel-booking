import Image from "next/image";
import { ArrowRight } from "lucide-react";

export function CTA() {
  return (
    <section className="relative flex min-h-[420px] items-center justify-center overflow-hidden py-20 text-center">
      <Image
        src="/images/CTA.png"
        alt="Aerial view of a plane flying over a tropical island"
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/35" />

      <div className="relative px-6">
        <h2 className="font-display text-4xl font-medium text-white md:text-[44px]">
          Ready To Start Your Journey?
        </h2>
        <p className="mt-4 text-sm text-white/90 md:text-base">
          Join thousands of travelers who have discovered the world with us
        </p>
        <button className="mt-8 inline-flex h-12 items-center gap-3 bg-white px-8 text-xs font-semibold tracking-[0.12em] text-neutral-900 uppercase transition-colors hover:bg-neutral-200">
          Book Your Trip Today
          <ArrowRight className="size-4" strokeWidth={2} />
        </button>
      </div>
    </section>
  );
}
