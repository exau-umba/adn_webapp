export const ROUTES = {
  dashboard: "/dashboard",
  agentManagement: "/agent-management",
  agentRegistration: "/agent-management/registration",
  agentEvaluation: "/agent-management/evaluation",
  agentDetail: (agentId: string) => `/agent-management/detail/${agentId}`,
  agentEdit: (agentId: string) => `/agent-management/detail/${agentId}/edit`,
  clientManagement: "/client-management",
  clientRegistration: "/client-management/registration",
  clientDetail: (clientId: string) => `/client-management/detail/${clientId}`,
  clientEdit: (clientId: string) => `/client-management/detail/${clientId}/edit`,
  notifications: "/notifications",
  settings: "/settings",
} as const;
