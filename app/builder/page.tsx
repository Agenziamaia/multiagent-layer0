"use client";

import { useRouter } from "next/navigation";
import BuilderPanel from "@/components/BuilderPanel";
import LivePreview from "@/components/LivePreview";

export default function BuilderPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-secondary rounded-md transition-colors"
              title="Back to Templates"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
            </button>
            <div>
              <h1 className="text-xl font-bold">Website Builder</h1>
              <p className="text-sm text-muted-foreground">
                Drag, drop, and customize your website
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              Use the panel on the left to add components
            </span>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-73px)]">
        <BuilderPanel />
        <LivePreview />
      </div>
    </div>
  );
}
