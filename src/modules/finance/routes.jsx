import { FinancePage } from "./pages/FinancePage";
import { FinanceNouveauMouvementPage } from "./pages/FinanceNouveauMouvementPage";

export const financeRoutes = [
  { path: "finance-management", element: <FinancePage /> },
  { path: "finance-management/nouveau-mouvement", element: <FinanceNouveauMouvementPage /> },
];
