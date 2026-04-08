import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { site } from "@/data/site";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="mx-auto w-full">
      <div className="relative flex min-h-[500px] flex-col items-center gap-12 overflow-hidden rounded-xl md:rounded-4xl bg-surface-container-low p-6 lg:flex-row md:p-10 lg:p-16">
        <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-primary/10 blur-[120px]" />

        <div className="z-10 flex-1 space-y-3 md:space-y-6">
          <div className="inline-block rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
              {site.hero.badge}
            </span>
          </div>

          <h1 className="font-headline text-4xl md:text-7xl lg:text-5xl font-extrabold md:leading-0.9 lg:leading-tight xl:leading-12  tracking-wider lg:tracking-wide xl:tracking-widest text-on-surface ">
            {site.hero.title.split(" ").slice(0, 2).join(" ")} <br />
            <span className="text-primary">
              {site.hero.title.split(" ").slice(2).join(" ")}
            </span>
          </h1>

          <p className="max-w-lg text-md sm:text-lg leading-relaxed text-on-surface-variant md:text-xl">
            {site.hero.description}
          </p>

          <div className="flex flex-col gap-4 pt-4 sm:flex-row md:items-center">
            <Link href="/checkout" className="w-full md:w-auto flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-primary to-primary-container px-8 py-4 font-bold text-on-primary shadow-lg shadow-primary/20 transition-all hover:opacity-90 active:scale-95 cursor-pointer">
              Buy Now — ₹{site.hero.price.toFixed(0)}
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>

        <div className="z-10 flex w-full  flex-1 justify-center md:w-auto">
          <div className="group relative lg:scale-135 xl:scale-140">
            <div className="absolute inset-0 rounded-full w-full  lg:w-[80%] bg-primary/20 blur-2xl transition-transform duration-700" />
            <Image
              src={site.hero.image}
              alt="Book Cover"
              width={320}
              height={600}
              priority
              className="h-auto w-64 -rotate-6 rounded-lg shadow-[20px_20px_60px_rgba(0,0,0,0.8)] transition-transform duration-500 group-hover:rotate-0 md:w-80"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
