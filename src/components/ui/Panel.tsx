import type { ReactNode } from "react";

type PanelProps = {
  title: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
};

export function Panel({
  title,
  description,
  action,
  children,
  className = "",
}: PanelProps) {
  return (
    <section
      className={`rounded-2xl border border-white/8 bg-[#12121a]/90 p-4 shadow-[0_20px_60px_-40px_rgba(80,40,180,0.45)] sm:p-5 ${className}`}
    >
      <header className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h2 className="text-sm font-medium tracking-tight text-zinc-100">
            {title}
          </h2>
          {description ? (
            <p className="mt-1 max-w-xl text-xs leading-5 text-zinc-500">
              {description}
            </p>
          ) : null}
        </div>
        {action}
      </header>
      {children}
    </section>
  );
}
