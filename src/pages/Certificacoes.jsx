import { useLocalStorage } from '../hooks/useLocalStorage';

const blankCertification = {
  name: '',
  institution: '',
  date: '',
  value: '',
  hours: '',
  status: 'Planejada',
  result: ''
};

export default function Certificacoes() {
  const [certifications, setCertifications] = useLocalStorage('certifications', []);

  const addCertification = () => setCertifications((prev) => [...prev, { ...blankCertification }]);
  const updateCertification = (index, key, value) => {
    setCertifications((prev) => prev.map((cert, idx) => (idx === index ? { ...cert, [key]: value } : cert)));
  };
  const removeCertification = (index) => setCertifications((prev) => prev.filter((_, idx) => idx !== index));

  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-white/10 bg-surface p-6 shadow-[0_20px_60px_rgba(0,0,0,0.18)]">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Certificações</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">Meta anual de certificações</h2>
          </div>
          <button type="button" onClick={addCertification} className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-background transition hover:bg-blue-400">
            Adicionar certificação
          </button>
        </div>

        <div className="mt-6 grid gap-4">
          {certifications.length === 0 ? (
            <div className="rounded-3xl border border-white/10 bg-[#111827] p-6 text-slate-300">
              Nenhuma certificação cadastrada. Adicione sua certificação para acompanhar.
            </div>
          ) : (
            certifications.map((item, index) => (
              <div key={index} className="rounded-3xl border border-white/10 bg-[#111827] p-5 shadow-[0_14px_30px_rgba(0,0,0,0.18)]">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <input
                      value={item.name}
                      onChange={(event) => updateCertification(index, 'name', event.target.value)}
                      placeholder="Nome da certificação"
                      className="w-full rounded-2xl border border-white/10 bg-black/20 px-3 py-2 text-white outline-none"
                    />
                    <input
                      value={item.institution}
                      onChange={(event) => updateCertification(index, 'institution', event.target.value)}
                      placeholder="Instituição"
                      className="mt-3 w-full rounded-2xl border border-white/10 bg-black/20 px-3 py-2 text-slate-200 outline-none"
                    />
                  </div>
                  <button type="button" onClick={() => removeCertification(index)} className="rounded-full bg-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-slate-200">
                    Remover
                  </button>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  <input
                    value={item.date}
                    onChange={(event) => updateCertification(index, 'date', event.target.value)}
                    placeholder="Data"
                    className="rounded-3xl bg-background p-4 text-sm text-slate-200 outline-none border border-white/10"
                  />
                  <input
                    value={item.value}
                    onChange={(event) => updateCertification(index, 'value', event.target.value)}
                    placeholder="Valor"
                    className="rounded-3xl bg-background p-4 text-sm text-slate-200 outline-none border border-white/10"
                  />
                  <input
                    value={item.hours}
                    onChange={(event) => updateCertification(index, 'hours', event.target.value)}
                    placeholder="Horas estudadas"
                    className="rounded-3xl bg-background p-4 text-sm text-slate-200 outline-none border border-white/10"
                  />
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <input
                    value={item.status}
                    onChange={(event) => updateCertification(index, 'status', event.target.value)}
                    placeholder="Status"
                    className="rounded-3xl bg-background p-4 text-sm text-slate-200 outline-none border border-white/10"
                  />
                  <input
                    value={item.result}
                    onChange={(event) => updateCertification(index, 'result', event.target.value)}
                    placeholder="Resultado"
                    className="rounded-3xl bg-background p-4 text-sm text-slate-200 outline-none border border-white/10"
                  />
                </div>
                <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-white/5">
                  <div className="h-full rounded-full bg-accent transition-all duration-700" style={{ width: item.status.toLowerCase().includes('concl') ? '100%' : item.status.toLowerCase().includes('and') ? '70%' : '30%' }} />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
