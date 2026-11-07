import { Banner } from "@/components/home/banner";
import { WhyChoose } from "@/components/home/why-choose";
import { Testimonials } from "@/components/home/testimonials";
import { CTA } from "@/components/home/cta";
import FeaturedSection from "@/components/home/featured-section";


export default function Home() {
  return (
    <div>
      <Banner />
      <FeaturedSection />
      <Testimonials />
      <CTA />
    </div>
  );
}
