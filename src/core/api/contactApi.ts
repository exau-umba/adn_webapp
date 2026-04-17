import { getApiBaseUrl } from "../auth/authStorage.ts";

function joinUrl(path: string) {
  const base = getApiBaseUrl().replace(/\/$/, "");
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}

export type PublicContactPayload = {
  from_name: string;
  from_email: string;
  subject: string;
  message: string;
  /** Champ anti-robot : doit rester vide */
  website?: string;
};

export async function submitPublicContactForm(payload: PublicContactPayload): Promise<void> {
  const res = await fetch(joinUrl("/api/notifications/public/contact"), {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      from_name: payload.from_name,
      from_email: payload.from_email,
      subject: payload.subject,
      message: payload.message,
      website: payload.website ?? "",
    }),
  });
  if (!res.ok) {
    let msg = `Erreur ${res.status}`;
    try {
      const body = (await res.json()) as { detail?: string };
      if (typeof body.detail === "string") msg = body.detail;
    } catch {
      /* ignore */
    }
    throw new Error(msg);
  }
}
