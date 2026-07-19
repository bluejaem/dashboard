import { useLocalStorage } from '../hooks/useLocalStorage';

const initialProfile = {
  name: 'Seu nome',
  role: 'Seu objetivo atual',
  objective: 'Acompanhar estudos, projetos e carreira',
  bio: 'Use este espaço para manter sua visão profissional e suas metas sempre visíveis.',
  skills: 'React, Tailwind, JavaScript, Gestão de projetos',
  email: '',
  linkedin: '',
  phone: ''
};

export default function Perfil() {
  const [profile, setProfile] = useLocalStorage('profileData', initialProfile);

  const updateProfile = (key, value) => {
    setProfile((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-white/10 bg-surface p-6 shadow-[0_20px_60px_rgba(0,0,0,0.18)]">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Perfil pessoal</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">Sua vitrine profissional</h2>
          </div>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-4 rounded-3xl border border-white/10 bg-[#111827] p-5">
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Nome</p>
              <input
                value={profile.name}
                onChange={(event) => updateProfile('name', event.target.value)}
                className="mt-3 w-full rounded-3xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none"
              />
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Objetivo</p>
              <input
                value={profile.role}
                onChange={(event) => updateProfile('role', event.target.value)}
                className="mt-3 w-full rounded-3xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none"
              />
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Biografia</p>
              <textarea
                value={profile.bio}
                onChange={(event) => updateProfile('bio', event.target.value)}
                className="mt-3 w-full rounded-3xl border border-white/10 bg-black/20 px-4 py-3 text-slate-200 outline-none"
              />
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Habilidades</p>
              <input
                value={profile.skills}
                onChange={(event) => updateProfile('skills', event.target.value)}
                className="mt-3 w-full rounded-3xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none"
              />
              <p className="mt-2 text-sm text-slate-500">Separe por vírgula para listar várias habilidades.</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <input
                value={profile.email}
                onChange={(event) => updateProfile('email', event.target.value)}
                placeholder="Email"
                className="rounded-3xl bg-black/20 px-4 py-3 text-slate-200 outline-none border border-white/10"
              />
              <input
                value={profile.linkedin}
                onChange={(event) => updateProfile('linkedin', event.target.value)}
                placeholder="LinkedIn"
                className="rounded-3xl bg-black/20 px-4 py-3 text-slate-200 outline-none border border-white/10"
              />
              <input
                value={profile.phone}
                onChange={(event) => updateProfile('phone', event.target.value)}
                placeholder="Telefone"
                className="rounded-3xl bg-black/20 px-4 py-3 text-slate-200 outline-none border border-white/10"
              />
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-[#111827] p-5">
            <div className="flex items-center gap-4">
              <div className="h-20 w-20 rounded-3xl bg-white/5" />
              <div>
                <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Preview</p>
                <h3 className="mt-2 text-2xl font-semibold text-white">{profile.name}</h3>
                <p className="mt-1 text-slate-300">{profile.role}</p>
              </div>
            </div>
            <p className="mt-6 text-slate-300">{profile.bio}</p>
            <div className="mt-6 space-y-3">
              <div>
                <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Habilidades</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {profile.skills.split(',').map((skill) => skill.trim()).filter(Boolean).map((skill) => (
                    <span key={skill} className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-200">{skill}</span>
                  ))}
                </div>
              </div>
              <div className="grid gap-3 text-sm text-slate-300">
                {profile.email && <p>Email: {profile.email}</p>}
                {profile.linkedin && <p>LinkedIn: {profile.linkedin}</p>}
                {profile.phone && <p>Telefone: {profile.phone}</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
