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

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Tooltip, Legend, Filler);

const weeklyData = {
  labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'],
  datasets: [
    {
      label: 'Horas estudadas',
      data: [2, 3.5, 1.5, 4, 3, 5, 4],
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
  labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
  datasets: [
    {
      label: 'Horas totais por mês',
      data: [78, 92, 110, 130, 122, 140],
      backgroundColor: '#3A9BDC',
      borderRadius: 10,
      barThickness: 22
    }
  ]
};

export default function Dashboard() {
  return (
    <section className="space-y-6">
      <div className="grid gap-4 xl:grid-cols-[repeat(3,minmax(0,1fr))] lg:grid-cols-2">
        <Card title="Horas Estudadas" value="140h" progress={84} subtext="Total acumulado no mês" badge="Semanal" />
        <Card title="Meta Semanal" value="18h" progress={72} subtext="Trabalho contínuo no plano de estudo" badge="Meta" />
        <Card title="Livros Lidos" value="5/12" progress={42} subtext="Avanço do plano de leitura" />
        <Card title="Projetos GitHub" value="18/50" progress={36} subtext="Repositórios ativos e em desenvolvimento" />
        <Card title="Certificações" value="3 Concluídas" subtext="Foco em formação continuada" />
        <Card title="Dias Seguidos" value="12 Dias" progress={65} subtext="Consistência de estudo e entregas" />
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
          <Line data={weeklyData} options={{
            responsive: true,
            plugins: {
              legend: { display: false },
              tooltip: { backgroundColor: '#111827', titleColor: '#fff', bodyColor: '#e5e7eb' }
            },
            scales: {
              x: { grid: { color: 'rgba(255,255,255,0.06)' }, ticks: { color: '#cbd5e1' } },
              y: { grid: { color: 'rgba(255,255,255,0.06)' }, ticks: { color: '#cbd5e1' } }
            }
          }} />
        </div>

        <div className="rounded-3xl border border-white/10 bg-surface p-6 shadow-[0_20px_60px_rgba(0,0,0,0.18)]">
          <div className="flex items-center justify-between gap-3 mb-6">
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Visão mensal</p>
              <h2 className="mt-2 text-xl font-semibold text-white">Ritmo de progresso</h2>
            </div>
            <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-300">Últimos 6 meses</span>
          </div>
          <Bar data={monthlyData} options={{
            responsive: true,
            plugins: {
              legend: { display: false },
              tooltip: { backgroundColor: '#111827', titleColor: '#fff', bodyColor: '#e5e7eb' }
            },
            scales: {
              x: { grid: { display: false }, ticks: { color: '#cbd5e1' } },
              y: { grid: { color: 'rgba(255,255,255,0.06)' }, ticks: { color: '#cbd5e1' } }
            }
          }} />
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
              <p className="text-sm text-slate-300">Horas dedicadas</p>
              <p className="mt-2 text-3xl font-semibold text-white">168h</p>
            </div>
            <div className="rounded-3xl bg-[#111827] p-4">
              <p className="text-sm text-slate-300">Tarefas concluídas</p>
              <p className="mt-2 text-3xl font-semibold text-white">72%</p>
            </div>
          </div>
          <div className="rounded-3xl bg-[#111827] p-5">
            <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Saúde da rotina</p>
            <div className="mt-4 h-4 w-full overflow-hidden rounded-full bg-white/5">
              <div className="h-full rounded-full bg-accent transition-all duration-700 ease-out" style={{ width: '78%' }} />
            </div>
            <p className="mt-3 text-sm text-slate-300">72% de consistência em 21 dias</p>
          </div>
        </div>
      </div>
    </section>
  );
}
