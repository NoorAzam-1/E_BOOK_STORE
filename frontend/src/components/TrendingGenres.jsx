import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/data/site";
import Link from "next/link";

export default function TrendingGenres() {
  return (
    <section className="my-8">
      <div className="mx-auto mb-2 flex items-end justify-between px-3">
        <div>
          <h2 className="font-headline text-3xl font-extrabold tracking-tight md:text-4xl">
            Trending Genres
          </h2>
          <p className="mt-2 text-on-surface-variant">Hand-picked categories for your next discovery.</p>
        </div>

        <Link href="/browse" className="flex items-center gap-1 rounded-2xl md:rounded-full border border-primary/10 bg-primary/5 px-2 md:px-4 py-2 text-sm font-bold text-primary transition-all hover:underline cursor-pointer">
          View All <ArrowUpRight size={20} />
        </Link>
      </div>

      <div className="hide-scrollbar mx-auto flex gap-8 overflow-x-auto px-2 py-4">
        {site.genres.map((genre) => (
          <div
            key={genre.name}
            className="group relative w-80 shrink-0 cursor-pointer overflow-hidden rounded-3xl md:rounded-[2.5rem] bg-surfaceContainer  transition-all duration-700 hover:-translate-y-3 md:w-92"
          >
            <Image
              src={genre.image}
              alt={genre.name}
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-linear-to-t from-background via-background/60 to-transparent opacity-90 transition-opacity group-hover:opacity-100" />

            <div className="relative z-10 flex h-full flex-col justify-between p-8">
              <div className="flex items-start justify-between">
                <span className="rounded-full border border-primary/30 bg-primary/20 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-primary backdrop-blur-md">
                  {genre.count}
                </span>
                <div className="translate-x-4 rounded-full bg-white/10 p-2 text-on-surface opacity-0 backdrop-blur-md transition-all group-hover:translate-x-0 group-hover:opacity-100">
                  <ArrowUpRight className="h-5 w-5" />
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="mb-3 font-headline text-4xl font-black tracking-tighter text-on-surface">
                    {genre.name}
                  </h3>

                  <div className="flex flex-wrap gap-2">
                    {genre.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded border border-on-surface/20 px-2 py-0.5 text-[10px] font-bold uppercase text-on-surface/60"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="group/spot rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md transition-all duration-500 hover:bg-white/10">
                  <p className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-primary">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    Bestseller Spotlight
                  </p>

                  <div className="flex items-center gap-4">
                    <Image
                      src={genre?.spotlight?.image}
                      alt={genre.spotlight.title}
                      width={48}
                      height={64}
                      className="h-16 w-12 rounded object-cover shadow-lg transition-transform group-hover/spot:scale-110"
                    />
                    <div className="flex-1">
                      <p className="truncate text-sm font-bold text-on-surface">{genre.spotlight.title}</p>
                      <p className="text-xs text-on-surface-variant">{genre.spotlight.author}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}