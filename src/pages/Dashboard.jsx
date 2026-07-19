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
  userName: 'Seu nome',
  objective: 'Acompanhar estudos, projetos e metas',
  hoursStudied: 0,
  productivity: 0,
  studyProgress: 0,
  activeProjects: 0,
  balance: 0,
  weeklyProductivity: [0, 0, 0, 0, 0, 0, 0],
  studyHours: [0, 0, 0, 0, 0, 0, 0],
  goalProgress: [0, 0, 0, 0, 0, 0],
  weeklyChart: [0, 0, 0, 0, 0, 0, 0],
  monthlyChart: [0, 0, 0, 0, 0, 0],
  routineScore: 0
};

const weekLabels = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'];
const monthLabels = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'];

export default function Dashboard() {
  const [dashboard, setDashboard] = useLocalStorage('dashboardData', initialDashboard);
  const [tasks] = useLocalStorage('tasksData', []);
  const [goals] = useLocalStorage('metas', []);
  const [projects] = useLocalStorage('githubProjects', []);
  const [financeEntries] = useLocalStorage('financeEntries', []);
  const [schedule] = useLocalStorage('agendaDiaria', []);

  const summary = useMemo(() => {
    const pending = tasks.filter((task) => task.status === 'Pendente').length;
    const completed = tasks.filter((task) => task.status === 'Concluída').length;
    const appointments = schedule.filter((item) => item.time || item.task).length;
    const inProgressGoals = goals.filter((goal) => goal.status === 'Em andamento').length;
    return { pending, completed, appointments, inProgressGoals };
  }, [tasks, schedule, goals]);

  const financialBalance = useMemo(() => {
    return financeEntries.reduce((sum, entry) => {
      const amount = Number(entry.amount) || 0;
      return entry.type === 'Despesa' ? sum - amount : sum + amount;
    }, dashboard.balance);
  }, [financeEntries, dashboard.balance]);

  const averageGoalProgress = useMemo(() => {
    if (!goals.length) return dashboard.studyProgress;
    const total = goals.reduce((sum, goal) => sum + (Number(goal.percent) || 0), 0);
    return Math.round(total / goals.length);
  }, [goals, dashboard.studyProgress]);

  const weeklyProductivityData = {
    labels: weekLabels,
    datasets: [
      {
        label: 'Produtividade semanal',
        data: dashboard.weeklyProductivity,
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.18)',
        tension: 0.35,
        fill: true,
        pointRadius: 4,
        pointBackgroundColor: '#10B981'
      }
    ]
  };

  const studyHoursData = {
    labels: weekLabels,
    datasets: [
      {
        label: 'Horas de estudo',
        data: dashboard.studyHours,
        borderColor: '#3A9BDC',
        backgroundColor: 'rgba(58, 155, 220, 0.18)',
        tension: 0.35,
        fill: true,
        pointRadius: 4,
        pointBackgroundColor: '#3A9BDC'
      }
    ]
  };

  const goalsData = {
    labels: monthLabels,
    datasets: [
      {
        label: 'Progresso de metas',
        data: dashboard.goalProgress,
        backgroundColor: '#F59E0B',
        borderRadius: 10,
        barThickness: 22
      }
    ]
  };

  const updateValue = (key, value) => {
    setDashboard((prev) => ({
      ...prev,
      [key]: Number(value) || value
    }));
  };

  const updateChart = (key, index, value) => {
    setDashboard((prev) => ({
      ...prev,
      [key]: prev[key].map((item, idx) => (idx === index ? Number(value) || 0 : item))
    }));
  };

  return (
    <section className="space-y-6">
      <div className="grid gap-4 xl:grid-cols-[2fr_1fr]">
        <div className="rounded-3xl border border-white/10 bg-surface p-6 shadow-[0_20px_60px_rgba(0,0,0,0.18)]">
          <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Boas-vindas</p>
          <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-semibold text-white">Olá, {dashboard.userName}</h1>
              <p className="mt-2 text-slate-300">{dashboard.objective}</p>
            </div>
            <div className="space-y-3 rounded-3xl border border-white/10 bg-[#111827] p-4 text-slate-300">
              <label className="block">
                <span className="text-slate-400 text-xs uppercase tracking-[0.18em]">Nome</span>
                <input
                  value={dashboard.userName}
                  onChange={(event) => updateValue('userName', event.target.value)}
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-[#0f172a] px-3 py-2 text-white outline-none"
                />
              </label>
              <label className="block">
                <span className="text-slate-400 text-xs uppercase tracking-[0.18em]">Objetivo atual</span>
                <input
                  value={dashboard.objective}
                  onChange={(event) => updateValue('objective', event.target.value)}
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-[#0f172a] px-3 py-2 text-white outline-none"
                />
              </label>
            </div>
          </div>
        </div>

        <div className="grid gap-4">
          <Card title="Tarefas pendentes" value={summary.pending} badge="Resumo do dia" />
          <Card title="Tarefas concluídas" value={summary.completed} badge="Resumo do dia" />
          <Card title="Compromissos" value={summary.appointments} badge="Resumo do dia" />
          <Card title="Metas em andamento" value={summary.inProgressGoals} badge="Resumo do dia" />
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-4">
        <Card title="Foco do dia" value={`${dashboard.productivity}%`} progress={dashboard.productivity} subtext="Mantenha o ritmo" badge="Alta prioridade" />
        <Card title="Meta urgente" value={`${averageGoalProgress}%`} progress={averageGoalProgress} subtext="Progresso médio" badge="Estudos" />
        <Card title="Projetos ativos" value={projects.length} subtext={`${summary.pending} tarefas pendentes`} badge="Workflow" />
        <Card title="Saldo planejado" value={`R$ ${financialBalance.toFixed(2)}`} subtext="Fluxo disponível" badge="Financeiro" />
      </div>

      <div className="grid gap-4 xl:grid-cols-4">
        <Card title="Produtividade" value={`${dashboard.productivity}%`} progress={dashboard.productivity} subtext="Indicador de foco" />
        <Card title="Progresso dos estudos" value={`${dashboard.studyProgress}%`} progress={dashboard.studyProgress} subtext="Meta de estudo" />
        <Card title="Projetos ativos" value={projects.length} subtext="Itens em andamento" />
        <Card title="Saldo financeiro" value={`R$ ${financialBalance.toFixed(2)}`} subtext="Fluxo pessoal" />
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <div className="rounded-3xl border border-white/10 bg-surface p-6 shadow-[0_20px_60px_rgba(0,0,0,0.18)] xl:col-span-2">
          <div className="flex items-center justify-between gap-3 mb-6">
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Produtividade</p>
              <h2 className="mt-2 text-xl font-semibold text-white">Evolução semanal</h2>
            </div>
          </div>
          <Line
            data={weeklyProductivityData}
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
            {dashboard.weeklyProductivity.map((value, index) => (
              <label key={index} className="text-center text-xs text-slate-300">
                <span className="block mb-2">{weekLabels[index]}</span>
                <input
                  type="number"
                  value={value}
                  onChange={(event) => updateChart('weeklyProductivity', index, event.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-[#111827] px-2 py-1 text-white outline-none"
                />
              </label>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-surface p-6 shadow-[0_20px_60px_rgba(0,0,0,0.18)]">
          <div className="flex items-center justify-between gap-3 mb-6">
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Cronograma</p>
              <h2 className="mt-2 text-xl font-semibold text-white">Ritmo de estudos</h2>
            </div>
          </div>
          <Bar
            data={studyHoursData}
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
          <div className="mt-6 grid gap-3 sm:grid-cols-7">
            {dashboard.studyHours.map((value, index) => (
              <label key={index} className="text-center text-xs text-slate-300">
                <span className="block mb-2">{weekLabels[index]}</span>
                <input
                  type="number"
                  value={value}
                  onChange={(event) => updateChart('studyHours', index, event.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-[#111827] px-2 py-1 text-white outline-none"
                />
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-white/10 bg-surface p-6 shadow-[0_20px_60px_rgba(0,0,0,0.18)]">
        <div className="flex items-center justify-between gap-3 mb-6">
          <div>
            <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Metas</p>
            <h2 className="mt-2 text-xl font-semibold text-white">Progresso das metas</h2>
          </div>
        </div>
        <Bar
          data={goalsData}
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
          {dashboard.goalProgress.map((value, index) => (
            <label key={index} className="text-center text-xs text-slate-300">
              <span className="block mb-2">{monthLabels[index]}</span>
              <input
                type="number"
                value={value}
                onChange={(event) => updateChart('goalProgress', index, event.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-[#111827] px-2 py-1 text-white outline-none"
              />
            </label>
          ))}
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1fr_300px]">
        <div className="rounded-3xl border border-white/10 bg-surface p-6 shadow-[0_20px_60px_rgba(0,0,0,0.18)]">
          <div className="flex items-center justify-between gap-3 mb-6">
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Resumo rápido</p>
              <h2 className="mt-2 text-xl font-semibold text-white">Análise da semana</h2>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl bg-[#111827] p-4 text-slate-300">
              <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Produtividade média</p>
              <p className="mt-3 text-3xl font-semibold text-white">{dashboard.productivity}%</p>
            </div>
            <div className="rounded-3xl bg-[#111827] p-4 text-slate-300">
              <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Meta de estudos</p>
              <p className="mt-3 text-3xl font-semibold text-white">{averageGoalProgress}%</p>
            </div>
          </div>
          <div className="mt-4 rounded-3xl bg-[#111827] p-4 text-slate-300">
            <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Projetos em progresso</p>
            <p className="mt-3 text-3xl font-semibold text-white">{projects.length}</p>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-[#111827] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.18)]">
          <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Progresso de metas</p>
          <div className="mt-5 h-4 w-full overflow-hidden rounded-full bg-white/5">
            <div className="h-full rounded-full bg-accent transition-all duration-700" style={{ width: `${averageGoalProgress}%` }} />
          </div>
          <p className="mt-3 text-sm text-slate-300">Média de progresso em todas as metas cadastradas.</p>
        </div>
      </div>
    </section>
  );
}
