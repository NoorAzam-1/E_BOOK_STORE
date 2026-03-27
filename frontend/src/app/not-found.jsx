import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative h-full flex flex-col items-center justify-center  bg-surface text-on-surface font-body">
      <section className="relative z-10 w-full text-center">
        <h1 className="font-headline font-black text-[8rem] md:text-[14rem] leading-none text-gold-gradient tracking-tighter select-none opacity-90">
          404
        </h1>

        <h2 className="font-headline text-3xl md:text-5xl font-bold tracking-tight mt-6">
          An Unfinished Chapter
        </h2>

        <p className="text-on-surface-variant text-lg md:text-xl font-light leading-relaxed mt-4 max-w-2xl mx-auto">
          It seems the scroll you are looking for has been misplaced in our
          great library. The digital ink has faded before the story could be
          told.
        </p>

        <div className="flex justify-center mt-10">
          <Link
            href="/library"
            className="bg-gold-gradient text-primary px-10 py-4 rounded-md font-bold tracking-tight text-base hover:scale-[1.02] active:scale-95 transition-all duration-300 shadow-xl shadow-primary/20 border"
          >
            Return to Library
          </Link>
        </div>
      </section>

      <div className="absolute bottom-2 -left-36 hidden lg:block opacity-20">
        <div className="w-64 h-96 bg-surface-container-high rotate-12 rounded-lg border border-outline-variant/20 shadow-2xl overflow-hidden">
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAOU-rmsx8jz3LG5r95XH9sBlbkiFeTKmb2rpeDAeLg7INqPqTFF6Fr_cr_2hpJVUUUH_2x9Pvb-lll3QtNubg04VLWq4jASUOTMQ9ecW7U4DUcvwnEF4OE1d1aa9LZXHA7fKWta7uDdg_ThZnI6Q5CxY7vRH6IkoOOvyLROSSZ7YEk2tkhF6eK9Mlpv73L0Fwo9ylN58OykRvmzmghwqdXZiXNct0ZuWQocYwdfCUCSnbSah8Lg-8r8WZ75tEMzzUqRp-hKCkardU"
            alt="books"
            fill
            className="w-full h-full object-cover grayscale brightness-50"
          />
        </div>
      </div>

      <div className="absolute -top-15 -right-40 hidden lg:block opacity-20">
        <div className="w-72 h-48 bg-surface-container-high -rotate-6 rounded-lg border border-outline-variant/20 shadow-2xl overflow-hidden">
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDb-UbShx-prEmAV0C6_0EZcKxXyKURq59jzZY_x1yPmPJp-XZwd_8gS9WrIBFz3AybvNq0x0iTpHip6lYFiMTYF0u8lWC5YJNeWOSUZIneJB5EVDJ7OaK2L7DSHbOL9pdXrNiTNVJC2EmYjMUy53RoZ0fUDe4kOnybkzj66zXh45AKyg5RvKxN_aULSj_eIoltV5w4ut1Bsz2AeQHjrKisbhlqJymA5FLkl0B_hGsut3H-sSNEcFsJa8t38qWc02v-xX3YdYFz6CA"
            alt="paper"
            fill
            className="w-full h-full object-cover grayscale contrast-125"
          />
        </div>
      </div>
    </main>
  );
}
