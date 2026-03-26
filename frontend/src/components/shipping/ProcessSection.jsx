import {
  Smartphone,
  Tablet,
  Monitor,
  RefreshCcw,
} from "lucide-react";

export default function ProcessSection() {
  const data = [
    {
      title: "iOS & Android",
      desc: "Seamless reading via our mobile app or native readers.",
      icon: <Smartphone size={28} />,
    },
    {
      title: "E-Readers",
      desc: "Optimized for Kindle, Kobo, and Nook displays.",
      icon: <Tablet size={28} />,
    },
    {
      title: "Desktop",
      desc: "Read in-browser or download for offline viewing.",
      icon: <Monitor size={28} />,
    },
    {
      title: "Cross-Sync",
      desc: "Pick up exactly where you left off on any device.",
      icon: <RefreshCcw size={28} />,
    },
  ];

  return (
    <section className="w-full mx-auto my-10">

      {/* TOP GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">

        {/* Main Card */}
        <div className="md:col-span-2 bg-surface-container p-8 rounded-2xl shadow-md">
          <h3 className="text-2xl font-bold mb-4 text-on-secondary-container">
            Immediate Confirmation
          </h3>

          <p className="text-on-surface-variant">
            Within seconds of checkout, you&apos;ll receive a secure link in your inbox. No physical parcels, no transit delays, just your library growing instantly.
          </p>

          <div className="mt-8 border-t pt-4 flex justify-between items-center">
            <span className="text-primary text-xs uppercase tracking-wide">
              Average Delivery Time
            </span>
            <span className="font-bold text-lg">2.4 Seconds</span>
          </div>
        </div>

        {/* Formats */}
        <div className="bg-surface-variant p-6 md:p-8 rounded-2xl shadow-md">
          <h3 className="text-xl font-bold mb-4">
            Universal Formats
          </h3>

          <ul className="space-y-3 text-on-surface-variant">
            <li>EPUB (Reflowable)</li>
            <li>PDF (Fixed Layout)</li>
            <li>MOBI (Legacy)</li>
            <li>AZW3 (Amazon)</li>
          </ul>
        </div>
      </div>

      {/* DEVICES GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ">
        {data.map((item, i) => (
          <div
            key={i}
            className="bg-surface-container-low p-6 rounded-2xl shadow-sm hover:shadow-md transition hover:scale-105"
          >
            {/* ICON */}
            <div className="mb-4 text-primary">
              {item.icon}
            </div>

            {/* TITLE */}
            <h4 className="font-semibold text-lg mb-1">
              {item.title}
            </h4>

            {/* DESC */}
            <p className="text-sm text-on-surface-variant leading-relaxed">
              {item.desc}
            </p>
          </div>
        ))}
      </div>

    </section>
  );
}