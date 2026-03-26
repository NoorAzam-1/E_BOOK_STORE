import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="mb-4 md:mb-10">
      <div className="relative overflow-hidden rounded-xl bg-surface-container-low p-6 md:p-16 border border-white/5">
        {/* LEFT CONTENT */}
        <div className="relative z-10 max-w-2xl">
          <span className="text-primary text-sm md:text-md font-bold tracking-[0.3rem] uppercase mb-4 block">
            Frictionless Access
          </span>

          <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Zero Wait. <br />
            <span className="text-primary">Instant Delivery.</span>
          </h2>

          <p className="text-on-surface-variant text-lg mb-8 max-w-xl">
            At E_Book_Store, shipping isn&apos;t measured in days—it&apos;s
            measured in milliseconds. Your next literary journey begins the
            moment you click &apos;Purchase&apos;.
          </p>

          <div className="flex flex-wrap gap-4">
            <button className="flex items-center gap-2 bg-surface-container-high text-primary px-5 py-3 rounded-xl">
              ⚡ Instant Download
            </button>

            <button className="flex items-center gap-2 bg-surface-container-high text-primary px-5 py-3 rounded-xl">
              ☁️ Cloud Sync
            </button>
          </div>
        </div>

        <div className="absolute top-0 right-0 w-1/2 h-full hidden lg:block">
          <div className="absolute inset-0 bg-linear-to-l from-primary/30 to-transparent"></div>
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuATBY9w6foLRUNRgEnQObA1xEkmi3sA_lf-aDvRMOx_wKJ5tBdaIKPPZawOPMUQYZzAWSEMKViedMgGJs-_sQ0in-V8wFb1RWQQiFXWdvOvKCM835K4xBHClb-N2114D3vG1iW5jjg4elNwcvpa2tIj1b3RNM20fiJ-MUtLXoeoolOzoS-vy4yvMQN2a-JK_f9Ip4PO4RpBGQcUfK153S9DSRS5s24DcJsl9cYzOClqb_aWqBOgcO7gJHXRxUIVxYSl6WBLLQWeBU0"
            alt="Book"
            height={400}
            width={600}
            className="w-full h-full object-cover opacity-80 mix-blend-overlay"
          />
        </div>
      </div>
    </section>
  );
}
