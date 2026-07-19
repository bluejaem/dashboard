import { NavLink } from 'react-router-dom';

const links = [
  { href: '/', label: 'Dashboard', icon: '🏠' },
  { href: '/tarefas', label: 'Tarefas', icon: '📝' },
  { href: '/agenda-diaria', label: 'Agenda Diária', icon: '📅' },
  { href: '/agenda-semanal', label: 'Agenda Semanal', icon: '🗓️' },
  { href: '/cursos', label: 'Estudos', icon: '🎓' },
  { href: '/projetos', label: 'Projetos', icon: '🚀' },
  { href: '/financeiro', label: 'Financeiro', icon: '💰' },
  { href: '/carreira', label: 'Carreira', icon: '📈' },
  { href: '/conhecimento', label: 'Conhecimento', icon: '📚' },
  { href: '/perfil', label: 'Perfil', icon: '👤' },
  { href: '/certificacoes', label: 'Certificações', icon: '🏅' },
  { href: '/metas', label: 'Metas', icon: '🎯' },
  { href: '/diario', label: 'Diário', icon: '🪶' }
];

export default function Navbar({ theme, toggleTheme }) {
  return (
    <aside className="border-b border-white/10 bg-theme-surface text-theme-text md:border-r md:min-h-screen md:w-72 md:overflow-y-auto md:px-6 md:py-8 scrollbar-thin">
      <div className="max-w-[1400px] mx-auto px-4 py-5 md:px-0 md:py-0">
        <div className="flex items-center justify-between gap-3 md:block">
          <div>
            <p className="text-sm uppercase tracking-[0.22em] text-theme-muted">Central de controle</p>
            <h1 className="mt-2 text-2xl font-semibold">Dashboard Pessoal</h1>
          </div>
          <button
            type="button"
            onClick={toggleTheme}
            className="hidden rounded-full bg-white/5 px-4 py-2 text-sm font-semibold text-theme-text transition hover:bg-white/10 md:inline-flex"
          >
            {theme === 'dark' ? '🌞 Claro' : '🌙 Escuro'}
          </button>
        </div>

        <nav className="mt-6 flex flex-wrap gap-2 md:block md:space-y-3" aria-label="Navegação principal">
          {links.map((link) => (
            <NavLink
              key={link.href}
              to={link.href}
              className={({ isActive }) =>
                `rounded-2xl px-3 py-2 text-sm transition w-full text-left flex items-center gap-3 ${
                  isActive
                    ? 'bg-accent text-background font-semibold shadow-lg shadow-accent/20'
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              <span>{link.icon}</span>
              <span>{link.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
}
