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

function App() {
  const [theme, setTheme] = useState('dark');

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

  return (
    <div className="min-h-screen bg-theme-background text-theme-text transition-colors duration-300">
      <Router basename={process.env.PUBLIC_URL}>
        <div className="max-w-[1400px] mx-auto grid min-h-screen md:grid-cols-[280px_minmax(0,1fr)]">
          <Navbar theme={theme} toggleTheme={toggleTheme} />
          <main className="px-4 py-6 md:px-6">
            <div className="page-fade">
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
            </div>
          </main>
        </div>
      </Router>
    </div>
  );
}

export default App;
