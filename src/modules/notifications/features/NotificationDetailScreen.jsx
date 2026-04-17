import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import { AppButton } from "../../../shared/ui";
import { ROUTES } from "../../../core/routes.ts";
import {
  fetchNotification,
  markNotificationRead,
  notifyNotificationsUpdated,
} from "../lib/notificationsApi.ts";

function formatDate(iso) {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleString("fr-FR", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  } catch {
    return iso;
  }
}

export function NotificationDetailScreen() {
  const { notificationId } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    if (!notificationId) return;
    setLoading(true);
    setError("");
    try {
      const n = await fetchNotification(notificationId);
      setItem(n);
      if (!n.read) {
        const updated = await markNotificationRead(notificationId);
        setItem(updated);
        notifyNotificationsUpdated();
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Impossible de charger la notification.");
    } finally {
      setLoading(false);
    }
  }, [notificationId]);

  useEffect(() => {
    void load();
  }, [load]);

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <AppButton variant="ghost" size="sm" className="gap-2" type="button" onClick={() => navigate(ROUTES.notifications)}>
          <FaArrowLeft />
          Retour
        </AppButton>
      </div>

      <div>
        <p className="font-myriad text-xs font-bold uppercase tracking-[0.2em] text-[#7a7ee5]">Notification</p>
        <h2 className="mt-1 font-brand text-2xl text-[#01003b] dark:text-slate-100 md:text-3xl">
          {loading ? "Chargement…" : item?.title ?? "Détail"}
        </h2>
      </div>

      {error ? (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 font-myriad text-sm text-red-800 dark:border-red-900 dark:bg-red-950/40 dark:text-red-200">
          {error}
        </p>
      ) : null}

      {!loading && item ? (
        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900/80">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-[#08047a]/10 px-3 py-1 font-myriad text-xs font-semibold text-[#08047a] dark:bg-indigo-950/60 dark:text-indigo-200">
              {item.category}
            </span>
            {item.read ? (
              <span className="font-myriad text-xs text-slate-400">Lu</span>
            ) : (
              <span className="font-myriad text-xs font-semibold text-[#08047a]">Non lu</span>
            )}
          </div>
          <p className="mt-4 whitespace-pre-wrap font-myriad text-base leading-relaxed text-slate-700 dark:text-slate-200">
            {item.body}
          </p>
          <dl className="mt-8 grid gap-3 border-t border-slate-100 pt-6 font-myriad text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">
            <div className="flex justify-between gap-4">
              <dt>Reçue le</dt>
              <dd className="text-right text-slate-700 dark:text-slate-200">{formatDate(item.created_at)}</dd>
            </div>
            {item.read_at ? (
              <div className="flex justify-between gap-4">
                <dt>Lue le</dt>
                <dd className="text-right text-slate-700 dark:text-slate-200">{formatDate(item.read_at)}</dd>
              </div>
            ) : null}
          </dl>
        </article>
      ) : null}

      {!loading && !item && !error ? (
        <p className="font-myriad text-slate-500">Aucune donnée.</p>
      ) : null}
    </section>
  );
}
