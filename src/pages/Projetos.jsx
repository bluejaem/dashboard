import { useLocalStorage } from '../hooks/useLocalStorage';
import { useMemo } from 'react';

const statuses = ['Planejado', 'Em andamento', 'Concluído'];
const blankProject = {
  project: '',
  description: '',
  tech: '',
  difficulty: '',
  hours: '',
  status: 'Planejado',
  github: '',
  demo: '',
  date: '',
  insight: ''
};

export default function Projetos() {
  const [repositories, setRepositories] = useLocalStorage('githubProjects', []);

  const summary = useMemo(() => {
    const total = repositories.length;
    const planned = repositories.filter((item) => item.status === 'Planejado').length;
    const active = repositories.filter((item) => item.status === 'Em andamento').length;
    const completed = repositories.filter((item) => item.status === 'Concluído').length;
    return { total, planned, active, completed };
  }, [repositories]);

  const addProject = () => setRepositories((prev) => [...prev, { ...blankProject }]);
  const updateProject = (index, key, value) => {
    setRepositories((prev) => prev.map((item, idx) => (idx === index ? { ...item, [key]: value } : item)));
  };
  const removeProject = (index) => setRepositories((prev) => prev.filter((_, idx) => idx !== index));

  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-white/10 bg-surface p-6 shadow-[0_20px_60px_rgba(0,0,0,0.18)]">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Projetos</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">Portfólio e entregas em andamento</h2>
          </div>
          <button type="button" onClick={addProject} className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-background transition hover:bg-blue-400">
            Adicionar projeto
          </button>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-4">
          <div className="rounded-3xl bg-[#111827] p-4 text-slate-300">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Total</p>
            <p className="mt-3 text-3xl font-semibold text-white">{summary.total}</p>
          </div>
          <div className="rounded-3xl bg-[#111827] p-4 text-slate-300">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Planejados</p>
            <p className="mt-3 text-3xl font-semibold text-white">{summary.planned}</p>
          </div>
          <div className="rounded-3xl bg-[#111827] p-4 text-slate-300">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Em andamento</p>
            <p className="mt-3 text-3xl font-semibold text-white">{summary.active}</p>
          </div>
          <div className="rounded-3xl bg-[#111827] p-4 text-slate-300">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Concluídos</p>
            <p className="mt-3 text-3xl font-semibold text-white">{summary.completed}</p>
          </div>
        </div>
        <div className="grid gap-4">
          {repositories.length === 0 ? (
            <div className="rounded-3xl border border-white/10 bg-[#111827] p-6 text-slate-300">
              Nenhum projeto cadastrado. Adicione um projeto para acompanhar sua evolução.
            </div>
          ) : (
            repositories.map((item, index) => (
              <div key={index} className="rounded-3xl border border-white/10 bg-[#111827] p-5 shadow-[0_14px_30px_rgba(0,0,0,0.18)]">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <input
                    value={item.project}
                    onChange={(event) => updateProject(index, 'project', event.target.value)}
                    placeholder="Projeto"
                    className="w-full rounded-2xl border border-white/10 bg-black/20 px-3 py-2 text-white outline-none"
                  />
                  <button type="button" onClick={() => removeProject(index)} className="rounded-full bg-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-slate-200">
                    Remover
                  </button>
                </div>
                <textarea
                  value={item.description}
                  onChange={(event) => updateProject(index, 'description', event.target.value)}
                  placeholder="Descrição"
                  className="mt-4 w-full rounded-3xl border border-white/10 bg-background px-4 py-3 text-sm text-slate-200 outline-none"
                />
                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  <input
                    value={item.tech}
                    onChange={(event) => updateProject(index, 'tech', event.target.value)}
                    placeholder="Tecnologias"
                    className="rounded-3xl bg-background p-4 text-sm text-slate-200 outline-none border border-white/10"
                  />
                  <input
                    value={item.difficulty}
                    onChange={(event) => updateProject(index, 'difficulty', event.target.value)}
                    placeholder="Dificuldade"
                    className="rounded-3xl bg-background p-4 text-sm text-slate-200 outline-none border border-white/10"
                  />
                  <select
                    value={item.status}
                    onChange={(event) => updateProject(index, 'status', event.target.value)}
                    className="rounded-3xl bg-background p-4 text-sm text-slate-200 outline-none border border-white/10"
                  >
                    {statuses.map((status) => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <input
                    value={item.hours}
                    onChange={(event) => updateProject(index, 'hours', event.target.value)}
                    placeholder="Tempo gasto"
                    className="rounded-3xl bg-background p-4 text-sm text-slate-200 outline-none border border-white/10"
                  />
                  <input
                    value={item.date}
                    onChange={(event) => updateProject(index, 'date', event.target.value)}
                    placeholder="Data"
                    className="rounded-3xl bg-background p-4 text-sm text-slate-200 outline-none border border-white/10"
                  />
                </div>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <input
                    value={item.github}
                    onChange={(event) => updateProject(index, 'github', event.target.value)}
                    placeholder="Link do projeto"
                    className="rounded-3xl bg-background p-4 text-sm text-slate-200 outline-none border border-white/10"
                  />
                  <input
                    value={item.demo}
                    onChange={(event) => updateProject(index, 'demo', event.target.value)}
                    placeholder="Link Demo"
                    className="rounded-3xl bg-background p-4 text-sm text-slate-200 outline-none border border-white/10"
                  />
                </div>
                <textarea
                  value={item.insight}
                  onChange={(event) => updateProject(index, 'insight', event.target.value)}
                  placeholder="Aprendizado"
                  className="mt-4 w-full rounded-3xl border border-white/10 bg-background px-4 py-3 text-sm text-slate-200 outline-none"
                />
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
