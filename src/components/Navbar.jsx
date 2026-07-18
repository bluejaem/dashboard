import { NavLink } from 'react-router-dom';

const links = [
  { href: '/', label: 'Dashboard' },
  { href: '/agenda-diaria', label: 'Agenda Diária' },
  { href: '/agenda-semanal', label: 'Agenda Semanal' },
  { href: '/cursos', label: 'Cursos' },
  { href: '/livros', label: 'Livros' },
  { href: '/github', label: 'GitHub' },
  { href: '/certificacoes', label: 'Certificações' },
  { href: '/metas', label: 'Metas' },
  { href: '/diario', label: 'Diário' },
  { href: '/carreira', label: 'Carreira' }
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 bg-background border-b border-white/10 backdrop-blur-xl">
      <div className="max-w-[1400px] mx-auto px-4 py-4 md:px-6 flex flex-col gap-4 md:gap-0 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.22em] text-slate-400">Produtividade Premium</p>
          <h1 className="text-2xl font-semibold mt-2">Dashboard de Estudo & Carreira</h1>
        </div>

        <nav className="flex flex-wrap gap-2 md:gap-3 items-center">
          {links.map((link) => (
            <NavLink
              key={link.href}
              to={link.href}
              className={({ isActive }) =>
                `rounded-full px-3 py-2 text-sm transition ${
                  isActive
                    ? 'bg-accent text-background font-semibold shadow-lg shadow-accent/20'
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
