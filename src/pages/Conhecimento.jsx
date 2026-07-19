import { useMemo, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const categories = ['Programação', 'Linux', 'Engenharia', 'Excel', 'Inglês', 'Trabalho', 'Outros'];

const blankItem = {
  title: '',
  category: 'Programação',
  url: '',
  note: ''
};

export default function Conhecimento() {
  const [items, setItems] = useLocalStorage('knowledgeBank', []);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('Todos');

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const searchText = [item.title, item.note, item.url, item.category].join(' ').toLowerCase();
      const searchMatch = searchText.includes(search.toLowerCase());
      const categoryMatch = categoryFilter === 'Todos' || item.category === categoryFilter;
      return searchMatch && categoryMatch;
    });
  }, [items, search, categoryFilter]);

  const addItem = () => setItems((prev) => [...prev, { ...blankItem }]);
  const updateItem = (index, key, value) => setItems((prev) => prev.map((item, idx) => (idx === index ? { ...item, [key]: value } : item)));
  const removeItem = (index) => setItems((prev) => prev.filter((_, idx) => idx !== index));

  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-white/10 bg-surface p-6 shadow-[0_20px_60px_rgba(0,0,0,0.18)]">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Banco de conhecimentos</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">Links, notas e referências</h2>
          </div>
          <button type="button" onClick={addItem} className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-background transition hover:bg-blue-400">
            Adicionar item
          </button>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Buscar conhecimento"
            className="rounded-3xl bg-[#111827] px-4 py-3 text-slate-200 outline-none border border-white/10"
          />
          <select value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)} className="rounded-3xl bg-[#111827] px-4 py-3 text-slate-200 outline-none border border-white/10">
            <option value="Todos">Todas as categorias</option>
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          <p className="rounded-3xl bg-[#111827] px-4 py-3 text-slate-300">Total: {items.length}</p>
        </div>

        <div className="mt-6 space-y-4">
          {filteredItems.length === 0 ? (
            <div className="rounded-3xl border border-white/10 bg-[#111827] p-6 text-slate-300">
              Nenhum registro encontrado. Adicione links, cursos e notas para construir seu banco de referências.
            </div>
          ) : (
            filteredItems.map((item, index) => (
              <div key={`${item.title}-${index}`} className="rounded-3xl border border-white/10 bg-[#111827] p-5 shadow-[0_12px_30px_rgba(0,0,0,0.18)]">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="space-y-3">
                    <input
                      value={item.title}
                      onChange={(event) => updateItem(index, 'title', event.target.value)}
                      placeholder="Título"
                      className="w-full rounded-2xl border border-white/10 bg-black/20 px-3 py-2 text-white outline-none"
                    />
                    <div className="grid gap-3 sm:grid-cols-2">
                      <select value={item.category} onChange={(event) => updateItem(index, 'category', event.target.value)} className="rounded-3xl bg-black/20 px-4 py-3 text-slate-200 outline-none border border-white/10">
                        {categories.map((category) => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                      <input
                        value={item.url}
                        onChange={(event) => updateItem(index, 'url', event.target.value)}
                        placeholder="Link"
                        className="rounded-3xl bg-black/20 px-4 py-3 text-slate-200 outline-none border border-white/10"
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(index)}
                    className="rounded-full bg-white/10 px-4 py-2 text-sm uppercase tracking-[0.16em] text-slate-200 transition hover:bg-white/20"
                  >
                    Excluir
                  </button>
                </div>
                <textarea
                  value={item.note}
                  onChange={(event) => updateItem(index, 'note', event.target.value)}
                  placeholder="Anotações"
                  className="mt-4 w-full rounded-3xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-slate-200 outline-none"
                />
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
