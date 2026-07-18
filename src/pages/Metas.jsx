import { useLocalStorage } from '../hooks/useLocalStorage';

const blankGoal = {
  type: 'Diária',
  desc: '',
  category: '',
  deadline: '',
  priority: 'Média',
  status: 'Planejado',
  percent: 0
};

const types = ['Diária', 'Semanal', 'Mensal', 'Trimestral', 'Anual'];
const priorities = ['Alta', 'Média', 'Baixa'];

export default function Metas() {
  const [goals, setGoals] = useLocalStorage('metas', []);

  const addGoal = () => setGoals((prev) => [...prev, { ...blankGoal }]);
  const updateGoal = (index, key, value) => {
    setGoals((prev) => prev.map((goal, idx) => (idx === index ? { ...goal, [key]: value } : goal)));
  };
  const removeGoal = (index) => setGoals((prev) => prev.filter((_, idx) => idx !== index));

  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-white/10 bg-surface p-6 shadow-[0_20px_60px_rgba(0,0,0,0.18)]">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Metas</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">Mapeamento de objetivos</h2>
          </div>
          <button type="button" onClick={addGoal} className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-background transition hover:bg-blue-400">
            Adicionar meta
          </button>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {goals.length === 0 ? (
            <div className="rounded-3xl border border-white/10 bg-[#111827] p-6 text-slate-300">
              Nenhuma meta cadastrada. Adicione metas para construir seu plano.
            </div>
          ) : (
            goals.map((goal, index) => (
              <div key={index} className="rounded-3xl border border-white/10 bg-[#111827] p-5 shadow-[0_14px_30px_rgba(0,0,0,0.18)]">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <select
                      value={goal.type}
                      onChange={(event) => updateGoal(index, 'type', event.target.value)}
                      className="w-full rounded-2xl border border-white/10 bg-black/20 px-3 py-2 text-white outline-none"
                    >
                      {types.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                    <textarea
                      value={goal.desc}
                      onChange={(event) => updateGoal(index, 'desc', event.target.value)}
                      placeholder="Descrição da meta"
                      className="mt-3 w-full rounded-3xl border border-white/10 bg-background px-4 py-3 text-sm text-slate-200 outline-none"
                    />
                  </div>
                  <button type="button" onClick={() => removeGoal(index)} className="rounded-full bg-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-slate-200">
                    Remover
                  </button>
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-3 text-sm text-slate-300">
                  <input
                    value={goal.category}
                    onChange={(event) => updateGoal(index, 'category', event.target.value)}
                    placeholder="Categoria"
                    className="rounded-3xl bg-background p-4 outline-none border border-white/10"
                  />
                  <input
                    value={goal.deadline}
                    onChange={(event) => updateGoal(index, 'deadline', event.target.value)}
                    placeholder="Prazo"
                    className="rounded-3xl bg-background p-4 outline-none border border-white/10"
                  />
                  <select
                    value={goal.priority}
                    onChange={(event) => updateGoal(index, 'priority', event.target.value)}
                    className="rounded-3xl bg-background p-4 outline-none border border-white/10 text-slate-200"
                  >
                    {priorities.map((priority) => (
                      <option key={priority} value={priority}>{priority}</option>
                    ))}
                  </select>
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2 items-end">
                  <select
                    value={goal.status}
                    onChange={(event) => updateGoal(index, 'status', event.target.value)}
                    className="rounded-3xl bg-background p-4 outline-none border border-white/10 text-slate-200"
                  >
                    <option value="Planejado">Planejado</option>
                    <option value="Em andamento">Em andamento</option>
                    <option value="Concluído">Concluído</option>
                  </select>
                  <input
                    type="number"
                    value={goal.percent}
                    min={0}
                    max={100}
                    onChange={(event) => updateGoal(index, 'percent', Number(event.target.value) || 0)}
                    placeholder="Percentual"
                    className="rounded-3xl bg-background p-4 outline-none border border-white/10 text-white"
                  />
                </div>
                <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-white/5">
                  <div className="h-full rounded-full bg-accent transition-all duration-700" style={{ width: `${goal.percent}%` }} />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
