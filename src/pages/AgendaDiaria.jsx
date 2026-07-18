import { useLocalStorage } from '../hooks/useLocalStorage';

const blankEntry = {
  time: '',
  task: '',
  category: 'Cursos',
  priority: 'Média',
  planned: '',
  actual: '',
  done: false,
  notes: ''
};

const categories = ['Cursos', 'Estudo', 'Projetos', 'Livros', 'Certificação', 'Planejamento', 'Pausa'];
const priorities = ['Alta', 'Média', 'Baixa'];

const categoryColors = {
  Cursos: 'bg-violet-500/15 text-violet-200',
  Estudo: 'bg-cyan-500/15 text-cyan-200',
  Projetos: 'bg-fuchsia-500/15 text-fuchsia-200',
  Livros: 'bg-sky-500/15 text-sky-200',
  Certificação: 'bg-emerald-500/15 text-emerald-200',
  Planejamento: 'bg-slate-500/15 text-slate-200',
  Pausa: 'bg-amber-500/15 text-amber-200'
};

export default function AgendaDiaria() {
  const [schedule, setSchedule] = useLocalStorage('agendaDiaria', []);

  const updateItem = (index, key, value) => {
    setSchedule((prev) => prev.map((item, idx) => (idx === index ? { ...item, [key]: value } : item)));
  };

  const addRow = () => setSchedule((prev) => [...prev, { ...blankEntry }]);
  const removeRow = (index) => setSchedule((prev) => prev.filter((_, idx) => idx !== index));

  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-white/10 bg-surface p-6 shadow-[0_20px_60px_rgba(0,0,0,0.18)]">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Agenda Diária</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">Rotina de foco e execução</h2>
          </div>
          <button
            type="button"
            onClick={addRow}
            className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-background transition hover:bg-blue-400"
          >
            Adicionar tarefa
          </button>
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
                <th className="px-4 py-4">Remover</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {schedule.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-4 py-8 text-center text-slate-400">
                    Nenhuma tarefa registrada. Clique em "Adicionar tarefa" para começar.
                  </td>
                </tr>
              ) : (
                schedule.map((item, index) => (
                  <tr key={index} className="hover:bg-white/5 transition-colors">
                    <td className="px-4 py-3">
                      <input
                        type="time"
                        value={item.time}
                        onChange={(event) => updateItem(index, 'time', event.target.value)}
                        className="w-full rounded-2xl border border-white/10 bg-[#111827] px-2 py-2 text-white outline-none"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="text"
                        value={item.task}
                        onChange={(event) => updateItem(index, 'task', event.target.value)}
                        placeholder="Tarefa"
                        className="w-full rounded-2xl border border-white/10 bg-[#111827] px-2 py-2 text-white outline-none"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={item.category}
                        onChange={(event) => updateItem(index, 'category', event.target.value)}
                        className="w-full rounded-2xl border border-white/10 bg-[#111827] px-2 py-2 text-white outline-none"
                      >
                        {categories.map((category) => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={item.priority}
                        onChange={(event) => updateItem(index, 'priority', event.target.value)}
                        className="w-full rounded-2xl border border-white/10 bg-[#111827] px-2 py-2 text-white outline-none"
                      >
                        {priorities.map((priority) => (
                          <option key={priority} value={priority}>{priority}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="text"
                        value={item.planned}
                        onChange={(event) => updateItem(index, 'planned', event.target.value)}
                        placeholder="1h"
                        className="w-full rounded-2xl border border-white/10 bg-[#111827] px-2 py-2 text-white outline-none"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="text"
                        value={item.actual}
                        onChange={(event) => updateItem(index, 'actual', event.target.value)}
                        placeholder="0h"
                        className="w-full rounded-2xl border border-white/10 bg-[#111827] px-2 py-2 text-white outline-none"
                      />
                    </td>
                    <td className="px-4 py-3 text-center">
                      <input
                        type="checkbox"
                        checked={item.done}
                        onChange={(event) => updateItem(index, 'done', event.target.checked)}
                        className="h-5 w-5 rounded border-white/10 bg-[#111827] text-accent"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="text"
                        value={item.notes}
                        onChange={(event) => updateItem(index, 'notes', event.target.value)}
                        placeholder="Observações"
                        className="w-full rounded-2xl border border-white/10 bg-[#111827] px-2 py-2 text-white outline-none"
                      />
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        type="button"
                        onClick={() => removeRow(index)}
                        className="rounded-full bg-white/5 px-3 py-2 text-xs text-slate-200 transition hover:bg-white/10"
                      >
                        Remover
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
