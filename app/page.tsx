import { Navbar } from "@/components/common/navbar"
import { HeroSection } from "@/components/home/hero-section"
import { FeatureSection } from "@/components/home/feature-section"
import { SpecsSection } from "@/components/home/specs-section"
import { DesignSection } from "@/components/home/design-section"
import { ExploreSection } from "@/components/home/explore-section"
import { Footer } from "@/components/common/footer"
import { WhyChooseSection } from "@/components/home/why-choose-section"

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <FeatureSection />
      <ExploreSection />
      <SpecsSection />
      <WhyChooseSection/>
      <Footer />
    </div>
  )
}
