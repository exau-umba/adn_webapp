/** Fiche d'engagement client — texte juridique fourni par l'entreprise (affichage administratif). */
export function EngagementClientDocument({ client, referenceDossier, dateDocument }) {
  return (
    <article className="space-y-6 font-myriad text-sm leading-relaxed text-slate-700 dark:text-slate-300">
      <header className="border-b border-slate-200 pb-4 dark:border-slate-600">
        <p className="text-xs font-bold uppercase tracking-widest text-[#08047a] dark:text-indigo-300">
          Fiche d&apos;engagement client
        </p>
        <h3 className="mt-2 font-brand text-lg text-[#01003b] dark:text-slate-100">ADN PRO SERVICE SARL</h3>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          Siège social : Kinshasa – RDC — Référence dossier : <strong>{referenceDossier}</strong> — Date :{" "}
          <strong>{dateDocument}</strong>
        </p>
      </header>

      <section>
        <h4 className="font-semibold text-[#01003b] dark:text-slate-100">1. Identité du client</h4>
        <ul className="mt-2 list-none space-y-1.5">
          <li>
            <span className="text-slate-500 dark:text-slate-400">Nom complet :</span> {client.nomComplet}
          </li>
          <li>
            <span className="text-slate-500 dark:text-slate-400">Adresse complète :</span> {client.adresseComplete}
          </li>
          <li>
            <span className="text-slate-500 dark:text-slate-400">Téléphone :</span> {client.telephone}
          </li>
          <li>
            <span className="text-slate-500 dark:text-slate-400">Profession :</span> {client.profession}
          </li>
          <li>
            <span className="text-slate-500 dark:text-slate-400">Numéro d&apos;identité :</span> {client.numeroIdentite}
          </li>
        </ul>
      </section>

      <section>
        <h4 className="font-semibold text-[#01003b] dark:text-slate-100">2. Engagement de collaboration</h4>
        <p className="mt-2">
          Je reconnais avoir sollicité les services de <strong>ADN PRO SERVICE SARL</strong> pour le placement d&apos;un
          agent domestique. Je reconnais que : la Société a investi dans la sélection, la vérification et
          l&apos;encadrement de l&apos;Agent ; l&apos;Agent demeure administrativement rattaché à ADN PRO SERVICE SARL
          pendant toute la durée du contrat.
        </p>
      </section>

      <section>
        <h4 className="font-semibold text-[#01003b] dark:text-slate-100">3. Interdiction de contournement</h4>
        <p className="mt-2">Je m&apos;engage formellement à :</p>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>Ne pas recruter directement l&apos;Agent présenté par la Société ;</li>
          <li>Ne pas conclure un contrat parallèle non déclaré ;</li>
          <li>Ne pas transférer l&apos;Agent à un membre de ma famille ou à un tiers ;</li>
          <li>Ne pas maintenir l&apos;Agent à mon service après résiliation sans autorisation écrite.</li>
        </ul>
        <p className="mt-2">
          Cette interdiction s&apos;applique : pendant toute la durée du contrat ; pendant{" "}
          <strong>12 mois</strong> après sa fin.
        </p>
      </section>

      <section>
        <h4 className="font-semibold text-[#01003b] dark:text-slate-100">4. Clause libératoire</h4>
        <p className="mt-2">
          Si je souhaite recruter définitivement l&apos;Agent et mettre fin au lien avec la Société, je m&apos;engage à
          : informer officiellement ADN PRO SERVICE SARL par écrit ; payer une clause libératoire équivalente à{" "}
          <strong>6 mois de salaire brut</strong> de l&apos;Agent <strong>ou</strong> le montant forfaitaire prévu
          dans le contrat. Le paiement libère définitivement les parties.
        </p>
      </section>

      <section>
        <h4 className="font-semibold text-[#01003b] dark:text-slate-100">5. Clause pénale en cas de contournement</h4>
        <p className="mt-2">
          En cas de contournement, fraude, collusion ou maintien dissimulé de l&apos;Agent : je m&apos;engage à payer
          à ADN PRO SERVICE SARL une indemnité forfaitaire équivalente à <strong>12 mois de salaire brut</strong> de
          l&apos;Agent <strong>ou</strong> un minimum forfaitaire de <strong>1 500 USD</strong>, sans mise en demeure
          préalable. Cette indemnité est indépendante de toute autre action judiciaire.
        </p>
      </section>

      <section>
        <h4 className="font-semibold text-[#01003b] dark:text-slate-100">6. Responsabilité solidaire</h4>
        <p className="mt-2">
          Je reconnais que : l&apos;Agent qui accepte un recrutement direct sans autorisation devient solidairement
          responsable ; ADN PRO SERVICE SARL peut engager toute action légale nécessaire devant les juridictions
          compétentes de Kinshasa.
        </p>
      </section>

      <section>
        <h4 className="font-semibold text-[#01003b] dark:text-slate-100">7. Acceptation</h4>
        <p className="mt-2">
          Je déclare avoir lu, compris et accepté l&apos;ensemble des clauses ci-dessus sans réserve. Je reconnais que
          cette fiche a valeur contractuelle et complète le contrat tripartite signé.
        </p>
        <p className="mt-4 text-sm">
          Fait à Kinshasa, le <span className="border-b border-slate-400 px-6">____ / ____ / ______</span>
        </p>
        <p className="mt-6 text-sm">
          Signature du client :<span className="ml-8 border-b border-slate-400 px-16" /> <br />
          <span className="mt-2 inline-block">
            Nom en toutes lettres : <span className="border-b border-slate-400 px-12">{client.nomComplet}</span>
          </span>
        </p>
      </section>
    </article>
  );
}
