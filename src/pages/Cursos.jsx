const subjects = [
  { name: 'Engenharia de Software', teacher: 'Profa. Maria', grade: 'A', exams: '2', assignments: '5', hours: '48h', progress: 82 },
  { name: 'Análise e Desenvolvimento', teacher: 'Prof. Lucas', grade: 'A-', exams: '1', assignments: '3', hours: '40h', progress: 76 },
  { name: 'Gestão de TI', teacher: 'Profa. Ana', grade: 'B+', exams: '1', assignments: '4', hours: '36h', progress: 68 }
];

export default function Cursos() {
  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-white/10 bg-surface p-6 shadow-[0_20px_60px_rgba(0,0,0,0.18)]">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Cursos</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">Controle de disciplinas</h2>
          </div>
          <p className="text-sm text-slate-300">Engenharia • ADS • GTI</p>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {subjects.map((subject) => (
            <div key={subject.name} className="rounded-3xl border border-white/10 bg-[#111827] p-5 shadow-[0_14px_30px_rgba(0,0,0,0.18)]">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold text-white">{subject.name}</h3>
                  <p className="mt-2 text-sm text-slate-400">{subject.teacher}</p>
                </div>
                <span className="rounded-full bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.15em] text-slate-300">
                  {subject.grade}
                </span>
              </div>
              <div className="mt-5 grid gap-3">
                <div className="rounded-3xl bg-background p-4 text-sm text-slate-300">
                  <p>Provas: {subject.exams}</p>
                  <p>Trabalhos: {subject.assignments}</p>
                </div>
                <div className="rounded-3xl bg-background p-4 text-sm text-slate-300">
                  <p>Carga horária: {subject.hours}</p>
                </div>
                <div>
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.16em] text-slate-400 mb-2">
                    <span>Progresso</span>
                    <span>{subject.progress}%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-white/5">
                    <div className="h-full rounded-full bg-accent transition-all duration-700" style={{ width: `${subject.progress}%` }} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
