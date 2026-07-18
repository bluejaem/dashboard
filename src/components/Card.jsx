export default function Card({ title, value, subtext, progress, badge, children }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-surface p-6 shadow-[0_20px_60px_rgba(0,0,0,0.18)]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm uppercase tracking-[0.18em] text-slate-400">{title}</p>
          <p className="mt-3 text-3xl font-semibold text-white">{value}</p>
        </div>
        {badge && <span className="rounded-full bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.14em] text-slate-300">{badge}</span>}
      </div>
      {subtext && <p className="mt-4 text-sm text-slate-300">{subtext}</p>}
      {progress !== undefined && (
        <div className="mt-6">
          <div className="flex items-center justify-between text-xs uppercase tracking-[0.16em] text-slate-400 mb-2">
            <span>Progresso</span>
            <span>{progress}%</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-white/5">
            <div
              className="h-full rounded-full bg-accent transition-all duration-700 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}
      {children}
    </div>
  );
}
