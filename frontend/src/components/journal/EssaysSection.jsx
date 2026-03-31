import Image from "next/image";
import Link from "next/link";

const essays = [
  {
    title: "The Ink-Stained Soul: A History of Manual Writing",
    category: "Philosophy",
    date: "Jan 14, 2026",
    author: "Thomas Thorne",
    description:
      "In the digital epoch, the act of putting pen to paper has transformed into a subversive ritual of slow living.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCZe2Rsg7bcsN8CGD3l9rpUHeJHSzI0rBXa21_kjmfHKXXVwGAChPaYZ4l_mzkRpguGuAJkm3_wtdtdPVNU5cVOv7v22WUM8F56CfKvgtQ50e35jcSbjD1zktRJUJkNqOODyJLVyGV5GI658wjHKmLVpdVGN-bm-jJYr9tjtyK3z6VpC8BtnO4i9lBwE5luKnHQNoPA1--INsQ6rvrp4DfYkmWdBXqHGOPugw0VwE_U610EzRizCveg-KQsnkn89oD4mXfjyfVRYfY",
  },
  {
    title: "Coffeehouses and the Birth of the Modern Critic",
    category: "Culture",
    date: "Jan 29, 2026",
    author: "Sarah Jenkins",
    description:
      "How the caffeinated hubs of 18th-century London shaped our collective understanding of literary taste.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDszH3oUprztVh-gGAtUG9MJxzc3UgDXeX0oe2QGXAQOauyQHFXlJN8VnN5nGdzyIqGIJ-O23i53TAfAAN1G3IbpCtTxoPSmmVAuy2KNajXf5b1bgxx2V8OLAzrohxxXEw1L6DaARsTOLsDM9v5OsF5TCSeHN2Dw60SvsDF6Cae24yCOzdvW0aPweqixbAs4YHfr6o8N96-fbykY__ZuezWmV9H7V4FjaheguPQxmm1O6UirA1C_sEOTyCbnpK2ZSA-LQ04gcyvpuk",
  },
  {
    title: "The Rise of Digital Storytelling in 2026",
    category: "Technology",
    date: "March 02, 2026",
    author: "Ava Richardson",
    description:
      "E-books, audiobooks, and AI-driven narratives are redefining how stories are created and consumed globally.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCfnmJWFyyKxO7Ag6TH4G_VqH_Lf59s_-EekuFg540VUpKdAo1n7b7-JTcDSixX8P_c9Kw-OxDpNQJ2ZOEK-TJLe5Vca3tcUU7uXheQO0BM4SVqHLuLtjSRtioGY-hxZFy8MfXmtJKuQ4_RRyjVno6sZ_Rz_mPvxoULWacwkmgpBJoTEdSHnqxUmOipFRVR3UchT469-OJgVAMPDxnmJZlPfUigFrtV8WQ8mG0Ylb7lwxTR-YlXdONOjVseCfM88SwW7H3yWx52Vgs",
  },
];

export default function EssaysSection() {
  return (
    <section>
      <h2 className="text-3xl font-bold mb-10">Literary Essays (2026)</h2>

      <div className="space-y-8 md:space-y-16">
        {essays.map((essay, i) => (
          <Link href="/browse"
            key={i}
            className="flex flex-col md:flex-row gap-8 group border-b border-white/5 pb-10"
          >
            {/* Image */}
            <div className="relative w-full md:w-1/3 h-[250px] md:h-[220px] overflow-hidden rounded-lg">
              <Image
                src={essay.image}
                alt={essay.title}
                fill
                className="object-cover group-hover:scale-105 transition duration-500"
              />
            </div>

            {/* Content */}
            <div className="flex-1">
              {/* Meta */}
              <div className="flex items-center gap-4 text-xs uppercase tracking-widest mb-3">
                <span className="text-primary">{essay.category}</span>
                <span className="text-on-surface-variant">{essay.date}</span>
              </div>

              {/* Title */}
              <h3 className="text-2xl md:text-3xl font-bold mb-3 group-hover:text-primary transition">
                {essay.title}
              </h3>

              {/* Description */}
              <p className="text-on-surface-variant mb-4">
                {essay.description}
              </p>

              {/* Author */}
              <p className="text-sm text-on-surface-variant">
                By {essay.author}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
