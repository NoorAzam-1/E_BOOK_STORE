import Image from "next/image";
import Link from "next/link";

export default function FeaturedSection() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-12 gap-8">

      {/* Main Feature */}
      <div className="md:col-span-8 relative rounded-xl overflow-hidden group min-h-[300px]">
        <Image
          alt="image"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCYlr_Lsq_Ig8_N1z4as8qU-fkhVkzbw2usuvDOOA6gDi4MZ68kT18tQVnEoipdJ9oCVuM0oLT86oXQy_8-Lo4_X2FUo4ZVqQhUQhYkv8hW5ioc5sWT57NP3lLSlM7MmpJInBQr8qNX4jhtQ-B0fXRATshUDG-kHsiSVO3AX3FaO8v7DzQSCLB9Kl6foiFoRvtv_oJv2u-kZErXwf3J_-CDmjiWjsPcrHThWHldw2hAkPtc4aBJ0n67DXtAFOyhgs65mBkZ_L-UqK0"
          fill
          className="object-cover opacity-80 group-hover:scale-105 transition duration-1000"
        />

        <div className="absolute inset-0 bg-linear-to-t from-surface to-transparent" />

        <div className="absolute bottom-0 p-8 md:p-12">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            Author Spotlight 2026
          </h3>
          <p className="text-on-surface-variant mb-6">
            Exclusive conversations with top authors in E_BOOK_STORE.
          </p>
          <Link href="/browse" className="bg-primary text-on-primary px-6 py-3 rounded hover:scale-105 transition">
            Read Feature →
          </Link>
        </div>
      </div>

      {/* Side Cards (🔥 Improved) */}
      <div className="md:col-span-4 flex flex-col gap-6">

        {/* Card 1 */}
        <div className="relative group rounded-xl overflow-hidden h-[200px]">
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCfnmJWFyyKxO7Ag6TH4G_VqH_Lf59s_-EekuFg540VUpKdAo1n7b7-JTcDSixX8P_c9Kw-OxDpNQJ2ZOEK-TJLe5Vca3tcUU7uXheQO0BM4SVqHLuLtjSRtioGY-hxZFy8MfXmtJKuQ4_RRyjVno6sZ_Rz_mPvxoULWacwkmgpBJoTEdSHnqxUmOipFRVR3UchT469-OJgVAMPDxnmJZlPfUigFrtV8WQ8mG0Ylb7lwxTR-YlXdONOjVseCfM88SwW7H3yWx52Vgs"
            alt="Trending"
            fill
            className="object-cover group-hover:scale-105 transition duration-700"
          />

          <div className="absolute inset-0 bg-linear-to-t from-surface to-transparent" />

          <div className="absolute bottom-0 p-6">
            <span className="text-primary text-xs uppercase tracking-widest">
              Weekly Digest
            </span>
            <h4 className="text-lg font-bold mt-2">
              Trends in Digital Reading
            </h4>
            <p className="text-sm text-on-surface-variant">
              What readers love in 2026
            </p>

            <Link href="/browse" className="mt-3 text-primary text-xs flex items-center gap-1 group-hover:translate-x-1 transition">
              Explore →
            </Link>
          </div>
        </div>

        {/* Card 2 */}
        <div className="relative group rounded-xl overflow-hidden h-[200px]">
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCZe2Rsg7bcsN8CGD3l9rpUHeJHSzI0rBXa21_kjmfHKXXVwGAChPaYZ4l_mzkRpguGuAJkm3_wtdtdPVNU5cVOv7v22WUM8F56CfKvgtQ50e35jcSbjD1zktRJUJkNqOODyJLVyGV5GI658wjHKmLVpdVGN-bm-jJYr9tjtyK3z6VpC8BtnO4i9lBwE5luKnHQNoPA1--INsQ6rvrp4DfYkmWdBXqHGOPugw0VwE_U610EzRizCveg-KQsnkn89oD4mXfjyfVRYfY"
            alt="Opinion"
            fill
            className="object-cover group-hover:scale-105 transition duration-700"
          />

          <div className="absolute inset-0 bg-linear-to-t from-surface to-transparent" />

          <div className="absolute bottom-0 p-6">
            <span className="text-primary text-xs uppercase tracking-widest">
              Opinion
            </span>
            <h4 className="text-lg font-bold mt-2">
              Future of E-Books
            </h4>
            <p className="text-sm text-on-surface-variant">
              Are traditional books fading?
            </p>

            <Link href="/browse" className="mt-3 text-primary text-xs flex items-center gap-1 group-hover:translate-x-1 transition">
              Read →
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}