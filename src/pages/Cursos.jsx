import { useLocalStorage } from '../hooks/useLocalStorage';

const blankCourse = { name: '', teacher: '', grade: '', exams: '', assignments: '', hours: '', progress: 0 };

export default function Cursos() {
  const [subjects, setSubjects] = useLocalStorage('cursos', []);

  const addCourse = () => setSubjects((prev) => [...prev, { ...blankCourse }]);
  const updateCourse = (index, key, value) => {
    setSubjects((prev) => prev.map((subject, idx) => (idx === index ? { ...subject, [key]: value } : subject)));
  };
  const removeCourse = (index) => setSubjects((prev) => prev.filter((_, idx) => idx !== index));

  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-white/10 bg-surface p-6 shadow-[0_20px_60px_rgba(0,0,0,0.18)]">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Cursos</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">Controle de disciplinas</h2>
          </div>
          <button
            type="button"
            onClick={addCourse}
            className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-background transition hover:bg-blue-400"
          >
            Adicionar disciplina
          </button>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {subjects.length === 0 ? (
            <div className="rounded-3xl border border-white/10 bg-[#111827] p-6 text-slate-300">
              Nenhuma disciplina cadastrada. Adicione uma disciplina para gerenciar o progresso.
            </div>
          ) : (
            subjects.map((subject, index) => (
              <div key={index} className="rounded-3xl border border-white/10 bg-[#111827] p-5 shadow-[0_14px_30px_rgba(0,0,0,0.18)]">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <input
                      value={subject.name}
                      onChange={(event) => updateCourse(index, 'name', event.target.value)}
                      placeholder="Disciplina"
                      className="w-full rounded-2xl border border-white/10 bg-black/20 px-3 py-2 text-white outline-none"
                    />
                    <input
                      value={subject.teacher}
                      onChange={(event) => updateCourse(index, 'teacher', event.target.value)}
                      placeholder="Professor(a)"
                      className="mt-3 w-full rounded-2xl border border-white/10 bg-black/20 px-3 py-2 text-slate-200 outline-none"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeCourse(index)}
                    className="rounded-full bg-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-slate-200"
                  >
                    Remover
                  </button>
                </div>
                <div className="mt-5 grid gap-3">
                  <input
                    value={subject.exams}
                    onChange={(event) => updateCourse(index, 'exams', event.target.value)}
                    placeholder="Provas"
                    className="rounded-3xl bg-background p-4 text-sm text-slate-200 outline-none border border-white/10"
                  />
                  <input
                    value={subject.assignments}
                    onChange={(event) => updateCourse(index, 'assignments', event.target.value)}
                    placeholder="Trabalhos"
                    className="rounded-3xl bg-background p-4 text-sm text-slate-200 outline-none border border-white/10"
                  />
                  <input
                    value={subject.hours}
                    onChange={(event) => updateCourse(index, 'hours', event.target.value)}
                    placeholder="Carga horária"
                    className="rounded-3xl bg-background p-4 text-sm text-slate-200 outline-none border border-white/10"
                  />
                  <div>
                    <label className="text-xs uppercase tracking-[0.16em] text-slate-400">Progresso</label>
                    <input
                      type="number"
                      value={subject.progress}
                      min={0}
                      max={100}
                      onChange={(event) => updateCourse(index, 'progress', Number(event.target.value) || 0)}
                      className="mt-2 w-full rounded-2xl border border-white/10 bg-black/20 px-3 py-2 text-white outline-none"
                    />
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-white/5">
                    <div className="h-full rounded-full bg-accent transition-all duration-700" style={{ width: `${subject.progress}%` }} />
                  </div>
                </div>
                <input
                  value={subject.grade}
                  onChange={(event) => updateCourse(index, 'grade', event.target.value)}
                  placeholder="Nota"
                  className="mt-4 w-full rounded-2xl border border-white/10 bg-black/20 px-3 py-2 text-slate-200 outline-none"
                />
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
