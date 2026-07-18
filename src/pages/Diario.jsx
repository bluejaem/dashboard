import { useLocalStorage } from '../hooks/useLocalStorage';

const blankEntry = {
  date: '',
  mood: '',
  energy: '',
  sleep: '',
  learned: '',
  hard: '',
  improve: '',
  next: ''
};

export default function Diario() {
  const [entries, setEntries] = useLocalStorage('diaryEntries', []);

  const addEntry = () => setEntries((prev) => [...prev, { ...blankEntry }]);
  const updateEntry = (index, key, value) => {
    setEntries((prev) => prev.map((entry, idx) => (idx === index ? { ...entry, [key]: value } : entry)));
  };
  const removeEntry = (index) => setEntries((prev) => prev.filter((_, idx) => idx !== index));

  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-white/10 bg-surface p-6 shadow-[0_20px_60px_rgba(0,0,0,0.18)]">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Diário</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">Reflexões e aprendizado</h2>
          </div>
          <button type="button" onClick={addEntry} className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-background transition hover:bg-blue-400">
            Adicionar registro
          </button>
        </div>

        <div className="mt-6 grid gap-4">
          {entries.length === 0 ? (
            <div className="rounded-3xl border border-white/10 bg-[#111827] p-6 text-slate-300">
              Nenhum registro. Cadastre um dia de aprendizado e produtividade.
            </div>
          ) : (
            entries.map((entry, index) => (
              <div key={index} className="rounded-3xl border border-white/10 bg-[#111827] p-5 shadow-[0_14px_30px_rgba(0,0,0,0.18)]">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <input
                    value={entry.date}
                    onChange={(event) => updateEntry(index, 'date', event.target.value)}
                    placeholder="Data"
                    className="rounded-2xl border border-white/10 bg-black/20 px-3 py-2 text-white outline-none"
                  />
                  <button type="button" onClick={() => removeEntry(index)} className="rounded-full bg-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-slate-200">
                    Remover
                  </button>
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-3 text-sm text-slate-300">
                  <input
                    value={entry.mood}
                    onChange={(event) => updateEntry(index, 'mood', event.target.value)}
                    placeholder="Humor"
                    className="rounded-3xl bg-background p-4 outline-none border border-white/10"
                  />
                  <input
                    value={entry.energy}
                    onChange={(event) => updateEntry(index, 'energy', event.target.value)}
                    placeholder="Energia"
                    className="rounded-3xl bg-background p-4 outline-none border border-white/10"
                  />
                  <input
                    value={entry.sleep}
                    onChange={(event) => updateEntry(index, 'sleep', event.target.value)}
                    placeholder="Horas dormidas"
                    className="rounded-3xl bg-background p-4 outline-none border border-white/10"
                  />
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <textarea
                    value={entry.learned}
                    onChange={(event) => updateEntry(index, 'learned', event.target.value)}
                    placeholder="O que aprendi"
                    className="rounded-3xl bg-background p-4 text-sm text-slate-200 outline-none border border-white/10"
                  />
                  <textarea
                    value={entry.hard}
                    onChange={(event) => updateEntry(index, 'hard', event.target.value)}
                    placeholder="O que foi difícil"
                    className="rounded-3xl bg-background p-4 text-sm text-slate-200 outline-none border border-white/10"
                  />
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <textarea
                    value={entry.improve}
                    onChange={(event) => updateEntry(index, 'improve', event.target.value)}
                    placeholder="O que preciso melhorar"
                    className="rounded-3xl bg-background p-4 text-sm text-slate-200 outline-none border border-white/10"
                  />
                  <textarea
                    value={entry.next}
                    onChange={(event) => updateEntry(index, 'next', event.target.value)}
                    placeholder="Próximo passo"
                    className="rounded-3xl bg-background p-4 text-sm text-slate-200 outline-none border border-white/10"
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
