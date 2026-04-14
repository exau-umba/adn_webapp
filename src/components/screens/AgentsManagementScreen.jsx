import { useNavigate } from "react-router-dom";
import { AppButton } from "../ui";

const agents = [
  {
    name: "Marc-Antoine Dupont",
    role: "Habilite Entretien Technique",
    photo:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCAWR9YaoRK1nRDKh8lkN4RFBBdNCMfYrRS4aWatum_EdI02kJPy1glbN5399Vda4BTBSmDqwNZMmJdk-40HzDsGbU6V6HWis2Zw9J47Mo-N-Q-rr1TCTg0cesl-GbMglCf7mSyfdERSq1ufY0qIRTkGFRUpP_sHIdmih96MX6a4D9LvdbiPPCipMDtLT6daCJtov6f9s2dKqsTO2gioh7TjGjpoYDbkWG4LVWf6ILT0VQCrna0e5JWS2cKPPh__Tk59Gdb-HHhsfY",
    service: "Categorie A",
    status: "Actif",
    score: "9.4/10",
  },
  {
    name: "Sophie Lavalliere",
    role: "Conciergerie de Luxe",
    photo:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDGuDUw1H0kA_LpDbkyj3GQDsPy5VegrKCsGwY12bLPWJ-ZX7iJGweYd6TNATlfex9OrzQm1bGVO2jdi9rm02UKKK03VqVEbvi9BPJKnBblDanBowDPHbU9_ZVEpUpphgnH9_4Hcu3MKFKcPUFlmoQgOarEgA6_r5Zd9O8XKN8mnzlvQaLzFv0CGVDCDDuPGy80pWLW2ogN7omTVquyxZLtAC73olZeSEUPOii6ZK9IUrIbzItjh92MkFgQyr_WnP9Qid7JvPLIwok",
    service: "VIP Violet",
    status: "Actif",
    score: "10/10",
  },
  {
    name: "Jerome Kervin",
    role: "Securite & Gardiennage",
    photo:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCM2en7g0vWfPNvZCYDUJYbx-6V8cQf2Wehanu79tPk01-_jZVvavuINBixM8amEm2s_ar2Q1F9O0i6a4ssujeLnTu0e2beRJDO2ZekPPgwgGHke17fe8I1z2NUZETVDx7g8MzgIr3W1vRetLOLyFKl1PXhMkMU6mOwNzSrEjJLlf_ymMed0DcxB57NzmFaa6e4dCpJe8o5AhIDVr0urrAKV6dcGHpnhaOlq9zxhuPx0xj20a9G6O2vZTodLBW-FXJuMXuZ22Myp7o",
    service: "Categorie B",
    status: "Suspendu",
    score: "7.2/10",
  },
  {
    name: "Lucas Bernard",
    role: "Jardinage & Exterieurs",
    photo:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAJhWFFIYxCI7DnLCg-3dreiZAS-4H94hWUxNj7kpg46hpAtrkjAwzbQ8Fzy6Yr5UWf0Im70rJ82eDN6f0RwJOwd5wscJbvEGb0eo4qdpdIhB9yPMf6mc7XKnzGMOVnaBkRqLLaAxux8_1ucbrYLcVHpkbVdZm-WXUp7xtiCUnurVz5Bfn_0Stp8LM7HtmhxRBCq3WapXJC8XlEiZ_aoU0Qb01Xz__kv1q_AisOAHjT66wjrThqLEBc5akGakeONilV25w5S6WvbHw",
    service: "Categorie A",
    status: "Actif",
    score: "8.8/10",
  },
];

function renderStars(scoreLabel) {
  const numericScore = Number.parseFloat(scoreLabel);
  const stars = Math.max(0, Math.min(5, Math.round(numericScore / 2)));

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5 text-[13px] leading-none">
        {Array.from({ length: 5 }).map((_, index) => (
          <span key={index} className={index < stars ? "text-amber-400" : "text-slate-300"}>
            ★
          </span>
        ))}
      </div>
      <span className="text-xs text-slate-500">{scoreLabel}</span>
    </div>
  );
}

