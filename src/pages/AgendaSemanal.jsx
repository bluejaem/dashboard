import { useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const days = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'];

const defaultRoutine = [
  {
    time: '06:30',
    Seg: 'Acordar imediatamente. Nada de redes sociais.',
    Ter: 'Acordar imediatamente. Nada de redes sociais.',
    Qua: 'Acordar imediatamente. Nada de redes sociais.',
    Qui: 'Acordar imediatamente. Nada de redes sociais.',
    Sex: 'Acordar imediatamente. Nada de redes sociais.',
    Sab: 'Acordar imediatamente. Nada de redes sociais.',
    Dom: 'Acordar imediatamente. Nada de redes sociais.'
  },
  {
    time: '06:30-07:00',
    Seg: 'Higiene, café da manhã e se arrumar.',
    Ter: 'Higiene, café da manhã e se arrumar.',
    Qua: 'Higiene, café da manhã e se arrumar.',
    Qui: 'Higiene, café da manhã e se arrumar.',
    Sex: 'Higiene, café da manhã e se arrumar.',
    Sab: 'Café da manhã tranquilo e preparação do dia.',
    Dom: 'Café da manhã tranquilo e preparação do dia.'
  },
  {
    time: '07:00-08:20',
    Seg: 'Ônibus: estudo leve, podcasts ou leitura técnica.',
    Ter: 'Ônibus: estudo leve, podcasts ou leitura técnica.',
    Qua: 'Ônibus: estudo leve, podcasts ou leitura técnica.',
    Qui: 'Ônibus: estudo leve, podcasts ou leitura técnica.',
    Sex: 'Ônibus: estudo leve, podcasts ou leitura técnica.',
    Sab: 'Tempo livre ou revisão leve informal.',
    Dom: 'Tempo livre ou revisão leve informal.'
  },
  {
    time: '08:30-18:30',
    Seg: 'Trabalho na Rede Fácil Consultoria.',
    Ter: 'Trabalho na Rede Fácil Consultoria.',
    Qua: 'Trabalho na Rede Fácil Consultoria.',
    Qui: 'Trabalho na Rede Fácil Consultoria.',
    Sex: 'Trabalho na Rede Fácil Consultoria.',
    Sab: 'Descanso, sono e tempo pessoal.',
    Dom: 'Descanso, sono e tempo pessoal.'
  },
  {
    time: 'Almoço (15-20 min)',
    Seg: 'Revisão rápida ou leitura de um artigo técnico.',
    Ter: 'Revisão rápida ou leitura de um artigo técnico.',
    Qua: 'Revisão rápida ou leitura de um artigo técnico.',
    Qui: 'Revisão rápida ou leitura de um artigo técnico.',
    Sex: 'Revisão rápida ou leitura de um artigo técnico.',
    Sab: 'Pausa para descanso.',
    Dom: 'Pausa para descanso.'
  },
  {
    time: '18:30-20:00',
    Seg: 'Ônibus de volta: conteúdo leve, podcasts ou leitura.',
    Ter: 'Ônibus de volta: conteúdo leve, podcasts ou leitura.',
    Qua: 'Ônibus de volta: conteúdo leve, podcasts ou leitura.',
    Qui: 'Ônibus de volta: conteúdo leve, podcasts ou leitura.',
    Sex: 'Ônibus de volta: conteúdo leve, podcasts ou leitura.',
    Sab: 'Descanso e recuperação.',
    Dom: 'Descanso e recuperação.'
  },
  {
    time: '20:00-20:40',
    Seg: 'Banho, jantar e descanso.',
    Ter: 'Banho, jantar e descanso.',
    Qua: 'Banho, jantar e descanso.',
    Qui: 'Banho, jantar e descanso.',
    Sex: 'Banho, jantar e descanso.',
    Sab: 'Banho, jantar e descanso.',
    Dom: 'Banho, jantar e descanso.'
  },
  {
    time: '20:40-21:40',
    Seg: 'Estudo profundo: apenas uma faculdade ou projeto.',
    Ter: 'Estudo profundo: apenas uma faculdade ou projeto.',
    Qua: 'Estudo profundo: apenas uma faculdade ou projeto.',
    Qui: 'Estudo profundo: apenas uma faculdade ou projeto.',
    Sex: 'Estudo profundo: apenas uma faculdade ou projeto.',
    Sab: 'Estudo profundo ou revisão semanal.',
    Dom: 'Organização e revisão leve.'
  },
  {
    time: '21:40-22:10',
    Seg: 'Exercícios práticos do conteúdo estudado.',
    Ter: 'Exercícios práticos do conteúdo estudado.',
    Qua: 'Exercícios práticos do conteúdo estudado.',
    Qui: 'Exercícios práticos do conteúdo estudado.',
    Sex: 'Exercícios práticos do conteúdo estudado.',
    Sab: 'Revisão leve e feedback.',
    Dom: 'Revisão leve e feedback.'
  },
  {
    time: '22:10-22:30',
    Seg: 'Organizar o dia seguinte e relaxar.',
    Ter: 'Organizar o dia seguinte e relaxar.',
    Qua: 'Organizar o dia seguinte e relaxar.',
    Qui: 'Organizar o dia seguinte e relaxar.',
    Sex: 'Organizar o dia seguinte e relaxar.',
    Sab: 'Organizar o dia seguinte e relaxar.',
    Dom: 'Organizar o dia seguinte e relaxar.'
  },
  {
    time: '22:30',
    Seg: 'Dormir.',
    Ter: 'Dormir.',
    Qua: 'Dormir.',
    Qui: 'Dormir.',
    Sex: 'Dormir.',
    Sab: 'Dormir.',
    Dom: 'Dormir.'
  }
];

export default function AgendaSemanal() {
  const [routine, setRoutine] = useLocalStorage('agendaSemanal', defaultRoutine);

  const updateCell = (rowIndex, day, value) => {
    setRoutine((prev) => prev.map((row, idx) => (idx === rowIndex ? { ...row, [day]: value } : row)));
  };

  const resetRoutine = () => setRoutine(defaultRoutine);

  const totalCells = useMemo(() => routine.length * days.length, [routine.length]);

  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-white/10 bg-surface p-6 shadow-[0_20px_60px_rgba(0,0,0,0.18)]">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Rotina Semanal</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">Planilha da semana</h2>
            <p className="mt-2 text-slate-400">Organize sua rotina como na planilha: trabalho longo, estudo leve à noite e recuperação no fim de semana.</p>
          </div>
          <button
            type="button"
            onClick={resetRoutine}
            className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-background transition hover:bg-blue-400"
          >
            Restaurar modelo
          </button>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl bg-[#111827] p-5">
            <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Como usar</p>
            <p className="mt-3 text-slate-300">Edite cada célula para ajustar à sua rotina real. O layout é igual à planilha que você me mostrou.</p>
          </div>
          <div className="rounded-3xl bg-[#111827] p-5">
            <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Resumo</p>
            <div className="mt-4 space-y-3">
              <div className="rounded-3xl bg-[#1F2937] p-4">
                <p className="text-sm text-slate-300">Entradas na rotina</p>
                <p className="mt-2 text-xl font-semibold text-white">{totalCells}</p>
              </div>
              <div className="rounded-3xl bg-[#1F2937] p-4">
                <p className="text-sm text-slate-300">Dias considerados</p>
                <p className="mt-2 text-xl font-semibold text-white">7 dias</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 overflow-auto rounded-3xl border border-white/10 bg-[#111827]">
          <table className="min-w-full divide-y divide-white/5 text-sm text-slate-200">
            <thead className="bg-[#0f172a] text-xs uppercase tracking-[0.18em] text-slate-400">
              <tr>
                <th className="whitespace-nowrap px-4 py-4 text-left">Horário</th>
                {days.map((day) => (
                  <th key={day} className="whitespace-nowrap px-4 py-4 text-left">{day}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {routine.map((row, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-white/5 transition-colors">
                  <td className="whitespace-nowrap px-4 py-4 font-medium text-white">{row.time}</td>
                  {days.map((day) => (
                    <td key={day} className="px-4 py-4 align-top">
                      <textarea
                        value={row[day]}
                        onChange={(event) => updateCell(rowIndex, day, event.target.value)}
                        className="min-h-[90px] w-full rounded-3xl border border-white/10 bg-[#0f172a] px-3 py-2 text-sm text-white outline-none resize-none"
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
