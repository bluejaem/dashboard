import { useMemo } from 'react';
import Card from '../components/Card';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { useLocalStorage } from '../hooks/useLocalStorage';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Tooltip, Legend, Filler);

const initialDashboard = {
  hoursStudied: 0,
  weeklyGoal: 20,
  booksRead: 0,
  githubProjects: 0,
  certificationsCompleted: 0,
  streakDays: 0,
  weeklyChart: [0, 0, 0, 0, 0, 0, 0],
  monthlyChart: [0, 0, 0, 0, 0, 0],
  routineScore: 0
};

const monthLabels = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'];
const weekLabels = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'];

export default function Dashboard() {
  const [dashboard, setDashboard] = useLocalStorage('dashboardData', initialDashboard);

  const progressPercent = useMemo(() => {
    if (!dashboard.weeklyGoal) return 0;
    return Math.min(100, Math.round((dashboard.hoursStudied / dashboard.weeklyGoal) * 100));
  }, [dashboard.hoursStudied, dashboard.weeklyGoal]);

  const weeklyData = {
    labels: weekLabels,
    datasets: [
      {
        label: 'Horas estudadas',
        data: dashboard.weeklyChart,
        borderColor: '#3A9BDC',
        backgroundColor: 'rgba(58, 155, 220, 0.18)',
        tension: 0.35,
        fill: true,
        pointRadius: 4,
        pointBackgroundColor: '#3A9BDC'
      }
    ]
  };

  const monthlyData = {
    labels: monthLabels,
    datasets: [
      {
        label: 'Horas totais por mês',
        data: dashboard.monthlyChart,
        backgroundColor: '#3A9BDC',
        borderRadius: 10,
        barThickness: 22
      }
    ]
  };

  const updateValue = (key, value) => {
    setDashboard((prev) => ({
      ...prev,
      [key]: Number(value) || 0
    }));
  };

  const updateArray = (key, index, value) => {
    setDashboard((prev) => ({
      ...prev,
      [key]: prev[key].map((item, idx) => (idx === index ? Number(value) || 0 : item))
    }));
  };

  return (
    <section className="space-y-6">
      <div className="grid gap-4 xl:grid-cols-[repeat(3,minmax(0,1fr))] lg:grid-cols-2">
        <Card title="Horas Estudadas" value={`${dashboard.hoursStudied}h`} progress={progressPercent} subtext="Total acumulado no mês" badge="Semanal">
          <div className="mt-4 space-y-3 text-sm text-slate-300">
            <label className="block">
              <span className="text-slate-400">Horas estudadas</span>
              <input
                type="number"
                value={dashboard.hoursStudied}
                onChange={(event) => updateValue('hoursStudied', event.target.value)}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-[#111827] px-3 py-2 text-white outline-none focus:border-accent"
              />
            </label>
            <label className="block">
              <span className="text-slate-400">Meta semanal</span>
              <input
                type="number"
                value={dashboard.weeklyGoal}
                onChange={(event) => updateValue('weeklyGoal', event.target.value)}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-[#111827] px-3 py-2 text-white outline-none focus:border-accent"
              />
            </label>
          </div>
        </Card>

        <Card title="Livros Lidos" value={`${dashboard.booksRead}/12`} progress={dashboard.booksRead ? Math.min(100, Math.round((dashboard.booksRead / 12) * 100)) : 0} subtext="Avanço do plano de leitura">
          <label className="block text-sm text-slate-300">
            <span className="text-slate-400">Livros lidos</span>
            <input
              type="number"
              value={dashboard.booksRead}
              onChange={(event) => updateValue('booksRead', event.target.value)}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-[#111827] px-3 py-2 text-white outline-none focus:border-accent"
            />
          </label>
        </Card>

        <Card title="Projetos GitHub" value={`${dashboard.githubProjects}/50`} progress={dashboard.githubProjects ? Math.min(100, Math.round((dashboard.githubProjects / 50) * 100)) : 0} subtext="Repositórios ativos e em desenvolvimento">
          <label className="block text-sm text-slate-300">
            <span className="text-slate-400">Projetos concluídos</span>
            <input
              type="number"
              value={dashboard.githubProjects}
              onChange={(event) => updateValue('githubProjects', event.target.value)}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-[#111827] px-3 py-2 text-white outline-none focus:border-accent"
            />
          </label>
        </Card>

        <Card title="Certificações" value={`${dashboard.certificationsCompleted} Concluídas`} subtext="Foco em formação continuada">
          <label className="block text-sm text-slate-300">
            <span className="text-slate-400">Certificações concluídas</span>
            <input
              type="number"
              value={dashboard.certificationsCompleted}
              onChange={(event) => updateValue('certificationsCompleted', event.target.value)}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-[#111827] px-3 py-2 text-white outline-none focus:border-accent"
            />
          </label>
        </Card>

        <Card title="Dias Seguidos" value={`${dashboard.streakDays} Dias`} progress={Math.min(100, dashboard.streakDays)} subtext="Consistência de estudo e entregas">
          <label className="block text-sm text-slate-300">
            <span className="text-slate-400">Dias seguidos</span>
            <input
              type="number"
              value={dashboard.streakDays}
              onChange={(event) => updateValue('streakDays', event.target.value)}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-[#111827] px-3 py-2 text-white outline-none focus:border-accent"
            />
          </label>
        </Card>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-surface p-6 shadow-[0_20px_60px_rgba(0,0,0,0.18)]">
          <div className="flex items-center justify-between gap-3 mb-6">
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Visão semanal</p>
              <h2 className="mt-2 text-xl font-semibold text-white">Atividade de estudo</h2>
            </div>
            <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-300">Última semana</span>
          </div>
          <Line
            data={weeklyData}
            options={{
              responsive: true,
              plugins: {
                legend: { display: false },
                tooltip: { backgroundColor: '#111827', titleColor: '#fff', bodyColor: '#e5e7eb' }
              },
              scales: {
                x: { grid: { color: 'rgba(255,255,255,0.06)' }, ticks: { color: '#cbd5e1' } },
                y: { grid: { color: 'rgba(255,255,255,0.06)' }, ticks: { color: '#cbd5e1' } }
              }
            }}
          />
          <div className="mt-6 grid gap-3 sm:grid-cols-7">
            {dashboard.weeklyChart.map((value, index) => (
              <label key={index} className="text-center text-xs text-slate-300">
                <span className="block mb-2">{weekLabels[index]}</span>
                <input
                  type="number"
                  value={value}
                  onChange={(event) => updateArray('weeklyChart', index, event.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-[#111827] px-2 py-1 text-white outline-none"
                />
              </label>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-surface p-6 shadow-[0_20px_60px_rgba(0,0,0,0.18)]">
          <div className="flex items-center justify-between gap-3 mb-6">
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Visão mensal</p>
              <h2 className="mt-2 text-xl font-semibold text-white">Ritmo de progresso</h2>
            </div>
            <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-300">Últimos 6 meses</span>
          </div>
          <Bar
            data={monthlyData}
            options={{
              responsive: true,
              plugins: {
                legend: { display: false },
                tooltip: { backgroundColor: '#111827', titleColor: '#fff', bodyColor: '#e5e7eb' }
              },
              scales: {
                x: { grid: { display: false }, ticks: { color: '#cbd5e1' } },
                y: { grid: { color: 'rgba(255,255,255,0.06)' }, ticks: { color: '#cbd5e1' } }
              }
            }}
          />
          <div className="mt-6 grid gap-3 sm:grid-cols-6">
            {dashboard.monthlyChart.map((value, index) => (
              <label key={index} className="text-center text-xs text-slate-300">
                <span className="block mb-2">{monthLabels[index]}</span>
                <input
                  type="number"
                  value={value}
                  onChange={(event) => updateArray('monthlyChart', index, event.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-[#111827] px-2 py-1 text-white outline-none"
                />
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-white/10 bg-surface p-6 shadow-[0_20px_60px_rgba(0,0,0,0.18)]">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Progresso geral</p>
            <h2 className="mt-2 text-xl font-semibold text-white">Jornada de produtividade</h2>
          </div>
          <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-300">Meta 100%</span>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-[1fr_120px]">
          <div className="space-y-4">
            <div className="rounded-3xl bg-[#111827] p-4">
              <p className="text-sm text-slate-300">Saúde da rotina</p>
              <input
                type="number"
                value={dashboard.routineScore}
                min={0}
                max={100}
                onChange={(event) => updateValue('routineScore', event.target.value)}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-[#0f172a] px-3 py-2 text-white outline-none focus:border-accent"
              />
            </div>
            <div className="rounded-3xl bg-[#111827] p-4">
              <p className="text-sm text-slate-300">Progresso geral</p>
              <p className="mt-2 text-3xl font-semibold text-white">{dashboard.routineScore}%</p>
            </div>
          </div>
          <div className="rounded-3xl bg-[#111827] p-5">
            <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Consistência</p>
            <div className="mt-4 h-4 w-full overflow-hidden rounded-full bg-white/5">
              <div className="h-full rounded-full bg-accent transition-all duration-700" style={{ width: `${dashboard.routineScore}%` }} />
            </div>
            <p className="mt-3 text-sm text-slate-300">Atualize seu score e acompanhe o progresso.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
