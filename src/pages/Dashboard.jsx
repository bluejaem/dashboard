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
  weeklyProductivity: [2, 3, 4, 3, 5, 4, 5],
  studyHours: [2, 2, 3, 4, 3, 1, 2],
  goalProgress: [60, 75, 90, 55, 70, 85],
  routineScore: 72
};

const weekLabels = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'];
const monthLabels = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'];

export default function Dashboard() {
  const [dashboard] = useLocalStorage('dashboardData', initialDashboard);
  const [tasks] = useLocalStorage('tasksData', []);
  const [goals] = useLocalStorage('metas', []);
  const [projects] = useLocalStorage('githubProjects', []);
  const [financeEntries] = useLocalStorage('financeEntries', []);
  const safeDashboard = {
    ...initialDashboard,
    ...dashboard,
    weeklyProductivity: dashboard?.weeklyProductivity ?? initialDashboard.weeklyProductivity,
    studyHours: dashboard?.studyHours ?? initialDashboard.studyHours,
    goalProgress: dashboard?.goalProgress ?? initialDashboard.goalProgress
  };
  const [schedule] = useLocalStorage('agendaDiaria', []);
  const [books] = useLocalStorage('livros', []);
  const [certifications] = useLocalStorage('certifications', []);

  const totalStudyHours = safeDashboard.studyHours.reduce((sum, value) => sum + Number(value || 0), 0);
  const completedBooks = books.filter((book) => Number(book.percent) >= 100).length;
  const totalBooks = Math.max(books.length, 12);
  const projectGoal = 50;
  const completedCertifications = certifications.filter(
    (item) => item?.status === 'Concluída' || item?.status === 'Finalizado' || item?.completed
  ).length;
  const todayLabel = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'short'
  });

  const upcomingSchedule = schedule.filter((item) => item.task || item.title || item.date || item.time).slice(0, 3);
  const todayAgenda = schedule.filter((item) => item.time || item.date || item.task || item.title).slice(0, 4);
  const nextTask = tasks.find((task) => task.status !== 'Concluída')?.title || schedule[0]?.task || schedule[0]?.title || 'Nenhuma tarefa agendada';

  const summary = useMemo(() => {
    const pending = tasks.filter((task) => task.status === 'Pendente').length;
    const completed = tasks.filter((task) => task.status === 'Concluída').length;
    const appointments = schedule.filter((item) => item.time || item.task || item.title).length;
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
        data: safeDashboard.weeklyProductivity,
        borderColor: '#60A5FA',
        backgroundColor: 'rgba(96, 165, 250, 0.16)',
        tension: 0.35,
        fill: true,
        pointRadius: 4,
        pointBackgroundColor: '#60A5FA'
      }
    ]
  };

  const studyHoursData = {
    labels: weekLabels,
    datasets: [
      {
        label: 'Horas de estudo',
        data: safeDashboard.studyHours,
        borderColor: '#38BDF8',
        backgroundColor: 'rgba(56, 189, 248, 0.18)',
        tension: 0.35,
        fill: true,
        pointRadius: 4,
        pointBackgroundColor: '#38BDF8'
      }
    ]
  };

  return (
    <section className="space-y-6 pb-6">
      <div className="rounded-[2rem] border border-white/10 bg-theme-surface p-8 shadow-[0_30px_90px_rgba(0,0,0,0.23)] backdrop-blur-xl">
        <div className="flex flex-col gap-8 xl:flex-row xl:items-center xl:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Painel principal</p>
            <h1 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">Olá, {dashboard.userName}</h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">{dashboard.objective}. Acompanhe sua rotina, seus estudos e seus resultados com clareza.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
            <div className="rounded-3xl bg-[#0f172a]/90 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.18)]">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Data</p>
              <p className="mt-3 text-2xl font-semibold text-white">{todayLabel}</p>
            </div>
            <div className="rounded-3xl bg-[#0f172a]/90 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.18)]">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Próxima tarefa</p>
              <p className="mt-3 text-2xl font-semibold text-white">{nextTask}</p>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-6">
          <Card title="Horas Estudadas" value={`${totalStudyHours}h`} subtext="Esta semana" />
          <Card title="Meta Semanal" value={`${dashboard.studyProgress}%`} subtext="Avanço" progress={dashboard.studyProgress} />
          <Card title="Livros Lidos" value={`${completedBooks} / ${totalBooks}`} subtext="Conteúdo" />
          <Card title="Projetos" value={`${projects.length}`} subtext="Ativos" />
          <Card title="Certificações" value={`${completedCertifications}`} subtext="Concluídas" />
          <div className="rounded-[2rem] border border-white/10 bg-[#111827]/90 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.18)]">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Saldo</p>
            <p className="mt-3 text-3xl font-semibold text-white">R$ {financialBalance.toFixed(2)}</p>
            <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-white/5">
              <div className="h-full rounded-full bg-accent" style={{ width: `${Math.min(Math.max(dashboard.balance, 0), 100)}%` }} />
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.55fr_1fr]">
        <div className="grid gap-4">
          <div className="rounded-[2rem] border border-white/10 bg-theme-surface p-6 shadow-[0_30px_80px_rgba(0,0,0,0.22)]">
            <div className="flex items-center justify-between gap-4 mb-6">
              <div>
                <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Próximos compromissos</p>
                <h2 className="mt-2 text-2xl font-semibold text-white">Agenda de hoje</h2>
              </div>
              <span className="rounded-full bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.18em] text-slate-300">{upcomingSchedule.length} itens</span>
            </div>
            <div className="space-y-4">
              {upcomingSchedule.length ? (
                upcomingSchedule.map((item, index) => (
                  <div key={index} className="rounded-3xl border border-white/10 bg-[#111827]/80 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-semibold text-white">{item.task || item.title || 'Sem título'}</p>
                      <span className="text-xs uppercase tracking-[0.16em] text-slate-400">{item.time || item.date || 'Sem horário'}</span>
                    </div>
                    {item.description && <p className="mt-2 text-sm text-slate-400">{item.description}</p>}
                  </div>
                ))
              ) : (
                <div className="rounded-3xl border border-white/10 bg-[#111827]/80 p-4 text-sm text-slate-400">Nenhum compromisso registrado ainda.</div>
              )}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-theme-surface p-6 shadow-[0_30px_80px_rgba(0,0,0,0.22)]">
            <div className="flex items-center justify-between gap-4 mb-6">
              <div>
                <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Agenda de hoje</p>
                <h2 className="mt-2 text-2xl font-semibold text-white">Próximos passos</h2>
              </div>
              <span className="rounded-full bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.18em] text-slate-300">{todayAgenda.length} itens</span>
            </div>
            <div className="space-y-4">
              {todayAgenda.length ? (
                todayAgenda.map((item, index) => (
                  <div key={index} className="rounded-3xl border border-white/10 bg-[#111827]/80 p-4">
                    <div className="flex items-center justify-between gap-3 text-sm text-slate-300">
                      <span>{item.time || item.date || 'Sem horário'}</span>
                      <span className="font-semibold text-white">{item.task || item.title || 'Sem nome'}</span>
                    </div>
                    {item.description && <p className="mt-2 text-xs text-slate-500">{item.description}</p>}
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-400">Nenhuma atividade para hoje.</p>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-[2rem] border border-white/10 bg-theme-surface p-6 shadow-[0_30px_80px_rgba(0,0,0,0.22)]">
            <div className="flex items-center justify-between gap-3 mb-4">
              <div>
                <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Produtividade</p>
                <h2 className="mt-2 text-xl font-semibold text-white">Evolução semanal</h2>
              </div>
              <span className="rounded-full bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.18em] text-slate-300">Tendência</span>
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
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-theme-surface p-6 shadow-[0_30px_80px_rgba(0,0,0,0.22)]">
            <div className="flex items-center justify-between gap-3 mb-4">
              <div>
                <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Horas</p>
                <h2 className="mt-2 text-xl font-semibold text-white">Ritmo de estudos</h2>
              </div>
              <span className="rounded-full bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.18em] text-slate-300">Semana</span>
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
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-[#111827]/90 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.22)]">
            <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Progresso</p>
            <h2 className="mt-2 text-xl font-semibold text-white">Meta consolidada</h2>
            <div className="mt-5 h-4 w-full overflow-hidden rounded-full bg-white/5">
              <div className="h-full rounded-full bg-accent transition-all duration-700" style={{ width: `${averageGoalProgress}%` }} />
            </div>
            <p className="mt-3 text-sm text-slate-300">Média de desempenho de todas as metas cadastradas.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
