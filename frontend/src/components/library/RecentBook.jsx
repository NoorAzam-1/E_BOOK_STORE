import Image from "next/image";

export default function RecentBook() {
  return (
    <div className="group bg-surface-container-lowest p-6 rounded-2xl flex flex-col md:flex-row gap-6 items-center cursor-pointer border border-transparent hover:border-white/10">
      <div className="p-6 bg-cyan-100 rounded-sm group-hover:scale-105 transition duration-300 md:min-w-[43%]">
        <Image
          alt="images"
          src="/images/meditation.webp"
          height={300}
          width={300}
          className="w-40 sm:w-48 h-64 object-cover rounded shadow-xl"
        />
      </div>{" "}
      <div>
        <p className="text-xs text-on-surface-variant">4 Days Ago</p>
        <h3 className="text-xl font-bold mt-1">Meditations</h3>
        <p className="text-sm text-on-surface-variant mb-4">Marcus Aurelius</p>

        <div className="bg-surface-container-highest h-2 rounded-full">
          <div className="bg-primary h-2 w-[32%]" />
        </div>

        <p className="text-xs mt-2">32% Complete</p>
      </div>
    </div>
  );
}
