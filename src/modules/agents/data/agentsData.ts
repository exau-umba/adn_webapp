export type AgentStatus = "Actif" | "Suspendu";

export interface Agent {
  id: string;
  name: string;
  role: string;
  photo: string;
  service: string;
  status: AgentStatus;
  score: string;
  phone: string;
  city: string;
  experience: string;
}

export const agentsData: Agent[] = [
  {
    id: "marc-antoine-dupont",
    name: "Marc-Antoine Dupont",
    role: "Habilite Entretien Technique",
    photo:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCAWR9YaoRK1nRDKh8lkN4RFBBdNCMfYrRS4aWatum_EdI02kJPy1glbN5399Vda4BTBSmDqwNZMmJdk-40HzDsGbU6V6HWis2Zw9J47Mo-N-Q-rr1TCTg0cesl-GbMglCf7mSyfdERSq1ufY0qIRTkGFRUpP_sHIdmih96MX6a4D9LvdbiPPCipMDtLT6daCJtov6f9s2dKqsTO2gioh7TjGjpoYDbkWG4LVWf6ILT0VQCrna0e5JWS2cKPPh__Tk59Gdb-HHhsfY",
    service: "Categorie A",
    status: "Actif",
    score: "9.4/10",
    phone: "+243 818 234 567",
    city: "Kinshasa",
    experience: "6 ans",
  },
  {
    id: "sophie-lavalliere",
    name: "Sophie Lavalliere",
    role: "Conciergerie de Luxe",
    photo:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDGuDUw1H0kA_LpDbkyj3GQDsPy5VegrKCsGwY12bLPWJ-ZX7iJGweYd6TNATlfex9OrzQm1bGVO2jdi9rm02UKKK03VqVEbvi9BPJKnBblDanBowDPHbU9_ZVEpUpphgnH9_4Hcu3MKFKcPUFlmoQgOarEgA6_r5Zd9O8XKN8mnzlvQaLzFv0CGVDCDDuPGy80pWLW2ogN7omTVquyxZLtAC73olZeSEUPOii6ZK9IUrIbzItjh92MkFgQyr_WnP9Qid7JvPLIwok",
    service: "VIP Violet",
    status: "Actif",
    score: "10/10",
    phone: "+243 824 765 432",
    city: "Gombe, Kinshasa",
    experience: "9 ans",
  },
  {
    id: "jerome-kervin",
    name: "Jerome Kervin",
    role: "Securite & Gardiennage",
    photo:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCM2en7g0vWfPNvZCYDUJYbx-6V8cQf2Wehanu79tPk01-_jZVvavuINBixM8amEm2s_ar2Q1F9O0i6a4ssujeLnTu0e2beRJDO2ZekPPgwgGHke17fe8I1z2NUZETVDx7g8MzgIr3W1vRetLOLyFKl1PXhMkMU6mOwNzSrEjJLlf_ymMed0DcxB57NzmFaa6e4dCpJe8o5AhIDVr0urrAKV6dcGHpnhaOlq9zxhuPx0xj20a9G6O2vZTodLBW-FXJuMXuZ22Myp7o",
    service: "Categorie B",
    status: "Suspendu",
    score: "7.2/10",
    phone: "+243 899 112 233",
    city: "Lubumbashi",
    experience: "4 ans",
  },
  {
    id: "lucas-bernard",
    name: "Lucas Bernard",
    role: "Jardinage & Exterieurs",
    photo:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAJhWFFIYxCI7DnLCg-3dreiZAS-4H94hWUxNj7kpg46hpAtrkjAwzbQ8Fzy6Yr5UWf0Im70rJ82eDN6f0RwJOwd5wscJbvEGb0eo4qdpdIhB9yPMf6mc7XKnzGMOVnaBkRqLLaAxux8_1ucbrYLcVHpkbVdZm-WXUp7xtiCUnurVz5Bfn_0Stp8LM7HtmhxRBCq3WapXJC8XlEiZ_aoU0Qb01Xz__kv1q_AisOAHjT66wjrThqLEBc5akGakeONilV25w5S6WvbHw",
    service: "Categorie A",
    status: "Actif",
    score: "8.8/10",
    phone: "+243 974 556 677",
    city: "Goma",
    experience: "5 ans",
  },
];
