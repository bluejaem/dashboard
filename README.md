# Dashboard de Produtividade

Projeto React com TailwindCSS e Chart.js, criado como um dashboard premium para estudantes e profissionais de TI.

## Visão geral

- Tema escuro minimalista inspirado em Notion, Linear e Obsidian
- Layout responsivo para desktop e celular
- Navegação entre Dashboard, Agenda Diária, Agenda Semanal, Cursos, Livros, GitHub, Certificações, Metas, Diário e Carreira
- Gráficos dinâmicos, cards de progresso animado e bloco de controle de metas

## Instalação

```bash
npm install
npm start
```

## Deploy no GitHub Pages

```bash
npm run deploy
```

O site deve ser publicado em: `https://bluejaem.github.io/dashboard`

## Estrutura do projeto

- `public/index.html`
- `src/index.js`
- `src/App.jsx`
- `src/components/Navbar.jsx`
- `src/components/Card.jsx`
- `src/pages/Dashboard.jsx`
- `src/pages/AgendaDiaria.jsx`
- `src/pages/AgendaSemanal.jsx`
- `src/pages/Cursos.jsx`
- `src/pages/Livros.jsx`
- `src/pages/GitHub.jsx`
- `src/pages/Certificacoes.jsx`
- `src/pages/Metas.jsx`
- `src/pages/Diario.jsx`
- `src/pages/Carreira.jsx`
- `src/styles.css`
- `tailwind.config.js`
- `postcss.config.js`
- `package.json`

## Tecnologias

- React
- React Router
- Tailwind CSS
- Chart.js
- React Chart.js 2
- GitHub Pages

## Observações

A configuração do GitHub Pages já está pronta no `package.json` com a homepage `https://bluejaem.github.io/dashboard`.

## Sincronização remota com Firebase

Para que os dados sejam compartilhados entre computador e celular, é preciso configurar o Firebase e usar autenticação Google.

1. Crie um projeto no Firebase.
2. Habilite Authentication > Sign-in method > Google.
3. Crie um Firestore Database em modo de teste.
4. Copie as credenciais do projeto.
5. Crie um arquivo `.env` na raiz do projeto com estas variáveis:

```env
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

6. Rode `npm install` e depois `npm start`.

A sincronização será ativada automaticamente quando você fizer login com Google.
