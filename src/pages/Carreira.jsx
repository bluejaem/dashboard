import { useLocalStorage } from '../hooks/useLocalStorage';

const blankApplication = {
  company: '',
  role: '',
  date: '',
  stage: '',
  interview: '',
  feedback: '',
  result: ''
};

export default function Carreira() {
  const [applications, setApplications] = useLocalStorage('careerApplications', []);

  const addApplication = () => setApplications((prev) => [...prev, { ...blankApplication }]);
  const updateApplication = (index, key, value) => {
    setApplications((prev) => prev.map((item, idx) => (idx === index ? { ...item, [key]: value } : item)));
  };
  const removeApplication = (index) => setApplications((prev) => prev.filter((_, idx) => idx !== index));

  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-white/10 bg-surface p-6 shadow-[0_20px_60px_rgba(0,0,0,0.18)]">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Carreira</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">Controle de vagas e candidaturas</h2>
          </div>
          <button type="button" onClick={addApplication} className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-background transition hover:bg-blue-400">
            Adicionar vaga
          </button>
        </div>

        <div className="mt-6 grid gap-4">
          {applications.length === 0 ? (
            <div className="rounded-3xl border border-white/10 bg-[#111827] p-6 text-slate-300">
              Nenhuma candidatura registrada. Adicione vagas para acompanhar suas etapas.
            </div>
          ) : (
            applications.map((item, index) => (
              <div key={index} className="rounded-3xl border border-white/10 bg-[#111827] p-5 shadow-[0_14px_30px_rgba(0,0,0,0.18)]">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <input
                      value={item.company}
                      onChange={(event) => updateApplication(index, 'company', event.target.value)}
                      placeholder="Empresa"
                      className="w-full rounded-2xl border border-white/10 bg-black/20 px-3 py-2 text-white outline-none"
                    />
                    <input
                      value={item.role}
                      onChange={(event) => updateApplication(index, 'role', event.target.value)}
                      placeholder="Cargo"
                      className="mt-3 w-full rounded-2xl border border-white/10 bg-black/20 px-3 py-2 text-slate-200 outline-none"
                    />
                  </div>
                  <button type="button" onClick={() => removeApplication(index)} className="rounded-full bg-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-slate-200">
                    Remover
                  </button>
                </div>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <input
                    value={item.date}
                    onChange={(event) => updateApplication(index, 'date', event.target.value)}
                    placeholder="Data candidatura"
                    className="rounded-3xl bg-background p-4 text-sm text-slate-200 outline-none border border-white/10"
                  />
                  <input
                    value={item.stage}
                    onChange={(event) => updateApplication(index, 'stage', event.target.value)}
                    placeholder="Etapa"
                    className="rounded-3xl bg-background p-4 text-sm text-slate-200 outline-none border border-white/10"
                  />
                </div>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <input
                    value={item.interview}
                    onChange={(event) => updateApplication(index, 'interview', event.target.value)}
                    placeholder="Data entrevista"
                    className="rounded-3xl bg-background p-4 text-sm text-slate-200 outline-none border border-white/10"
                  />
                  <input
                    value={item.feedback}
                    onChange={(event) => updateApplication(index, 'feedback', event.target.value)}
                    placeholder="Feedback"
                    className="rounded-3xl bg-background p-4 text-sm text-slate-200 outline-none border border-white/10"
                  />
                </div>
                <input
                  value={item.result}
                  onChange={(event) => updateApplication(index, 'result', event.target.value)}
                  placeholder="Resultado"
                  className="mt-4 w-full rounded-2xl border border-white/10 bg-black/20 px-3 py-2 text-white outline-none"
                />
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
