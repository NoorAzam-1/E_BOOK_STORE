export default function FAQSections() {
  return (
    <section className="max-w-3xl mx-auto">
      <h3 className="text-center text-3xl font-bold mb-12">
        Logistics & Support
      </h3>

      <div className="space-y-4">
        <details className="bg-surface-container-low p-6 rounded-xl">
          <summary className="cursor-pointer font-bold">
            Are there any shipping costs?
          </summary>
          <p className="mt-3 text-on-surface-variant">
            None. Digital delivery is 100% free, worldwide. There are no import duties, taxes, or handling fees for digital assets.
          </p>
        </details>

        <details className="bg-surface-container-low p-6 rounded-xl">
          <summary className="cursor-pointer font-bold">
            Do links expire?
          </summary>
          <p className="mt-3 text-on-surface-variant">
            No. Your purchased e-books are tied to your account for life. You can download them as many times as you need, on any device you own.
          </p>
        </details>

        <details className="bg-surface-container-low p-6 rounded-xl">
          <summary className="cursor-pointer font-bold">
            What if I didn&apos;t receive my email?
          </summary>
          <p className="mt-3 text-on-surface-variant">
           Please check your spam folder first. If it&apos;s not there, you can always access your files directly via the &apos;Library&apos; section of your profile on our website.
          </p>
        </details>

      </div>

    </section>
  );
}