import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AppButton, PaginationControls } from "../../../shared/ui";
import { ROUTES } from "../../../core/routes.ts";
import {
  fetchNotificationsPage,
  markAllNotificationsRead,
  notifyNotificationsUpdated,
} from "../lib/notificationsApi.ts";

function formatDate(iso) {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleString("fr-FR", {
      dateStyle: "short",
      timeStyle: "short",
    });
  } catch {
    return iso;
  }
}

export function NotificationsScreen() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const [count, setCount] = useState(0);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [marking, setMarking] = useState(false);

  const totalPages = Math.max(1, Math.ceil(count / pageSize));

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetchNotificationsPage(page, pageSize);
      setCount(res.count);
      setItems(res.results);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Impossible de charger les notifications.");
      setItems([]);
      setCount(0);
    } finally {
      setLoading(false);
    }
  }, [page, pageSize]);

  useEffect(() => {
    void load();
  }, [load]);

  async function onMarkAll() {
    setMarking(true);
    try {
      await markAllNotificationsRead();
      notifyNotificationsUpdated();
      toast.success("Toutes les notifications sont marquées comme lues.");
      await load();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Action impossible.");
    } finally {
      setMarking(false);
    }
  }

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="font-myriad text-xs font-bold uppercase tracking-[0.2em] text-[#7a7ee5]">Centre de notifications</p>
          <h2 className="mt-1 font-brand text-2xl text-[#01003b] dark:text-slate-100 md:text-3xl">Notifications</h2>
        </div>
        <AppButton variant="ghost" disabled={marking || loading || count === 0} onClick={() => void onMarkAll()}>
          {marking ? "Mise à jour…" : "Tout marquer comme lu"}
        </AppButton>
      </div>

      {loading ? (
        <p className="font-myriad text-slate-500">Chargement…</p>
      ) : (
        <div className="space-y-3">
          {items.length === 0 ? (
            <p className="rounded-xl border border-slate-200 bg-white p-6 font-myriad text-slate-500 dark:border-slate-700 dark:bg-slate-900/80">
              Aucune notification pour le moment.
            </p>
          ) : (
            items.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => navigate(ROUTES.notificationDetail(item.id))}
                className="w-full rounded-xl border border-slate-200 bg-white p-3.5 text-left shadow-sm transition hover:border-[#08047a]/30 hover:shadow-md dark:border-slate-700 dark:bg-slate-900/80 dark:hover:border-indigo-500/40"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-myriad font-semibold text-[#01003b] dark:text-slate-100">{item.title}</p>
                    <p className="mt-1 line-clamp-2 font-myriad text-sm text-slate-500 dark:text-slate-400">{item.body}</p>
                  </div>
                  {!item.read ? <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-[#08047a]" title="Non lu" /> : null}
                </div>
                <p className="mt-3 font-myriad text-xs text-slate-400 dark:text-slate-500">{formatDate(item.created_at)}</p>
              </button>
            ))
          )}
        </div>
      )}

      {count > 0 ? (
        <PaginationControls
          page={page}
          totalPages={totalPages}
          totalItems={count}
          pageSize={pageSize}
          onPageChange={setPage}
          label="notifications"
        />
      ) : null}
    </section>
  );
}
