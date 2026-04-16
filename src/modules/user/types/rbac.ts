export type PermissionId =
  | "dashboard.view"
  | "agents.manage"
  | "clients.manage"
  | "offres.manage"
  | "missions.manage"
  | "contrats.manage"
  | "finance.manage"
  | "incidents.manage"
  | "analytics.view"
  | "users.manage"
  | "roles.manage";

export type RoleRecord = {
  id: string;
  name: string;
  description: string;
  permissionIds: PermissionId[];
};

export type UserAccount = {
  id: string;
  email: string;
  fullName: string;
  roleId: string;
  status: "Actif" | "Suspendu";
  lastLoginAt: string;
};

export const PERMISSION_CATALOG: { id: PermissionId; label: string; group: string }[] = [
  { id: "dashboard.view", label: "Tableau de bord (consultation)", group: "Général" },
  { id: "analytics.view", label: "Analytique (consultation)", group: "Général" },
  { id: "agents.manage", label: "Agents (gestion)", group: "Ressources" },
  { id: "clients.manage", label: "Clients (gestion)", group: "Ressources" },
  { id: "offres.manage", label: "Offres d'emploi", group: "Opérations" },
  { id: "missions.manage", label: "Missions", group: "Opérations" },
  { id: "contrats.manage", label: "Contrats", group: "Opérations" },
  { id: "finance.manage", label: "Finance", group: "Opérations" },
  { id: "incidents.manage", label: "Incidents", group: "Opérations" },
  { id: "users.manage", label: "Utilisateurs (gestion)", group: "Administration" },
  { id: "roles.manage", label: "Rôles et permissions", group: "Administration" },
];

export const ALL_PERMISSION_IDS: PermissionId[] = PERMISSION_CATALOG.map((p) => p.id);
