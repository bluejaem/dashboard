import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import AgendaDiaria from './pages/AgendaDiaria';
import AgendaSemanal from './pages/AgendaSemanal';
import Cursos from './pages/Cursos';
import Livros from './pages/Livros';
import GitHub from './pages/GitHub';
import Certificacoes from './pages/Certificacoes';
import Metas from './pages/Metas';
import Diario from './pages/Diario';
import Carreira from './pages/Carreira';

function App() {
  return (
    <div className="min-h-screen bg-background text-text">
      <Router>
        <Navbar />
        <main className="max-w-[1400px] mx-auto px-4 py-6 md:px-6">
          <div className="page-fade">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/agenda-diaria" element={<AgendaDiaria />} />
              <Route path="/agenda-semanal" element={<AgendaSemanal />} />
              <Route path="/cursos" element={<Cursos />} />
              <Route path="/livros" element={<Livros />} />
              <Route path="/github" element={<GitHub />} />
              <Route path="/certificacoes" element={<Certificacoes />} />
              <Route path="/metas" element={<Metas />} />
              <Route path="/diario" element={<Diario />} />
              <Route path="/carreira" element={<Carreira />} />
            </Routes>
          </div>
        </main>
      </Router>
    </div>
  );
}

export default App;
