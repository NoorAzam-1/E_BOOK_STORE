"use client";

import { Suspense } from "react";
import ResetPasswordContent from "@/components/ResetPasswordContent";

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordContent />
    </Suspense>
  );
}