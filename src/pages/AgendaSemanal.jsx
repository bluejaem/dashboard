const days = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'];
const categories = ['Estudo', 'Projetos', 'Certificação', 'Pausa', 'Cursos'];

const assignments = [
  { day: 'Seg', title: 'Revisão ADS', category: 'Cursos', color: 'from-violet-700 to-violet-500' },
  { day: 'Ter', title: 'Deploy App', category: 'Projetos', color: 'from-sky-700 to-sky-500' },
  { day: 'Qua', title: 'Simulado', category: 'Certificação', color: 'from-emerald-700 to-emerald-500' },
  { day: 'Qui', title: 'Leitura técnica', category: 'Estudo', color: 'from-cyan-700 to-cyan-500' },
  { day: 'Sex', title: 'Mentoria', category: 'Cursos', color: 'from-violet-700 to-violet-500' },
  { day: 'Sab', title: 'Análise de código', category: 'Projetos', color: 'from-sky-700 to-sky-500' },
  { day: 'Dom', title: 'Planejamento', category: 'Pausa', color: 'from-amber-700 to-amber-500' }
];

export default function AgendaSemanal() {
  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-white/10 bg-surface p-6 shadow-[0_20px_60px_rgba(0,0,0,0.18)]">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Agenda Semanal</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">Visão da semana</h2>
          </div>
          <p className="text-sm text-slate-300">Organizado por categoria e foco</p>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl bg-[#111827] p-5">
            <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Legenda de categorias</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {categories.map((category) => (
                <div key={category} className="rounded-2xl border border-white/10 bg-white/5 p-3 text-sm text-slate-200">
                  <span className="block font-semibold text-white">{category}</span>
                  <span className="text-slate-400">Cor do bloco e foco</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-[#111827] p-5">
            <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Resumo de metas</p>
            <div className="mt-4 space-y-3">
              <div className="rounded-3xl bg-[#1F2937] p-4">
                <p className="text-sm text-slate-300">Tarefas agendadas</p>
                <p className="mt-2 text-xl font-semibold text-white">7</p>
              </div>
              <div className="rounded-3xl bg-[#1F2937] p-4">
                <p className="text-sm text-slate-300">Foco da semana</p>
                <p className="mt-2 text-xl font-semibold text-white">Automação e estudos</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {assignments.map((item) => (
            <div key={item.day} className={`rounded-3xl border border-white/10 bg-gradient-to-br ${item.color} p-5 shadow-[0_18px_45px_rgba(0,0,0,0.18)]`}>
              <p className="text-xs uppercase tracking-[0.18em] text-slate-200/90">{item.day}</p>
              <h3 className="mt-4 text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-100/80">{item.category}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
