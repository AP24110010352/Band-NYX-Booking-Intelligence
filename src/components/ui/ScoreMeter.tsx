export function ScoreMeter({ score }: { score: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-14 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-sky-400 to-violet-400"
          style={{ width: `${score}%` }}
        />
      </div>
      <span className="w-6 text-xs text-zinc-300 tabular-nums">{score}</span>
    </div>
  );
}
