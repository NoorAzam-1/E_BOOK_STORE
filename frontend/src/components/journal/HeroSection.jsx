import Image from "next/image";

export default function HeroSection() {
  return (
    <section>
      <div className="relative w-full min-h-96 aspect-21/9 rounded-xl overflow-hidden group">
        <Image
          alt="image"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAv7t8W6Dc0Fv4-FkmI06L2qa6GPW6-SCkAWXOqjGjmGmnP7mEwt3XlvdGw4nkAOMMxboPg4CmPLVYGZVefj9FOL32wtDRszCWAFyb3n1y5anhO8cNcMQH7AWJPCD79wkhWj_ZpnJF7Y3zb0h8FmjLslIiZuKfxOzw-Kp5juuQaAV5n_BMvNSSyNqaldUnEYgr9VLR3N1ZhweBpPQCw8ltoyv1izyCxGSyvFfaClH-mpFzKz831sxo9Vkqgc3by2Oo6ZMAP1qBsEow"
          fill
          className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
        />

        <div className="absolute inset-0 bg-linear-to-r from-surface-dim to-transparent" />

        <div className="absolute inset-y-0 left-0 flex flex-col justify-center px-8 md:px-16 max-w-2xl">
          <span className="text-primary text-xs uppercase tracking-widest mb-3">
            E_BOOK_STORE Journal
          </span>

          <h2 className="text-4xl md:text-5xl font-headline font-extrabold mb-6">
            Discover Stories Beyond the Pages
          </h2>

          <p className="italic text-on-surface-variant border-l-2 border-primary/40 pl-4">
            &quot;In 2026, stories are not just read — they are experienced.&quot;
          </p>
        </div>
      </div>
    </section>
  );
}
