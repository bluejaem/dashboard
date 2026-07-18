const repositories = [
  { project: 'Portfolio', description: 'Site pessoal focado em projetos e carreira', tech: 'React, Tailwind, Vite', difficulty: 'Média', hours: '14h', status: 'Em produção', github: 'https://github.com/exemplo/portfolio', demo: 'https://portfolio.example.com', date: '12/04', insight: 'Componentização e deploy rápido' },
  { project: 'Task Manager', description: 'Aplicativo de tarefas para produtividade', tech: 'React, Node.js, MongoDB', difficulty: 'Alta', hours: '28h', status: 'Em revisão', github: 'https://github.com/exemplo/task-manager', demo: 'https://task.example.com', date: '20/03', insight: 'Integração de API e UX' },
  { project: 'Estudos TI', description: 'Dashboard com métricas e rotinas', tech: 'React, Chart.js, Tailwind', difficulty: 'Média', hours: '21h', status: 'Concluído', github: 'https://github.com/exemplo/estudos-ti', demo: 'https://dashboard.example.com', date: '05/04', insight: 'Visualização de dados e layouts' }
];

export default function GitHub() {
  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-white/10 bg-surface p-6 shadow-[0_20px_60px_rgba(0,0,0,0.18)]">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.18em] text-slate-400">GitHub</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">Meta de 50 projetos</h2>
          </div>
          <p className="text-sm text-slate-300">Projetos técnicos e POCs</p>
        </div>

        <div className="mt-6 grid gap-4">
          {repositories.map((item) => (
            <div key={item.project} className="rounded-3xl border border-white/10 bg-[#111827] p-5 shadow-[0_14px_30px_rgba(0,0,0,0.18)]">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-white">{item.project}</h3>
                  <p className="text-sm text-slate-400">{item.description}</p>
                </div>
                <span className="rounded-full bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.15em] text-slate-300">{item.status}</span>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-3xl bg-background p-4 text-sm text-slate-300">
                  <p>Tecnologias: {item.tech}</p>
                  <p>Dificuldade: {item.difficulty}</p>
                </div>
                <div className="rounded-3xl bg-background p-4 text-sm text-slate-300">
                  <p>Tempo gasto: {item.hours}</p>
                  <p>Data: {item.date}</p>
                </div>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <a href={item.github} target="_blank" rel="noreferrer" className="rounded-3xl bg-accent/10 px-4 py-3 text-sm text-accent transition hover:bg-accent/20">GitHub</a>
                <a href={item.demo} target="_blank" rel="noreferrer" className="rounded-3xl bg-white/5 px-4 py-3 text-sm text-slate-200 transition hover:bg-white/10">Demo</a>
              </div>
              <p className="mt-4 text-sm text-slate-300">Aprendizado: {item.insight}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
