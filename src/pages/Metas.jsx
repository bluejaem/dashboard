const goals = [
  { type: 'Diária', desc: 'Resolver 3 exercícios de programação', category: 'Estudo', deadline: 'Hoje', priority: 'Alta', status: 'Em andamento', percent: 80 },
  { type: 'Semanal', desc: 'Finalizar o módulo de React', category: 'Cursos', deadline: 'Sexta', priority: 'Alta', status: 'Planejado', percent: 60 },
  { type: 'Mensal', desc: 'Ler 3 livros técnicos', category: 'Livros', deadline: '30/07', priority: 'Média', status: 'Em andamento', percent: 55 },
  { type: 'Trimestral', desc: 'Concluir certificação AWS', category: 'Certificação', deadline: '30/09', priority: 'Média', status: 'Planejado', percent: 40 },
  { type: 'Anual', desc: 'Alcançar 50 projetos no GitHub', category: 'Projetos', deadline: '31/12', priority: 'Alta', status: 'Em andamento', percent: 36 }
];

export default function Metas() {
  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-white/10 bg-surface p-6 shadow-[0_20px_60px_rgba(0,0,0,0.18)]">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Metas</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">Mapeamento de objetivos</h2>
          </div>
          <p className="text-sm text-slate-300">Curto, médio e longo prazo</p>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {goals.map((goal) => (
            <div key={`${goal.type}-${goal.desc}`} className="rounded-3xl border border-white/10 bg-[#111827] p-5 shadow-[0_14px_30px_rgba(0,0,0,0.18)]">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.18em] text-slate-400">{goal.type}</p>
                  <h3 className="mt-2 text-lg font-semibold text-white">{goal.desc}</h3>
                </div>
                <span className="rounded-full bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.15em] text-slate-300">{goal.priority}</span>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-3 text-sm text-slate-300">
                <div className="rounded-3xl bg-background p-4">Categoria: {goal.category}</div>
                <div className="rounded-3xl bg-background p-4">Prazo: {goal.deadline}</div>
                <div className="rounded-3xl bg-background p-4">Status: {goal.status}</div>
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.16em] text-slate-400 mb-2">
                  <span>Progresso</span>
                  <span>{goal.percent}%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-white/5">
                  <div className="h-full rounded-full bg-accent transition-all duration-700" style={{ width: `${goal.percent}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
