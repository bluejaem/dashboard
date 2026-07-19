import { useMemo, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const categories = ['Pessoal', 'Trabalho', 'Estudo', 'Projetos', 'Saúde', 'Financeiro'];
const priorities = ['Baixa', 'Média', 'Alta'];
const statuses = ['Pendente', 'Em andamento', 'Concluída'];

const blankTask = {
  title: '',
  description: '',
  priority: 'Média',
  deadline: '',
  category: 'Pessoal',
  status: 'Pendente'
};

export default function Tarefas() {
  const [tasks, setTasks] = useLocalStorage('tasksData', []);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('Todos');
  const [statusFilter, setStatusFilter] = useState('Todos');

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const searchMatch = [task.title, task.description, task.category].join(' ').toLowerCase().includes(search.toLowerCase());
      const categoryMatch = categoryFilter === 'Todos' || task.category === categoryFilter;
      const statusMatch = statusFilter === 'Todos' || task.status === statusFilter;
      return searchMatch && categoryMatch && statusMatch;
    });
  }, [tasks, search, categoryFilter, statusFilter]);

  const summary = useMemo(() => ({
    pendentes: tasks.filter((task) => task.status === 'Pendente').length,
    andamento: tasks.filter((task) => task.status === 'Em andamento').length,
    concluidas: tasks.filter((task) => task.status === 'Concluída').length
  }), [tasks]);

  const updateTask = (index, key, value) => {
    setTasks((prev) => prev.map((task, idx) => (idx === index ? { ...task, [key]: value } : task)));
  };

  const addTask = () => setTasks((prev) => [...prev, { ...blankTask }]);
  const removeTask = (index) => setTasks((prev) => prev.filter((_, idx) => idx !== index));

  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-white/10 bg-surface p-6 shadow-[0_20px_60px_rgba(0,0,0,0.18)]">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Gestão de tarefas</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">Controle completo do seu fluxo</h2>
          </div>
          <button type="button" onClick={addTask} className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-background transition hover:bg-blue-400">
            Nova tarefa
          </button>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-3xl bg-[#111827] p-4 text-slate-300">
            <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Pendente</p>
            <p className="mt-3 text-3xl font-semibold text-white">{summary.pendentes}</p>
          </div>
          <div className="rounded-3xl bg-[#111827] p-4 text-slate-300">
            <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Em andamento</p>
            <p className="mt-3 text-3xl font-semibold text-white">{summary.andamento}</p>
          </div>
          <div className="rounded-3xl bg-[#111827] p-4 text-slate-300">
            <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Concluídas</p>
            <p className="mt-3 text-3xl font-semibold text-white">{summary.concluidas}</p>
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Buscar tarefas"
            className="rounded-3xl bg-[#111827] px-4 py-3 text-slate-200 outline-none border border-white/10"
          />
          <select value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)} className="rounded-3xl bg-[#111827] px-4 py-3 text-slate-200 outline-none border border-white/10">
            <option value="Todos">Todas as categorias</option>
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className="rounded-3xl bg-[#111827] px-4 py-3 text-slate-200 outline-none border border-white/10">
            <option value="Todos">Todos os status</option>
            {statuses.map((status) => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>

        <div className="mt-6 space-y-4">
          {filteredTasks.length === 0 ? (
            <div className="rounded-3xl border border-white/10 bg-[#111827] p-6 text-slate-300">
              Nenhuma tarefa encontrada. Use o botão acima para adicionar tarefas e mantê-las atualizadas.
            </div>
          ) : (
            filteredTasks.map((task, index) => (
              <div key={`${task.title}-${index}`} className="rounded-3xl border border-white/10 bg-[#111827] p-5 shadow-[0_12px_30px_rgba(0,0,0,0.18)]">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="space-y-2">
                    <input
                      value={task.title}
                      onChange={(event) => updateTask(index, 'title', event.target.value)}
                      placeholder="Título da tarefa"
                      className="w-full rounded-2xl border border-white/10 bg-black/20 px-3 py-2 text-white outline-none"
                    />
                    <textarea
                      value={task.description}
                      onChange={(event) => updateTask(index, 'description', event.target.value)}
                      placeholder="Descrição"
                      className="w-full rounded-3xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-slate-200 outline-none"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeTask(index)}
                    className="rounded-full bg-white/10 px-4 py-2 text-sm uppercase tracking-[0.16em] text-slate-200 transition hover:bg-white/20"
                  >
                    Excluir
                  </button>
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  <select value={task.category} onChange={(event) => updateTask(index, 'category', event.target.value)} className="rounded-3xl bg-black/20 px-4 py-3 text-slate-200 outline-none border border-white/10">
                    {categories.map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                  <select value={task.priority} onChange={(event) => updateTask(index, 'priority', event.target.value)} className="rounded-3xl bg-black/20 px-4 py-3 text-slate-200 outline-none border border-white/10">
                    {priorities.map((priority) => (
                      <option key={priority} value={priority}>{priority}</option>
                    ))}
                  </select>
                  <select value={task.status} onChange={(event) => updateTask(index, 'status', event.target.value)} className="rounded-3xl bg-black/20 px-4 py-3 text-slate-200 outline-none border border-white/10">
                    {statuses.map((status) => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <input
                    type="date"
                    value={task.deadline}
                    onChange={(event) => updateTask(index, 'deadline', event.target.value)}
                    className="rounded-3xl bg-black/20 px-4 py-3 text-slate-200 outline-none border border-white/10"
                  />
                  <p className="rounded-3xl bg-white/5 px-4 py-3 text-sm text-slate-300">Categoria: {task.category} • Prioridade: {task.priority}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
