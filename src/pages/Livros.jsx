import { useLocalStorage } from '../hooks/useLocalStorage';

const blankBook = {
  name: '',
  author: '',
  category: '',
  pages: '',
  current: '',
  percent: 0,
  start: '',
  end: '',
  rating: '',
  note: ''
};

export default function Livros() {
  const [books, setBooks] = useLocalStorage('livros', []);

  const addBook = () => setBooks((prev) => [...prev, { ...blankBook }]);
  const updateBook = (index, key, value) => {
    setBooks((prev) => prev.map((book, idx) => (idx === index ? { ...book, [key]: value } : book)));
  };
  const removeBook = (index) => setBooks((prev) => prev.filter((_, idx) => idx !== index));

  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-white/10 bg-surface p-6 shadow-[0_20px_60px_rgba(0,0,0,0.18)]">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Livros</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">Meta de 12 livros técnicos</h2>
          </div>
          <button
            type="button"
            onClick={addBook}
            className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-background transition hover:bg-blue-400"
          >
            Adicionar livro
          </button>
        </div>

        <div className="mt-6 grid gap-4">
          {books.length === 0 ? (
            <div className="rounded-3xl border border-white/10 bg-[#111827] p-6 text-slate-300">
              Nenhum livro cadastrado. Adicione um livro para acompanhar sua leitura.
            </div>
          ) : (
            books.map((book, index) => (
              <div key={index} className="rounded-3xl border border-white/10 bg-[#111827] p-5 shadow-[0_14px_30px_rgba(0,0,0,0.18)]">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <input
                      value={book.name}
                      onChange={(event) => updateBook(index, 'name', event.target.value)}
                      placeholder="Título"
                      className="w-full rounded-2xl border border-white/10 bg-black/20 px-3 py-2 text-white outline-none"
                    />
                    <input
                      value={book.author}
                      onChange={(event) => updateBook(index, 'author', event.target.value)}
                      placeholder="Autor"
                      className="mt-3 w-full rounded-2xl border border-white/10 bg-black/20 px-3 py-2 text-slate-200 outline-none"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeBook(index)}
                    className="rounded-full bg-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-slate-200"
                  >
                    Remover
                  </button>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  <input
                    value={book.pages}
                    onChange={(event) => updateBook(index, 'pages', event.target.value)}
                    placeholder="Páginas"
                    className="rounded-3xl bg-background p-4 text-sm text-slate-200 outline-none border border-white/10"
                  />
                  <input
                    value={book.current}
                    onChange={(event) => updateBook(index, 'current', event.target.value)}
                    placeholder="Página atual"
                    className="rounded-3xl bg-background p-4 text-sm text-slate-200 outline-none border border-white/10"
                  />
                  <input
                    type="number"
                    value={book.percent}
                    min={0}
                    max={100}
                    onChange={(event) => updateBook(index, 'percent', Number(event.target.value) || 0)}
                    placeholder="Percentual"
                    className="rounded-3xl bg-background p-4 text-sm text-slate-200 outline-none border border-white/10"
                  />
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  <input
                    value={book.start}
                    onChange={(event) => updateBook(index, 'start', event.target.value)}
                    placeholder="Início"
                    className="rounded-3xl bg-background p-4 text-sm text-slate-200 outline-none border border-white/10"
                  />
                  <input
                    value={book.end}
                    onChange={(event) => updateBook(index, 'end', event.target.value)}
                    placeholder="Término"
                    className="rounded-3xl bg-background p-4 text-sm text-slate-200 outline-none border border-white/10"
                  />
                  <input
                    value={book.rating}
                    onChange={(event) => updateBook(index, 'rating', event.target.value)}
                    placeholder="Nota"
                    className="rounded-3xl bg-background p-4 text-sm text-slate-200 outline-none border border-white/10"
                  />
                </div>
                <textarea
                  value={book.note}
                  onChange={(event) => updateBook(index, 'note', event.target.value)}
                  placeholder="Comentários"
                  className="mt-4 w-full rounded-3xl border border-white/10 bg-background px-4 py-3 text-sm text-slate-200 outline-none"
                />
                <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-white/5">
                  <div className="h-full rounded-full bg-accent transition-all duration-700" style={{ width: `${book.percent}%` }} />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