export function AgentsManagementScreen() {
  const navigate = useNavigate();

  return (
    <section className="space-y-6">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <div>
          <span className="rounded-full bg-[#e1e0ff] px-3 py-1 font-myriad text-[10px] font-bold uppercase tracking-widest text-[#08047a]">
            Equipes de Terrain
          </span>
          <h2 className="mt-2 font-brand text-4xl text-[#01003b]">Gestion des Agents</h2>
          <p className="mt-1 max-w-2xl font-myriad text-sm text-slate-500">
            Supervisez vos prestataires et suivez les performances en temps reel.
          </p>
        </div>
        <AppButton
          onClick={() => navigate("/agent-management/registration")}
          variant="secondary"
          size="lg"
          className="shadow-xl"
        >
          Nouvel Agent
        </AppButton>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <div className="rounded-xl bg-white p-5 shadow-sm md:col-span-2">
          <p className="font-myriad text-xs font-bold uppercase tracking-widest text-slate-400">
            Filtrer par Categorie
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {["Tous les agents", "Categorie A", "Categorie B", "VIP Premium"].map((tag, i) => (
              <button
                key={tag}
                className={`rounded-lg px-4 py-2 font-myriad text-sm font-medium ${
                  i === 0 ? "bg-[#01003b] text-white" : "bg-slate-100 text-slate-700"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
        <div className="rounded-xl bg-white p-5 shadow-sm">
          <p className="font-myriad text-xs font-bold uppercase tracking-widest text-slate-400">Statut</p>
          <select className="mt-3 w-full rounded-lg border-none bg-slate-100 p-2 text-sm">
            <option>Tous les statuts</option>
          </select>
        </div>
        <div className="rounded-xl bg-white p-5 shadow-sm">
          <p className="font-myriad text-xs font-bold uppercase tracking-widest text-slate-400">
            Tri par Performance
          </p>
          <p className="mt-4 font-myriad text-sm font-medium">Top score first</p>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full border-collapse font-myriad text-sm">
          <thead className="bg-slate-50 text-left">
            <tr>
              <th className="p-4 text-[11px] uppercase tracking-widest text-slate-500">Agent</th>
              <th className="p-4 text-[11px] uppercase tracking-widest text-slate-500">Categorie</th>
              <th className="p-4 text-[11px] uppercase tracking-widest text-slate-500">Score</th>
              <th className="p-4 text-[11px] uppercase tracking-widest text-slate-500">Statut</th>
              <th className="p-4 text-right text-[11px] uppercase tracking-widest text-slate-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {agents.map((agent) => (
              <tr key={agent.name} className="hover:bg-slate-50/60">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={agent.photo}
                      alt={`Photo de ${agent.name}`}
                      className={`h-11 w-11 rounded-xl object-cover shadow-sm ${
                        agent.status === "Suspendu" ? "grayscale" : ""
                      }`}
                    />
                    <div>
                      <p className="font-semibold text-[#01003b]">{agent.name}</p>
                      <p className="text-xs text-slate-500">{agent.role}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4">{agent.service}</td>
                <td className="p-4 font-bold text-[#01003b]">{renderStars(agent.score)}</td>
                <td className="p-4">
                  <span
                    className={`inline-flex items-center gap-2 ${
                      agent.status === "Suspendu" ? "text-red-600" : "text-emerald-600"
                    }`}
                  >
                    <span
                      className={`h-2 w-2 rounded-full ${
                        agent.status === "Suspendu" ? "bg-red-500" : "bg-emerald-500"
                      }`}
                    />
                    {agent.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button className="rounded-lg p-2 text-slate-400 hover:bg-slate-100">...</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50 px-6 py-3">
          <p className="font-myriad text-xs text-slate-500">Affichage de 4 sur 124 agents</p>
          <div className="flex gap-2">
            <button className="rounded-lg border border-slate-300 px-3 py-1 text-xs">Precedent</button>
            <button className="rounded-lg bg-[#01003b] px-3 py-1 text-xs text-white">1</button>
            <button className="rounded-lg border border-slate-300 px-3 py-1 text-xs">2</button>
          </div>
        </div>
      </div>
    </section>
  );
}
