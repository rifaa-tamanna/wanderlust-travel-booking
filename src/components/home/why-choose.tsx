import Image from "next/image";

const features = [
  {
    icon: "/images/ShieldCheck.png",
    title: "Safe & Secure",
    description:
      "Your safety is our priority with comprehensive travel insurance and 24/7 support.",
  },
  {
    icon: "/images/MapTrifold.png",
    title: "Expert Guides",
    description:
      "Local experts who bring destinations to life with authentic cultural insights.",
  },
  {
    icon: "/images/Headset.png",
    title: "24/7 Support",
    description:
      "Round-the-clock customer service to assist you wherever your journey takes you.",
  },
];

export function WhyChoose() {
  return (
    <section className="bg-[#e9f9fc] py-14 md:py-20">
      <div className="mx-auto max-w-6xl border border-dashed border-[#00b7d4] p-1">
        <h2 className="pt-7 text-center font-display text-4xl font-medium text-neutral-900 md:text-[44px]">
          Why Choose Wanderlust
        </h2>
        <p className="mt-3 text-center text-sm text-[#5f8ba0]">
          Your trusted partner for exceptional travel experiences
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.title} className="bg-white p-7">
              <Image
                src={feature.icon}
                alt=""
                width={48}
                height={48}
                className="size-9"
              />
              <h3 className="mt-5 font-display text-2xl font-medium text-neutral-900">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-500">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
