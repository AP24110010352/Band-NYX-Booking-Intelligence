import { Sparkles } from "lucide-react";
import { DEMO_LABEL } from "@/lib/demo-data";

export function DemoNotice({ detail }: { detail?: string }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-violet-300/15 bg-violet-400/8 px-3.5 py-3 text-sm text-violet-100">
      <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-violet-300" aria-hidden />
      <p className="leading-6">
        <span className="font-medium text-white">Demo workspace.</span>{" "}
        {detail ?? DEMO_LABEL}
      </p>
    </div>
  );
}
