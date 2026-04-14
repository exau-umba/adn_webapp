import { Link, useLocation } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa6";
import { BREADCRUMB_LABELS } from "../core/constants/breadcrumbLabels.ts";

function toLabel(segment) {
  if (BREADCRUMB_LABELS[segment]) return BREADCRUMB_LABELS[segment];
  return segment
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function AdminBreadcrumb() {
  const { pathname } = useLocation();
  const parts = pathname.split("/").filter(Boolean);

  if (parts.length === 0) return null;

  const crumbs = parts.map((part, index) => {
    const to = `/${parts.slice(0, index + 1).join("/")}`;
    const isLast = index === parts.length - 1;
    return { label: toLabel(part), to, isLast };
  });

  return (
    <nav aria-label="Fil d'ariane" className="mb-3 flex items-center gap-2 font-myriad text-xs text-slate-500">
      {crumbs.map((crumb) => (
        <div key={crumb.to} className="flex items-center gap-2">
          {crumb.isLast ? (
            <span className="font-semibold text-[#01003b] dark:text-slate-100">{crumb.label}</span>
          ) : (
            <Link className="transition hover:text-[#08047a] dark:hover:text-slate-300" to={crumb.to}>
              {crumb.label}
            </Link>
          )}
          {!crumb.isLast ? <FaChevronRight className="text-[10px]" /> : null}
        </div>
      ))}
    </nav>
  );
}
