import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-white/10 bg-surface p-6 shadow-[0_20px_60px_rgba(0,0,0,0.18)] text-center">
        <p className="text-sm uppercase tracking-[0.18em] text-slate-400">404</p>
        <h1 className="mt-4 text-3xl font-semibold text-white">Página não encontrada</h1>
        <p className="mt-3 text-slate-300">A rota que você tentou acessar não existe. Volte para o painel principal e continue sua jornada.</p>
        <Link to="/" className="mt-6 inline-flex rounded-full bg-accent px-6 py-3 text-sm font-semibold text-background transition hover:bg-blue-400">
          Voltar para o Dashboard
        </Link>
      </div>
    </section>
  );
}
