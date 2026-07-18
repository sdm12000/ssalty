import { Intro } from "@/components/sections/intro";
import { Declaration } from "@/components/sections/declaration";
import { MyConstitution } from "@/components/sections/my-constitution";
import { Booths } from "@/components/sections/booths";
import { Photozone } from "@/components/sections/photozone";
import { ScaleMoment } from "@/components/sections/scale-moment";
import { Factsheet } from "@/components/sections/factsheet";
import { Footer } from "@/components/layout/footer";

export default function Home() {
  return (
    <main className="relative">
      <Intro />
      <Declaration />
      <MyConstitution />
      <Booths />
      <Photozone />
      <ScaleMoment />
      <Factsheet />
      <Footer />
    </main>
  );
}
