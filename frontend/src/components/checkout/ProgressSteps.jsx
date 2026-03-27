"use client";
import { useState, useEffect } from "react";

export default function ProgressSteps() {
  const [step, setStep] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev < 3 ? prev + 1 : prev));
    }, 1200);

    return () => clearInterval(timer);
  }, []);

  const Step = ({ num, label }) => (
    <div className="flex flex-col items-center gap-2">
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-500
        ${
          step >= num
            ? "bg-linear-to-r from-primary to-primary-container text-on-primary scale-110"
            : "border border-on-surface-variant text-on-surface-variant"
        }`}
      >
        {num}
      </div>
      <span
        className={`text-[10px] uppercase tracking-widest ${
          step >= num ? "text-primary" : "text-on-surface-variant"
        }`}
      >
        {label}
      </span>
    </div>
  );

  return (
    <div className="flex items-center justify-between mb-12 px-4">
      <Step num={1} label="Cart" />
      <div className="flex-1 h-[1px] bg-surface-container-highest mx-3"></div>
      <Step num={2} label="Details" />
      <div className="flex-1 h-[1px] bg-surface-container-highest mx-3"></div>
      <Step num={3} label="Finish" />
    </div>
  );
}