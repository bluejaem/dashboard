import { useLocalStorage } from '../hooks/useLocalStorage';

const days = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'];
const categories = ['Estudo', 'Projetos', 'Certificação', 'Pausa', 'Cursos'];

const categoryStyles = {
  Estudo: 'from-cyan-700 to-cyan-500',
  Projetos: 'from-sky-700 to-sky-500',
  Certificação: 'from-emerald-700 to-emerald-500',
  Pausa: 'from-amber-700 to-amber-500',
  Cursos: 'from-violet-700 to-violet-500'
};

const blankAssignment = { day: 'Seg', title: '', category: 'Estudo' };

export default function AgendaSemanal() {
  const [assignments, setAssignments] = useLocalStorage('agendaSemanal', []);

  const updateAssignment = (index, key, value) => {
    setAssignments((prev) => prev.map((item, idx) => (idx === index ? { ...item, [key]: value } : item)));
  };

  const addAssignment = () => setAssignments((prev) => [...prev, { ...blankAssignment }]);
  const removeAssignment = (index) => setAssignments((prev) => prev.filter((_, idx) => idx !== index));

  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-white/10 bg-surface p-6 shadow-[0_20px_60px_rgba(0,0,0,0.18)]">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Agenda Semanal</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">Visão da semana</h2>
          </div>
          <button
            type="button"
            onClick={addAssignment}
            className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-background transition hover:bg-blue-400"
          >
            Adicionar bloco
          </button>
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
                <p className="text-sm text-slate-300">Blocos agendados</p>
                <p className="mt-2 text-xl font-semibold text-white">{assignments.length}</p>
              </div>
              <div className="rounded-3xl bg-[#1F2937] p-4">
                <p className="text-sm text-slate-300">Foco da semana</p>
                <p className="mt-2 text-xl font-semibold text-white">Acompanhe sua rotina</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {assignments.length === 0 ? (
            <div className="rounded-3xl bg-[#111827] p-6 text-center text-slate-300">
              Nenhum bloco definido. Adicione uma atividade para a semana.
            </div>
          ) : (
            assignments.map((item, index) => (
              <div key={index} className={`rounded-3xl border border-white/10 bg-gradient-to-br ${categoryStyles[item.category] || categoryStyles.Estudo} p-5 shadow-[0_18px_45px_rgba(0,0,0,0.18)]`}>
                <div className="flex items-center justify-between gap-3">
                  <select
                    value={item.day}
                    onChange={(event) => updateAssignment(index, 'day', event.target.value)}
                    className="rounded-2xl border border-white/10 bg-black/20 px-3 py-2 text-sm font-semibold text-white outline-none"
                  >
                    {days.map((day) => (
                      <option key={day} value={day}>{day}</option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={() => removeAssignment(index)}
                    className="rounded-full bg-white/10 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-slate-200"
                  >
                    Remover
                  </button>
                </div>
                <input
                  value={item.title}
                  onChange={(event) => updateAssignment(index, 'title', event.target.value)}
                  placeholder="Título do bloco"
                  className="mt-4 w-full rounded-2xl border border-white/10 bg-black/20 px-3 py-3 text-lg font-semibold text-white outline-none"
                />
                <select
                  value={item.category}
                  onChange={(event) => updateAssignment(index, 'category', event.target.value)}
                  className="mt-4 w-full rounded-2xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-white outline-none"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
