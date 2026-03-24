import { Star, StarHalf } from "lucide-react";
import Image from "next/image";
import { site } from "@/data/site";

function RatingStars({ rating }) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

  return (
    <div className="flex text-primary">
      {Array.from({ length: fullStars }).map((_, i) => (
        <Star key={`full-${i}`} className="h-4 w-4 fill-current" />
      ))}
      {hasHalf && <StarHalf className="h-4 w-4 fill-current" />}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <Star key={`empty-${i}`} className="h-4 w-4" />
      ))}
    </div>
  );
}
  

export default function HomePage() {
  return (
    <div className="bg-background text-on-surface min-h-screen">
      <main className="pt-24 px-4 md:px-6 max-w-7xl mx-auto">
        {/* HERO SECTION */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
          {/* IMAGE */}
          <div className="lg:col-span-5 flex justify-center">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDHH3a9L_67CW00yTsU9upFuykuN_SFUDe3Gm0ikutegFNmAuVm7U8LD-MSeRH7Tpn5hx6I-nX1CaXcriqQdEf5zwEPtYi9G06EfzJlnwqUXsfTwg6s5sWAGgiwhJwZhhUA1p31sNBlaF8PsxWEbBSnTOgr3NfzEMp3TO4qyXsD8oxNJYBXroO8KIy0n0FfSF_sZ4pcl7aVFei8Y4laqjQYUDSjccNJxmPEg7a9dV-Osqsx3fNMxdHavA9YzX6es7qN3B4h_ipokVI"
              alt="Book"
              width={320}
              height={450}
              className="rounded-lg h-104 w-76 shadow-2xl shadow-primary/20 -rotate-2 hover:rotate-0 hover:scale-105 transition duration-300"
            />
          </div>

          {/* CONTENT */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="px-3 py-1 mr-3 text-xs bg-surface-variant text-primary rounded-full">
                Fantasy
              </span>
              <span className="px-3 py-1 text-xs bg-surface-variant text-primary rounded-full">
                SCI-FI
              </span>

              <h1 className="text-3xl md:text-5xl font-bold mt-4 leading-tight">
                The Midnight <br />
                <span className="text-primary">Stargazer</span>
              </h1>

              <p className="text-on-surface-variant mt-2 italic">
                by Elena Vance
              </p>

              <div className="flex gap-3 justify-start items-center">
                <RatingStars rating={4} />
                <p>4</p>
              </div>
            </div>

            {/* PRICE CARD */}
            <div className="p-6 rounded-xl bg-surface-container-low border border-outline-variant/10">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-2xl md:text-3xl font-bold text-primary">
                  $14.99
                </span>
                <span className="line-through text-on-surface-variant">
                  $24.00
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button className="flex-1 bg-primary text-on-primary py-3 rounded-lg font-semibold hover:opacity-90 cursor-pointer">
                  Buy Now
                </button>

                <button className="flex-1 border border-primary text-primary py-3 rounded-lg hover:bg-primary/10 cursor-pointer">
                  Read Sample
                </button>
              </div>
            </div>

            {/* DETAILS */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
              <div className="flex flex-col gap-2 p-3 bg-surface-container rounded-lg">
                <span className="uppercase font text-(--color-primary-fixed-dim)">Release</span>
                <span>Oct 2023</span>
              </div>
              <div className="flex flex-col gap-2 p-3 bg-surface-container rounded-lg">
                <span className="uppercase font text-(--color-primary-fixed-dim)">page</span>
                <span>412 Pages</span>
              </div>
              <div className="flex flex-col gap-2 p-3 bg-surface-container rounded-lg">
                <span className="uppercase font text-(--color-primary-fixed-dim)">Language</span>
                <span>English</span>
              </div>
              <div className="flex flex-col gap-2 p-3 bg-surface-container rounded-lg">
                <span className="uppercase font text-(--color-primary-fixed-dim)">Format</span>
                <span>HardCover</span>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT + AUTHOR SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {/* ABOUT */}
          <section className="lg:col-span-2 glass-card p-6 md:p-8 rounded-2xl border border-outline-variant/10">
            <h2 className="text-xl md:text-2xl font-bold text-primary mb-4">
              About the Book
            </h2>

            <p className="text-on-surface-variant leading-relaxed mb-4">
              In a world where the stars have stopped moving, Elara finds
              herself drawn to the ancient observatory at the edge of the known
              universe. &quot;The Midnight Stargazer&quot; follows her journey
              through collapsing constellations and forgotten myths to find the
              one who stole the sky&apos;s rhythm.
            </p>

            <p className="text-on-surface-variant leading-relaxed">
              Blending high-concept science fiction with the lyrical prose of
              classic fantasy, Elena Vance delivers a hauntingly beautiful tale
              about memory, cosmic duty, and the light we find in the absolute
              dark. A masterpiece of modern speculative fiction that challenges
              the boundaries of time itself.
            </p>
          </section>

          {/* AUTHOR */}
          <section className="glass-card p-3 md:p-8 rounded-2xl border border-outline-variant/10 flex flex-col items-start  group">
            <h2 className="text-lg md:text-xl font-bold mb-4">
              Author Spotlight
            </h2>
            <div className="flex gap-4">
              <div className="overflow-hidden rounded-xl mb-4">
                <Image
                  src={site.hero.image}
                  alt="Author"
                  width={40}
                  height={60}
                  className="w-30 md:w-20 rounded-xl shadow-xl -rotate-3 group-hover:rotate-0 group-hover:scale-105 transition duration-500"
                />
              </div>
             <div>
               <h4 className="text-lg text-primary font-semibold mt-2">Elena Vance</h4>
              <h4 className="text-sm  italic">Nebula Award Winner</h4>
             </div>
            </div>

            <p className="text-sm text-on-surface-variant mt-2 leading-relaxed">
              Elena Vance is a physicist-turned-novelist known for "The Quantum
              Weaver". She lives in the Scottish Highlands with three cats and a
              telescope.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
