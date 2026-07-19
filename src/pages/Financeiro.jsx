import { useMemo, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from 'chart.js';
import { useLocalStorage } from '../hooks/useLocalStorage';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const categories = ['Salário', 'Comissão', 'Vendas', 'Outros', 'Faculdade', 'Alimentação', 'Transporte', 'Assinaturas', 'Compras'];
const types = ['Entrada', 'Despesa'];

const blankEntry = {
  type: 'Entrada',
  category: 'Salário',
  amount: 0,
  date: '',
  description: ''
};

export default function Financeiro() {
  const [entries, setEntries] = useLocalStorage('financeEntries', []);
  const [monthFilter, setMonthFilter] = useState('Todos');

  const addEntry = () => setEntries((prev) => [...prev, { ...blankEntry }]);
  const updateEntry = (index, key, value) => {
    setEntries((prev) => prev.map((entry, idx) => (idx === index ? { ...entry, [key]: key === 'amount' ? Number(value) : value } : entry)));
  };
  const removeEntry = (index) => setEntries((prev) => prev.filter((_, idx) => idx !== index));

  const filteredEntries = useMemo(() => {
    if (monthFilter === 'Todos') return entries;
    return entries.filter((entry) => entry.date.startsWith(monthFilter));
  }, [entries, monthFilter]);

  const totals = useMemo(() => {
    const receita = filteredEntries.filter((entry) => entry.type === 'Entrada').reduce((sum, entry) => sum + entry.amount, 0);
    const despesa = filteredEntries.filter((entry) => entry.type === 'Despesa').reduce((sum, entry) => sum + entry.amount, 0);
    return { receita, despesa, saldo: receita - despesa };
  }, [filteredEntries]);

  const chartData = useMemo(() => {
    const grouped = {};
    filteredEntries.forEach((entry) => {
      if (!grouped[entry.category]) grouped[entry.category] = 0;
      grouped[entry.category] += entry.type === 'Entrada' ? entry.amount : -entry.amount;
    });
    return {
      labels: Object.keys(grouped),
      datasets: [
        {
          label: 'Fluxo por categoria',
          data: Object.values(grouped),
          backgroundColor: Object.keys(grouped).map((_, idx) => ['#3A9BDC', '#22C55E', '#F59E0B', '#F97316'][idx % 4])
        }
      ]
    };
  }, [filteredEntries]);

  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-white/10 bg-surface p-6 shadow-[0_20px_60px_rgba(0,0,0,0.18)]">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Controle financeiro</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">Entradas, saídas e saldo</h2>
          </div>
          <button type="button" onClick={addEntry} className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-background transition hover:bg-blue-400">
            Novo lançamento
          </button>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-3xl bg-[#111827] p-5 text-slate-300">
            <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Saldo atual</p>
            <p className="mt-3 text-3xl font-semibold text-white">R$ {totals.saldo.toFixed(2)}</p>
          </div>
          <div className="rounded-3xl bg-[#111827] p-5 text-slate-300">
            <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Receitas</p>
            <p className="mt-3 text-3xl font-semibold text-white">R$ {totals.receita.toFixed(2)}</p>
          </div>
          <div className="rounded-3xl bg-[#111827] p-5 text-slate-300">
            <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Despesas</p>
            <p className="mt-3 text-3xl font-semibold text-white">R$ {totals.despesa.toFixed(2)}</p>
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <select value={monthFilter} onChange={(event) => setMonthFilter(event.target.value)} className="rounded-3xl bg-[#111827] px-4 py-3 text-slate-200 outline-none border border-white/10">
            <option value="Todos">Todos os meses</option>
            <option value="2026-01">Jan 2026</option>
            <option value="2026-02">Fev 2026</option>
            <option value="2026-03">Mar 2026</option>
            <option value="2026-04">Abr 2026</option>
            <option value="2026-05">Mai 2026</option>
            <option value="2026-06">Jun 2026</option>
            <option value="2026-07">Jul 2026</option>
          </select>
          <p className="rounded-3xl bg-[#111827] px-4 py-3 text-slate-300">Registros: {filteredEntries.length}</p>
        </div>

        <div className="mt-6 rounded-3xl border border-white/10 bg-[#111827] p-5">
          <Bar
            data={chartData}
            options={{
              responsive: true,
              plugins: {
                legend: { display: false },
                tooltip: { backgroundColor: '#111827', titleColor: '#fff', bodyColor: '#e5e7eb' }
              },
              scales: {
                x: { ticks: { color: '#cbd5e1' }, grid: { display: false } },
                y: { ticks: { color: '#cbd5e1' }, grid: { color: 'rgba(255,255,255,0.06)' } }
              }
            }}
          />
        </div>

        <div className="mt-6 space-y-4">
          {filteredEntries.length === 0 ? (
            <div className="rounded-3xl border border-white/10 bg-[#111827] p-6 text-slate-300">
              Nenhum lançamento financeiro registrado. Adicione entradas e despesas para começar a controlar seu fluxo.
            </div>
          ) : (
            filteredEntries.map((entry, index) => (
              <div key={`${entry.description}-${index}`} className="rounded-3xl border border-white/10 bg-[#111827] p-5 shadow-[0_12px_30px_rgba(0,0,0,0.18)]">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.18em] text-slate-400">{entry.type}</p>
                    <p className="mt-2 text-lg font-semibold text-white">{entry.category}</p>
                    <p className="mt-2 text-sm text-slate-300">{entry.description || 'Sem descrição'}</p>
                  </div>
                  <button type="button" onClick={() => removeEntry(index)} className="rounded-full bg-white/10 px-4 py-2 text-sm uppercase tracking-[0.16em] text-slate-200 transition hover:bg-white/20">
                    Excluir
                  </button>
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  <select value={entry.type} onChange={(event) => updateEntry(index, 'type', event.target.value)} className="rounded-3xl bg-black/20 px-4 py-3 text-slate-200 outline-none border border-white/10">
                    {types.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  <input type="number" value={entry.amount} onChange={(event) => updateEntry(index, 'amount', event.target.value)} placeholder="Valor" className="rounded-3xl bg-black/20 px-4 py-3 text-slate-200 outline-none border border-white/10" />
                  <input type="date" value={entry.date} onChange={(event) => updateEntry(index, 'date', event.target.value)} className="rounded-3xl bg-black/20 px-4 py-3 text-slate-200 outline-none border border-white/10" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
