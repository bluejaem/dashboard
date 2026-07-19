import { NavLink } from 'react-router-dom';

const links = [
  { href: '/', label: 'Dashboard' },
  { href: '/agenda-diaria', label: 'Agenda Diária' },
  { href: '/agenda-semanal', label: 'Agenda Semanal' },
  { href: '/cursos', label: 'Eng. Computação' },
  { href: '/cursos', label: 'ADS' },
  { href: '/cursos', label: 'GTI' },
  { href: '/livros', label: 'Livros' },
  { href: '/certificacoes', label: 'Certificações' },
  { href: '/metas', label: 'Metas' },
  { href: '/diario', label: 'Diário' }
];

export default function Navbar({ theme, toggleTheme, user, signOutUser }) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-theme-surface/95 backdrop-blur-xl shadow-[0_25px_60px_rgba(0,0,0,0.14)]">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-3 px-4 py-4 text-theme-text md:px-8 lg:px-10">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="rounded-3xl border border-white/10 bg-[#0f172a] px-4 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-white shadow-[0_10px_30px_rgba(14,165,233,0.12)]">
              DASHBOARD
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.22em] text-slate-400">Painel pessoal</p>
              <h1 className="text-xl font-semibold text-white sm:text-2xl">Visão geral e rotina</h1>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={toggleTheme}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-theme-text transition hover:bg-white/10"
            >
              {theme === 'dark' ? '🌞 Claro' : '🌙 Escuro'}
            </button>
            {user && (
              <button
                type="button"
                onClick={signOutUser}
                className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-background transition hover:bg-blue-400"
              >
                Sair
              </button>
            )}
          </div>
        </div>

        <div className="overflow-x-auto">
          <nav className="flex gap-3 whitespace-nowrap py-1">
            {links.map((link) => (
              <NavLink
                key={`${link.href}-${link.label}`}
                to={link.href}
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 text-sm font-medium transition ${
                    isActive ? 'bg-accent text-background shadow-lg shadow-accent/20' : 'text-slate-300 hover:bg-white/5 hover:text-white'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
