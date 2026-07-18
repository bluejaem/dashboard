const books = [
  { name: 'Clean Architecture', author: 'Robert C. Martin', category: 'Software', pages: 432, current: 212, percent: 49, start: '12/03', end: '30/04', rating: '4.5', note: 'Arquitetura limpa para projetos duráveis' },
  { name: 'Design Patterns', author: 'Gamma et al.', category: 'Padrões', pages: 395, current: 185, percent: 47, start: '05/04', end: '-', rating: '-', note: 'Focar em exemplos de código' },
  { name: 'Sprint', author: 'Jake Knapp', category: 'Produtividade', pages: 256, current: 256, percent: 100, start: '01/03', end: '28/03', rating: '5.0', note: 'Livro concluído com insights práticos' }
];

export default function Livros() {
  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-white/10 bg-surface p-6 shadow-[0_20px_60px_rgba(0,0,0,0.18)]">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Livros</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">Meta de 12 livros técnicos</h2>
          </div>
          <p className="text-sm text-slate-300">Próxima leitura: Clean Architecture</p>
        </div>

        <div className="mt-6 grid gap-4">
          {books.map((book) => (
            <div key={book.name} className="rounded-3xl border border-white/10 bg-[#111827] p-5 shadow-[0_14px_30px_rgba(0,0,0,0.18)]">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-white">{book.name}</h3>
                  <p className="text-sm text-slate-400">{book.author} • {book.category}</p>
                </div>
                <span className="rounded-full bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.15em] text-slate-300">{book.percent}%</span>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <div className="rounded-3xl bg-background p-4 text-sm text-slate-300">
                  <p>Páginas: {book.pages}</p>
                  <p>Atual: {book.current}</p>
                </div>
                <div className="rounded-3xl bg-background p-4 text-sm text-slate-300">
                  <p>Início: {book.start}</p>
                  <p>Término: {book.end}</p>
                </div>
                <div className="rounded-3xl bg-background p-4 text-sm text-slate-300">
                  <p>Nota: {book.rating}</p>
                  <p>Comentários: {book.note}</p>
                </div>
              </div>
              <div className="mt-4">
                <div className="h-2 w-full overflow-hidden rounded-full bg-white/5">
                  <div className="h-full rounded-full bg-accent transition-all duration-700" style={{ width: `${book.percent}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
