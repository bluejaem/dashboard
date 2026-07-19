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
  const { user, authLoading, authError, signIn, signUp, signOutUser, isFirebaseConfigured } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [authMessage, setAuthMessage] = useState('');

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    setAuthMessage('');
    try {
      if (isRegistering) {
        await signUp(email, password);
        setAuthMessage('Conta criada com sucesso. Você está logado.');
      } else {
        await signIn(email, password);
        setAuthMessage('Login realizado com sucesso.');
      }
      setPassword('');
    } catch (error) {
      setAuthMessage(error.message || 'Erro na autenticação.');
    }
  };

  return (
    <div className="min-h-screen bg-theme-background text-theme-text transition-colors duration-300">
      <Router basename={process.env.PUBLIC_URL}>
        <div className="mx-auto max-w-[1600px]">
          <Navbar theme={theme} toggleTheme={toggleTheme} user={user} signOutUser={signOutUser} />
          <main className="px-4 py-6 md:px-8 lg:px-10">
            <div className="page-fade">
              {authLoading ? (
                <div className="rounded-3xl border border-white/10 bg-surface p-6 text-slate-300">Carregando autenticação...</div>
              ) : needsLogin ? (
                <section className="mx-auto max-w-xl rounded-[2rem] border border-white/10 bg-theme-surface p-8 shadow-[0_30px_80px_rgba(0,0,0,0.18)]">
                  <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Acesso remoto</p>
                  <h2 className="mt-4 text-3xl font-semibold text-white">Entre com seu email e senha</h2>
                  <p className="mt-2 text-slate-400">Use um email válido para salvar suas alterações no banco e acessar seus dados em qualquer dispositivo.</p>

                  <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
                    <div>
                      <label className="text-sm uppercase tracking-[0.16em] text-slate-400">Email</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required
                        className="mt-2 w-full rounded-3xl border border-white/10 bg-[#111827] px-4 py-3 text-white outline-none focus:border-accent"
                      />
                    </div>
                    <div>
                      <label className="text-sm uppercase tracking-[0.16em] text-slate-400">Senha</label>
                      <input
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required
                        className="mt-2 w-full rounded-3xl border border-white/10 bg-[#111827] px-4 py-3 text-white outline-none focus:border-accent"
                      />
                    </div>
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <button
                        type="submit"
                        className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-background transition hover:bg-blue-400"
                      >
                        {isRegistering ? 'Criar conta' : 'Entrar'}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setIsRegistering((current) => !current);
                          setAuthMessage('');
                        }}
                        className="rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/10"
                      >
                        {isRegistering ? 'Já tenho conta' : 'Criar nova conta'}
                      </button>
                    </div>
                  </form>

                  {(authMessage || authError) && (
                    <div className="mt-6 rounded-3xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-100">
                      {authError?.message || authMessage}
                    </div>
                  )}
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
