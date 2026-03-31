import Image from "next/image";
import Link from "next/link";

export default function FeaturedBook() {
  return (
    <Link href="/browse" className="group w-full bg-surface-container-low p-6 rounded-2xl flex flex-col md:flex-row gap-6 items-center cursor-pointer border border-transparent hover:border-white/10 ">
      <div className="p-6 bg-gray-200 rounded-sm group-hover:scale-105 transition duration-300 md:min-w-[43%]">
        <Image
        alt="images"
        src="/images/alcheminst.webp"
        height={300}
        width={300}
        className="w-40 sm:w-48 h-64 object-cover rounded shadow-xl"
      />
      </div>

      <div >
        <p className="text-primary text-xs uppercase">Continue Reading</p>
        <h3 className="text-2xl font-bold mt-2">The Alchemist</h3>
        <p className="text-sm text-on-surface-variant mb-4">
          Paulo Coelho • 84%
        </p>

        <div className="bg-surface-container-highest h-2 rounded-full">
          <div className="bg-primary h-2 w-[84%]" />
        </div>

        <p className="text-sm italic mt-4 opacity-70">
          &quot;And, when you want something, all the universe conspires in helping you to achieve...&quot;
        </p>
      </div>
    </Link>
  );
}
