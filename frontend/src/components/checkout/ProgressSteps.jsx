export default function ProgressSteps({ step }) {
  const steps = ["Cart", "Details", "Payment", "Finish"];

  return (
    <div className="flex justify-between mb-10 px-4">
      {steps.map((label, i) => (
        <div key={i} className="flex-1 text-center">
          <div
            className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center text-xs font-bold ${
              step > i
                ? "bg-primary text-on-primary"
                : "border border-outline-variant"
            }`}
          >
            {i + 1}
          </div>

          <p
            className={`text-xs mt-2 ${
              step > i ? "text-primary" : "text-on-surface-variant"
            }`}
          >
            {label}
          </p>
        </div>
      ))}
    </div>
  );
}