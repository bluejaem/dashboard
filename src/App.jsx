import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Tarefas from './pages/Tarefas';
import AgendaDiaria from './pages/AgendaDiaria';
import AgendaSemanal from './pages/AgendaSemanal';
import Cursos from './pages/Cursos';
import Livros from './pages/Livros';
import Projetos from './pages/Projetos';
import Financeiro from './pages/Financeiro';
import Certificacoes from './pages/Certificacoes';
import Metas from './pages/Metas';
import Diario from './pages/Diario';
import Perfil from './pages/Perfil';
import Conhecimento from './pages/Conhecimento';
import NotFound from './pages/NotFound';
import { useAuth } from './hooks/useAuth';

function App() {
  const [theme, setTheme] = useState('dark');
  const { user, authLoading, signIn, signOutUser, isFirebaseConfigured } = useAuth();

  useEffect(() => {
    const storedTheme = window.localStorage.getItem('themePreference');
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    setTheme(storedTheme || systemTheme);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem('themePreference', theme);
  }, [theme]);

  const toggleTheme = () => setTheme((current) => (current === 'dark' ? 'light' : 'dark'));

  const needsLogin = isFirebaseConfigured && !user;

  return (
    <div className="min-h-screen bg-theme-background text-theme-text transition-colors duration-300">
      <Router basename={process.env.PUBLIC_URL}>
        <div className="max-w-[1400px] mx-auto grid min-h-screen md:grid-cols-[280px_minmax(0,1fr)]">
          <Navbar theme={theme} toggleTheme={toggleTheme} user={user} signIn={signIn} signOutUser={signOutUser} />
          <main className="px-4 py-6 md:px-6">
            <div className="page-fade">
              {authLoading ? (
                <div className="rounded-3xl border border-white/10 bg-surface p-6 text-slate-300">Carregando autenticação...</div>
              ) : needsLogin ? (
                <section className="rounded-3xl border border-white/10 bg-surface p-8 text-center text-slate-200">
                  <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Acesso remoto</p>
                  <h2 className="mt-4 text-2xl font-semibold text-white">Faça login para sincronizar seus dados</h2>
                  <p className="mt-2 text-slate-400">Use sua conta Google para acessar os mesmos dados no computador e no celular.</p>
                  <button
                    type="button"
                    onClick={signIn}
                    className="mt-6 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-background transition hover:bg-blue-400"
                  >
                    Entrar com Google
                  </button>
                </section>
              ) : (
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/tarefas" element={<Tarefas />} />
                  <Route path="/agenda-diaria" element={<AgendaDiaria />} />
                  <Route path="/agenda-semanal" element={<AgendaSemanal />} />
                  <Route path="/cursos" element={<Cursos />} />
                  <Route path="/livros" element={<Livros />} />
                  <Route path="/projetos" element={<Projetos />} />
                  <Route path="/financeiro" element={<Financeiro />} />
                  <Route path="/certificacoes" element={<Certificacoes />} />
                  <Route path="/metas" element={<Metas />} />
                  <Route path="/diario" element={<Diario />} />
                  <Route path="/perfil" element={<Perfil />} />
                  <Route path="/conhecimento" element={<Conhecimento />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              )}
            </div>
          </main>
        </div>
      </Router>
    </div>
  );
}

export default App;
