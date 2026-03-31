import Link from "next/link";

export default function AccessSection() {
  const steps = [
    {
      title: "Check your Library",
      desc: "Log in and navigate to 'Library'. All active purchases are listed here permanently.",
    },
    {
      title: "Select Format",
      desc: "Choose the file format compatible with your device. EPUB is recommended for most users.",
    },
    {
      title: "Transfer or Stream",
      desc: "Download directly or use 'Send to Kindle' for wireless transfer.",
    },
  ];

  return (
    <section className="mx-auto my-5 md:my-10">
      <div className="grid md:grid-cols-2 rounded-2xl overflow-hidden shadow-lg">

        {/* LEFT SIDE */}
        <div className="bg-surface-container-high p-6 md:p-12">
          <h3 className="text-3xl font-bold mb-10">
            Accessing Your Purchase
          </h3>

          <div className="space-y-8">
            {steps.map((step, i) => (
              <div key={i} className="flex items-start gap-4 group">
                
                {/* Step Number */}
                <div className="w-12 min-w-12 h-12 flex items-center justify-center rounded-xl bg-primary text-black font-bold text-lg shadow-md group-hover:scale-105 transition">
                  {i + 1}
                </div>

                {/* Text */}
                <div>
                  <p className="font-semibold text-lg">
                    {step.title}
                  </p>
                  <p className="text-on-surface-variant mt-1 text-base leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="bg-linear-to-br from-primary/20 to-secondary/20 flex items-center justify-center p-6 md:p-8">
          
          <div className="bg-on-tertiary-fixed-variant backdrop-blur-md p-8 rounded-2xl shadow-xl w-full max-w-sm text-center">

            <h4 className="text-xl font-semibold mb-4 text-primary">
              Ready to start reading?
            </h4>

            <p className="text-sm text-on-surface mb-6">
              Access your books instantly and enjoy seamless reading across devices.
            </p>

            <Link href="/browse" className="w-full bg-primary text-black py-3 px-4 rounded-lg font-semibold hover:opacity-90 transition cursor-pointer">
              Start Reading
            </Link>

          </div>

        </div>
      </div>
    </section>
  );
}