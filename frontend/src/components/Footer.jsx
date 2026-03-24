import Link from "next/link";
import { site } from "@/data/site";

export default function Footer() {
  return (
    <footer className="mt-6 md:mt-10  py-4 md:py-8 w-full h-full border-t border-[#1b3656] bg-background">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-4 md:gap-6 px-8 text-center">
        <div className="font-headline text-sm md:text-lg lg:text-xl font-bold tracking-widest text-primary">
          {site.brand}
        </div>

        <div className="flex flex-wrap justify-center gap-4 md:gap-8">
          {site.footerLinks.map((item) => (
            <Link
              key={item.title}
              href={item.link}
              className="text-xs sm:text-sm md:text-md lg:text-lg  leading-relaxed text-on-surface/50 transition-colors hover:text-primary"
            >
              {item.title}
            </Link>
          ))}
        </div>

        <div className="text-xs md:text-sm leading-relaxed text-on-surface/30">
          © 2026 E_BOOk Store
        </div>
      </div>
    </footer>
  );
}
