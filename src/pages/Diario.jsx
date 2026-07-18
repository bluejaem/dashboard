const entries = [
  { date: '16/07/2026', mood: 'Focado', energy: '8/10', sleep: '7h', learned: 'Hooks avançados', hard: 'Conceitos de memoização', improve: 'Organizar revisões', next: 'Criar mapa mental' },
  { date: '15/07/2026', mood: 'Bem', energy: '7/10', sleep: '6h', learned: 'Clean code', hard: 'Disciplina de estudos', improve: 'Diminuir distrações', next: 'Revisar notas' }
];

export default function Diario() {
  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-white/10 bg-surface p-6 shadow-[0_20px_60px_rgba(0,0,0,0.18)]">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Diário</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">Reflexões e aprendizado</h2>
          </div>
          <p className="text-sm text-slate-300">Registro de evolução pessoal</p>
        </div>

        <div className="mt-6 grid gap-4">
          {entries.map((entry) => (
            <div key={entry.date} className="rounded-3xl border border-white/10 bg-[#111827] p-5 shadow-[0_14px_30px_rgba(0,0,0,0.18)]">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="text-xl font-semibold text-white">{entry.date}</h3>
                  <p className="text-sm text-slate-400">Humor: {entry.mood} • Energia: {entry.energy} • Sono: {entry.sleep}</p>
                </div>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-3xl bg-background p-4 text-sm text-slate-300">
                  <p className="font-semibold text-white">O que aprendi</p>
                  <p className="mt-2">{entry.learned}</p>
                </div>
                <div className="rounded-3xl bg-background p-4 text-sm text-slate-300">
                  <p className="font-semibold text-white">O que foi difícil</p>
                  <p className="mt-2">{entry.hard}</p>
                </div>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-3xl bg-background p-4 text-sm text-slate-300">
                  <p className="font-semibold text-white">O que preciso melhorar</p>
                  <p className="mt-2">{entry.improve}</p>
                </div>
                <div className="rounded-3xl bg-background p-4 text-sm text-slate-300">
                  <p className="font-semibold text-white">Próximo passo</p>
                  <p className="mt-2">{entry.next}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
