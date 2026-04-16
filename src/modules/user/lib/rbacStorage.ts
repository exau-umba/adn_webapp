import type { PermissionId, RoleRecord, UserAccount } from "../types/rbac.ts";
import { ALL_PERMISSION_IDS } from "../types/rbac.ts";

const ROLES_KEY = "adn_rbac_roles_v1";
const USERS_KEY = "adn_rbac_users_v1";

const seedRoles: RoleRecord[] = [
  {
    id: "role-admin",
    name: "Administrateur",
    description: "Accès complet à l'application et à l'administration RBAC.",
    permissionIds: [...ALL_PERMISSION_IDS],
  },
  {
    id: "role-ops",
    name: "Responsable opérations",
    description: "Missions, contrats, incidents et lecture financière.",
    permissionIds: [
      "dashboard.view",
      "analytics.view",
      "agents.manage",
      "clients.manage",
      "offres.manage",
      "missions.manage",
      "contrats.manage",
      "incidents.manage",
    ],
  },
  {
    id: "role-finance",
    name: "Finance",
    description: "Finance et consultation du tableau de bord.",
    permissionIds: ["dashboard.view", "analytics.view", "finance.manage"],
  },
  {
    id: "role-readonly",
    name: "Lecture seule",
    description: "Consultation du tableau de bord et de l'analytique uniquement.",
    permissionIds: ["dashboard.view", "analytics.view"],
  },
];

const seedUsers: UserAccount[] = [
  {
    id: "usr-001",
    email: "admin@adnproservice.cd",
    fullName: "Patience Mukendi",
    roleId: "role-admin",
    status: "Actif",
    lastLoginAt: "2026-04-15T08:12:00",
  },
  {
    id: "usr-002",
    email: "operations@adnproservice.cd",
    fullName: "Jean-Baptiste Ilunga",
    roleId: "role-ops",
    status: "Actif",
    lastLoginAt: "2026-04-14T17:40:00",
  },
  {
    id: "usr-003",
    email: "compta@adnproservice.cd",
    fullName: "Grace Tshimanga",
    roleId: "role-finance",
    status: "Actif",
    lastLoginAt: "2026-04-13T09:05:00",
  },
  {
    id: "usr-004",
    email: "stagiaire@adnproservice.cd",
    fullName: "Ange Kabeya",
    roleId: "role-readonly",
    status: "Suspendu",
    lastLoginAt: "2026-04-01T11:00:00",
  },
];

function hasWindow() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function parseRoles(raw: string | null): RoleRecord[] {
  if (!raw) return seedRoles;
  try {
    const parsed = JSON.parse(raw) as RoleRecord[];
    return Array.isArray(parsed) && parsed.length ? parsed : seedRoles;
  } catch {
    return seedRoles;
  }
}

function parseUsers(raw: string | null): UserAccount[] {
  if (!raw) return seedUsers;
  try {
    const parsed = JSON.parse(raw) as UserAccount[];
    return Array.isArray(parsed) && parsed.length ? parsed : seedUsers;
  } catch {
    return seedUsers;
  }
}

export function loadRoles(): RoleRecord[] {
  if (!hasWindow()) return seedRoles;
  return parseRoles(window.localStorage.getItem(ROLES_KEY));
}

export function saveRoles(roles: RoleRecord[]) {
  if (!hasWindow()) return;
  window.localStorage.setItem(ROLES_KEY, JSON.stringify(roles));
}

export function loadUsers(): UserAccount[] {
  if (!hasWindow()) return seedUsers;
  return parseUsers(window.localStorage.getItem(USERS_KEY));
}

export function saveUsers(users: UserAccount[]) {
  if (!hasWindow()) return;
  window.localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function createUserId() {
  if (hasWindow() && typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `usr-${crypto.randomUUID().slice(0, 8)}`;
  }
  return `usr-${Date.now().toString(36)}`;
}

export function createRoleId() {
  if (hasWindow() && typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `role-${crypto.randomUUID().slice(0, 8)}`;
  }
  return `role-${Date.now().toString(36)}`;
}

export function normalizePermissionIds(ids: PermissionId[]): PermissionId[] {
  const allowed = new Set(ALL_PERMISSION_IDS);
  return ids.filter((id) => allowed.has(id));
}
