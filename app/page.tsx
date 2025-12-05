import Hero from "@/components/landing/hero";
import Navbar from "@/components/layout/navbar";
import CardContainer from "@/components/landing/card";
import CTA from "@/components/landing/cta";
import Footer from "@/components/layout/footer";


export default function Home() {
  return (
    <div className="sm:w-full flex flex-col max-w-[1200px]  m-auto justify-center items-center gap-10">
      <Navbar />
      <Hero />
      <CardContainer />
      <CTA />
      <Footer/>
    </div>
  );
}
