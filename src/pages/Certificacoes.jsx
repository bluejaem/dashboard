const certifications = [
  { name: 'AWS Cloud Practitioner', institution: 'AWS', date: '18/02/2026', value: 'R$ 150', hours: '30h', status: 'Concluída', result: 'Aprovado' },
  { name: 'Certificação Scrum', institution: 'Scrum.org', date: '27/03/2026', value: 'R$ 120', hours: '20h', status: 'Em andamento', result: 'Pendente' },
  { name: 'Cisco CCNA', institution: 'Cisco', date: '12/05/2026', value: 'R$ 350', hours: '45h', status: 'Planejada', result: 'Pendente' }
];

export default function Certificacoes() {
  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-white/10 bg-surface p-6 shadow-[0_20px_60px_rgba(0,0,0,0.18)]">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Certificações</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">Meta anual de certificações</h2>
          </div>
          <p className="text-sm text-slate-300">Aperfeiçoamento em TI</p>
        </div>

        <div className="mt-6 grid gap-4">
          {certifications.map((item) => (
            <div key={item.name} className="rounded-3xl border border-white/10 bg-[#111827] p-5 shadow-[0_14px_30px_rgba(0,0,0,0.18)]">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-white">{item.name}</h3>
                  <p className="text-sm text-slate-400">{item.institution}</p>
                </div>
                <span className="rounded-full bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.15em] text-slate-300">{item.status}</span>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <div className="rounded-3xl bg-background p-4 text-sm text-slate-300">
                  <p>Data: {item.date}</p>
                </div>
                <div className="rounded-3xl bg-background p-4 text-sm text-slate-300">
                  <p>Valor: {item.value}</p>
                </div>
                <div className="rounded-3xl bg-background p-4 text-sm text-slate-300">
                  <p>Horas estudadas: {item.hours}</p>
                </div>
              </div>
              <p className="mt-4 text-sm text-slate-300">Resultado: {item.result}</p>
              <div className="mt-4">
                <div className="h-2 w-full overflow-hidden rounded-full bg-white/5">
                  <div className="h-full rounded-full bg-accent transition-all duration-700" style={{ width: item.status === 'Concluída' ? '100%' : item.status === 'Em andamento' ? '70%' : '30%' }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
