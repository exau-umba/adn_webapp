import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppButton, ConfirmationModal } from "../../../shared/ui";
import { ROUTES } from "../../../core/routes.ts";
import { agentsData } from "../data/agentsData.ts";
import { generateAgentQrDataUrl } from "../../../core/utils/media.ts";
import { getStatusTone } from "../../../core/constants/statusStyles.ts";
import { exportAgentProfilePdf } from "../../../core/utils/pdf.ts";

function renderStars(scoreLabel) {
  const numericScore = Number.parseFloat(scoreLabel);
  const stars = Math.max(0, Math.min(5, Math.round(numericScore / 2)));

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5 text-[14px] leading-none">
        {Array.from({ length: 5 }).map((_, index) => (
          <span key={index} className={index < stars ? "text-amber-400" : "text-slate-300"}>
            ★
          </span>
        ))}
      </div>
      <span className="text-xs text-slate-500 dark:text-slate-400">{scoreLabel}</span>
    </div>
  );
}

export function AgentDetailsScreen() {
  const navigate = useNavigate();
  const { agentId } = useParams();
  const [isSuspended, setIsSuspended] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState("");

  const agent = useMemo(() => agentsData.find((item) => item.id === agentId), [agentId]);
  const statusTone = getStatusTone((isSuspended ? "Suspendu" : agent?.status) ?? "Suspendu");

  useEffect(() => {
    if (!agent) return;

    const qrPayload = JSON.stringify({
      agentId: agent.id,
      name: agent.name,
      phone: agent.phone,
      city: agent.city,
      company: "ADN PRO SERVICE",
    });

    generateAgentQrDataUrl(qrPayload)
      .then((url) => setQrDataUrl(url))
      .catch(() => setQrDataUrl(""));
  }, [agent]);

  const exportAgentPdf = async () => {
    if (!agent) return;
    await exportAgentProfilePdf({
      agent: {
        id: agent.id,
        name: agent.name,
        role: agent.role,
        status: isSuspended ? "Suspendu" : agent.status,
        score: agent.score,
        service: agent.service,
        phone: agent.phone,
        city: agent.city,
        experience: agent.experience,
        photo: agent.photo,
      },
      qrDataUrl,
    });
  };

  if (!agent) {
    return (
      <section className="space-y-4">
        <h2 className="font-brand text-2xl text-[#01003b] dark:text-slate-100 md:text-3xl">Agent introuvable</h2>
        <p className="font-myriad text-sm text-slate-500 dark:text-slate-400">
          L'agent demande n'existe pas ou n'est plus disponible.
        </p>
        <AppButton variant="ghost" onClick={() => navigate(ROUTES.agentManagement)}>
          Retour a la liste
        </AppButton>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-myriad text-xs font-bold uppercase tracking-[0.2em] text-[#7a7ee5]">Profil Agent</p>
          <h2 className="mt-1 font-brand text-2xl text-[#01003b] dark:text-slate-100 md:text-3xl">{agent.name}</h2>
          <p className="mt-1 font-myriad text-sm text-slate-500 dark:text-slate-400">{agent.role}</p>
        </div>
        <AppButton variant="ghost" onClick={() => navigate(ROUTES.agentManagement)}>
          Retour
        </AppButton>
      </div>

      <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900/80">
        <div className="flex flex-col items-start gap-4 md:flex-row">
          <img src={agent.photo} alt={agent.name} className="h-20 w-20 rounded-xl object-cover shadow-sm" />
          <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <p className="font-myriad text-xs uppercase tracking-wider text-slate-400 dark:text-slate-500">Statut</p>
              <span className={`inline-flex items-center gap-2 font-myriad font-semibold ${statusTone.text}`}>
                <span className={`h-2 w-2 rounded-full ${statusTone.dot}`} />
                {isSuspended ? "Suspendu" : agent.status}
              </span>
            </div>
            <div>
              <p className="font-myriad text-xs uppercase tracking-wider text-slate-400 dark:text-slate-500">Score</p>
              <div className="font-myriad font-semibold text-[#01003b] dark:text-slate-100">{renderStars(agent.score)}</div>
            </div>
            <div>
              <p className="font-myriad text-xs uppercase tracking-wider text-slate-400 dark:text-slate-500">Service</p>
              <p className="font-myriad font-semibold text-[#01003b] dark:text-slate-100">{agent.service}</p>
            </div>
            <div>
              <p className="font-myriad text-xs uppercase tracking-wider text-slate-400 dark:text-slate-500">Telephone</p>
              <p className="font-myriad font-semibold text-[#01003b] dark:text-slate-100">{agent.phone}</p>
            </div>
            <div>
              <p className="font-myriad text-xs uppercase tracking-wider text-slate-400 dark:text-slate-500">Ville</p>
              <p className="font-myriad font-semibold text-[#01003b] dark:text-slate-100">{agent.city}</p>
            </div>
            <div>
              <p className="font-myriad text-xs uppercase tracking-wider text-slate-400 dark:text-slate-500">Pays</p>
              <p className="font-myriad font-semibold text-[#01003b] dark:text-slate-100">RDC (Congo-Kinshasa)</p>
            </div>
            <div>
              <p className="font-myriad text-xs uppercase tracking-wider text-slate-400 dark:text-slate-500">Experience</p>
              <p className="font-myriad font-semibold text-[#01003b] dark:text-slate-100">{agent.experience}</p>
            </div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-2.5 dark:border-slate-700 dark:bg-slate-800/70">
            {qrDataUrl ? (
              <img src={qrDataUrl} alt={`QR code de ${agent.name}`} className="h-24 w-24 rounded-lg" />
            ) : (
              <div className="flex h-24 w-24 items-center justify-center font-myriad text-xs text-slate-400">QR...</div>
            )}
            <p className="mt-2 text-center font-myriad text-[11px] text-slate-500 dark:text-slate-400">QR unique agent</p>
          </div>
        </div>
      </article>

      <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900/80">
        <h3 className="font-brand text-lg text-[#01003b] dark:text-slate-100">Contrat employeur (ADN)</h3>
        <p className="mt-2 font-myriad text-sm text-slate-500 dark:text-slate-400">
          Contrat bilatéral signé avec ADN PRO SERVICE dès le recrutement ou l&apos;ajout au dossier, avant toute
          mission. Les missions ajoutent une annexe tripartite (client + société + vous) sans remplacer ce document.
        </p>
        <AppButton variant="secondary" className="mt-4" onClick={() => navigate(ROUTES.agentEmployeurContrat(agent.id))}>
          Ouvrir le contrat employeur
        </AppButton>
      </article>

      <div className="flex flex-wrap gap-3">
        <AppButton variant="ghost" onClick={exportAgentPdf}>
          Exporter en PDF
        </AppButton>
        <AppButton variant="primary" onClick={() => navigate(ROUTES.agentEvaluation)}>
          Lancer l'evaluation
        </AppButton>
        <AppButton variant="secondary" onClick={() => navigate(ROUTES.agentEdit(agent.id))}>
          Modifier le dossier
        </AppButton>
        <AppButton
          variant="ghost"
          className="border-amber-300 text-amber-700 hover:bg-amber-50 dark:border-amber-700 dark:text-amber-300 dark:hover:bg-amber-950/30"
          onClick={() => setIsSuspended((prev) => !prev)}
        >
          {isSuspended ? "Reactiver l'agent" : "Suspendre l'agent"}
        </AppButton>
        <AppButton
          variant="ghost"
          className="border-red-200 text-red-600 hover:bg-red-50 dark:border-red-700 dark:text-red-400 dark:hover:bg-red-950/30"
          onClick={() => setIsDeleteModalOpen(true)}
        >
          Supprimer l'agent
        </AppButton>
      </div>
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        title="Supprimer cet agent ?"
        message="Cette action est irreversible. Voulez-vous vraiment supprimer ce dossier agent ?"
        confirmLabel="Supprimer"
        cancelLabel="Annuler"
        onCancel={() => setIsDeleteModalOpen(false)}
        onConfirm={() => {
          setIsDeleteModalOpen(false);
          navigate(ROUTES.agentManagement);
        }}
      />
    </section>
  );
}
