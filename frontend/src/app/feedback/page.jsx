"use client";

import FeedbackForm from "@/components/feedback/FeedbackForm";
import FeedbackList from "@/components/feedback/FeedbackList";

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-center mb-6">
        Feedback System
      </h1>
       <FeedbackForm/>
      {/* <FeedbackList /> */}
    </div>
  );
}