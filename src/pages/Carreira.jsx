const applications = [
  { company: 'Empresa Tech', role: 'Desenvolvedor Front-end', date: '08/07/2026', stage: 'Entrevista técnica', interview: '21/07', feedback: 'Positivo', result: 'Aguardando' },
  { company: 'Startup AI', role: 'Engenheiro de Dados', date: '12/07/2026', stage: 'Aguardando feedback', interview: '18/07', feedback: 'Em análise', result: 'Aguardando' },
  { company: 'Consultoria TI', role: 'Analista de Sistemas', date: '02/07/2026', stage: 'Proposta', interview: '10/07', feedback: 'Excelente', result: 'Negociando' }
];

export default function Carreira() {
  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-white/10 bg-surface p-6 shadow-[0_20px_60px_rgba(0,0,0,0.18)]">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Carreira</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">Controle de vagas e candidaturas</h2>
          </div>
          <p className="text-sm text-slate-300">Visibilidade sobre etapas e feedbacks</p>
        </div>

        <div className="mt-6 grid gap-4">
          {applications.map((item) => (
            <div key={item.company} className="rounded-3xl border border-white/10 bg-[#111827] p-5 shadow-[0_14px_30px_rgba(0,0,0,0.18)]">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-white">{item.company}</h3>
                  <p className="text-sm text-slate-400">{item.role}</p>
                </div>
                <span className="rounded-full bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.15em] text-slate-300">{item.stage}</span>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-3xl bg-background p-4 text-sm text-slate-300">
                  <p>Data candidatura: {item.date}</p>
                  <p>Entrevista: {item.interview}</p>
                </div>
                <div className="rounded-3xl bg-background p-4 text-sm text-slate-300">
                  <p>Feedback: {item.feedback}</p>
                  <p>Resultado: {item.result}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
