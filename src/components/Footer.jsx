import Link from "next/link";
import { site } from "@/data/site";

export default function Footer() {
  return (
    <footer className="mt-16 w-full border-t border-[#1b3656] bg-background">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-8 px-8 py-12 text-center">
        <div className="font-headline text-sm font-bold tracking-widest text-primary">
          {site.brand}
        </div>

        <div className="flex flex-wrap justify-center gap-8">
          {site.footerLinks.map((item) => (
            <Link
              key={item}
              href="#"
              className="text-xs leading-relaxed text-on-surface/50 transition-colors hover:text-primary"
            >
              {item}
            </Link>
          ))}
        </div>

        <div className="text-xs leading-relaxed text-on-surface/30">
          © 2026 E_BOOk EDITORIAL CURATORS
        </div>
      </div>
    </footer>
  );
}