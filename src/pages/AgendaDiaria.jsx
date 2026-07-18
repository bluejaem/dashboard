const schedule = [
  { time: '06:30', task: 'Meditação e revisão diária', category: 'Bem-estar', priority: 'Alta', planned: '30m', actual: '25m', done: true, notes: 'Foco no plano da manhã' },
  { time: '08:00', task: 'Aulas de ADS', category: 'Cursos', priority: 'Alta', planned: '2h', actual: '2h', done: true, notes: 'Projeto React' },
  { time: '10:30', task: 'Estudo de algoritmos', category: 'Estudo', priority: 'Alta', planned: '1h30', actual: '1h20', done: true, notes: 'Listas e árvores' },
  { time: '12:30', task: 'Almoço e pausa', category: 'Pausa', priority: 'Média', planned: '1h', actual: '1h', done: true, notes: 'Recuperar energia' },
  { time: '14:00', task: 'Revisão GitHub', category: 'Projetos', priority: 'Média', planned: '1h30', actual: '1h10', done: true, notes: 'Commit e documentação' },
  { time: '16:00', task: 'Curso Engenharia', category: 'Cursos', priority: 'Alta', planned: '2h', actual: '1h50', done: false, notes: 'Estruturas e cálculo' },
  { time: '18:30', task: 'Exercícios de certificação', category: 'Certificação', priority: 'Média', planned: '1h', actual: '0h45', done: false, notes: 'Questões AWS' },
  { time: '20:00', task: 'Leitura técnica', category: 'Livros', priority: 'Baixa', planned: '1h', actual: '0h50', done: false, notes: 'Arquitetura limpa' },
  { time: '21:30', task: 'Planejamento do próximo dia', category: 'Planejamento', priority: 'Alta', planned: '30m', actual: '0m', done: false, notes: 'Atualizar rotina' }
];

const categoryColors = {
  'Bem-estar': 'bg-blue-500/15 text-blue-200',
  Cursos: 'bg-violet-500/15 text-violet-200',
  Estudo: 'bg-cyan-500/15 text-cyan-200',
  Pausa: 'bg-amber-500/15 text-amber-200',
  Projetos: 'bg-fuchsia-500/15 text-fuchsia-200',
  'Certificação': 'bg-emerald-500/15 text-emerald-200',
  Livros: 'bg-sky-500/15 text-sky-200',
  Planejamento: 'bg-slate-500/15 text-slate-200'
};

export default function AgendaDiaria() {
  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-white/10 bg-surface p-6 shadow-[0_20px_60px_rgba(0,0,0,0.18)]">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Agenda Diária</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">Rotina de foco e execução</h2>
          </div>
          <p className="text-sm text-slate-300">06:30 — 23:00</p>
        </div>

        <div className="mt-6 overflow-x-auto rounded-3xl border border-white/5 bg-[#151515]">
          <table className="min-w-full divide-y divide-white/5 text-left text-sm text-slate-300">
            <thead className="bg-[#111827] text-xs uppercase tracking-[0.2em] text-slate-500">
              <tr>
                <th className="whitespace-nowrap px-4 py-4">Horário</th>
                <th className="px-4 py-4">Tarefa</th>
                <th className="px-4 py-4">Categoria</th>
                <th className="px-4 py-4">Prioridade</th>
                <th className="px-4 py-4">Tempo previsto</th>
                <th className="px-4 py-4">Tempo realizado</th>
                <th className="px-4 py-4">Concluído</th>
                <th className="px-4 py-4">Observações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {schedule.map((item) => (
                <tr key={item.time} className="hover:bg-white/5 transition-colors">
                  <td className="px-4 py-4 font-medium text-white">{item.time}</td>
                  <td className="px-4 py-4">{item.task}</td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${categoryColors[item.category] || 'bg-white/5 text-slate-200'}`}>
                      {item.category}
                    </span>
                  </td>
                  <td className="px-4 py-4">{item.priority}</td>
                  <td className="px-4 py-4">{item.planned}</td>
                  <td className="px-4 py-4">{item.actual}</td>
                  <td className="px-4 py-4">{item.done ? '✅' : '⏳'}</td>
                  <td className="px-4 py-4 text-slate-300">{item.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
