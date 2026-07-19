import { useLocalStorage } from '../hooks/useLocalStorage';

const defaultCourses = [
  {
    degree: 'Engenharia da Computação',
    institution: 'UNINTER EAD',
    currentModule: 'Módulo atual',
    grade: '',
    exams: '',
    assignments: '',
    hours: '',
    progress: 0
  },
  {
    degree: 'Análise e Desenvolvimento de Sistemas',
    institution: 'ETEP EAD',
    currentModule: 'Módulo atual',
    grade: '',
    exams: '',
    assignments: '',
    hours: '',
    progress: 0
  },
  {
    degree: 'Gestão da Tecnologia da Informação',
    institution: 'Estácio EAD',
    currentModule: 'Módulo atual',
    grade: '',
    exams: '',
    assignments: '',
    hours: '',
    progress: 0
  }
];

const blankCourse = { degree: '', institution: '', currentModule: '', grade: '', exams: '', assignments: '', hours: '', progress: 0 };

export default function Cursos() {
  const [subjects, setSubjects] = useLocalStorage('cursos', defaultCourses);

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
            <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Estudos</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">Suas três graduações</h2>
            <p className="mt-2 text-slate-400">Acompanhe UNINTER, ETEP e Estácio em um único painel.</p>
          </div>
          <button
            type="button"
            onClick={addCourse}
            className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-background transition hover:bg-blue-400"
          >
            Adicionar curso
          </button>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {subjects.length === 0 ? (
            <div className="rounded-3xl border border-white/10 bg-[#111827] p-6 text-slate-300">
              Nenhum curso cadastrado. Adicione um curso para acompanhar seu progresso.
            </div>
          ) : (
            subjects.map((subject, index) => (
              <div key={index} className="rounded-3xl border border-white/10 bg-[#111827] p-5 shadow-[0_14px_30px_rgba(0,0,0,0.18)]">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-400">{subject.institution}</p>
                    <h3 className="mt-2 text-xl font-semibold text-white">{subject.degree}</h3>
                    <p className="mt-2 text-sm text-slate-300">{subject.currentModule}</p>
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
                  <label className="text-xs uppercase tracking-[0.16em] text-slate-400">Provas</label>
                  <input
                    value={subject.exams}
                    onChange={(event) => updateCourse(index, 'exams', event.target.value)}
                    placeholder="Provas"
                    className="rounded-3xl bg-background p-4 text-sm text-slate-200 outline-none border border-white/10"
                  />
                  <label className="text-xs uppercase tracking-[0.16em] text-slate-400">Trabalhos</label>
                  <input
                    value={subject.assignments}
                    onChange={(event) => updateCourse(index, 'assignments', event.target.value)}
                    placeholder="Trabalhos"
                    className="rounded-3xl bg-background p-4 text-sm text-slate-200 outline-none border border-white/10"
                  />
                  <label className="text-xs uppercase tracking-[0.16em] text-slate-400">Horas semanais</label>
                  <input
                    value={subject.hours}
                    onChange={(event) => updateCourse(index, 'hours', event.target.value)}
                    placeholder="Horas semanais"
                    className="rounded-3xl bg-background p-4 text-sm text-slate-200 outline-none border border-white/10"
                  />
                  <label className="text-xs uppercase tracking-[0.16em] text-slate-400">Progresso</label>
                  <input
                    type="number"
                    value={subject.progress}
                    min={0}
                    max={100}
                    onChange={(event) => updateCourse(index, 'progress', Number(event.target.value) || 0)}
                    className="rounded-2xl border border-white/10 bg-black/20 px-3 py-2 text-white outline-none"
                  />
                </div>
                <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-white/5">
                  <div className="h-full rounded-full bg-accent transition-all duration-700" style={{ width: `${subject.progress}%` }} />
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
