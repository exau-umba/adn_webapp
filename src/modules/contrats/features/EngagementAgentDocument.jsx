/**
 * Texte juridique agent — affiché soit comme contrat employeur (recrutement, lien direct ADN),
 * soit référencé depuis une mission (le dossier mission renvoie ici via le profil agent).
 */
export function EngagementAgentDocument({ agent, referenceDossier, dateDocument, variant = "employeur" }) {
  const isEmployeur = variant === "employeur";
  return (
    <article className="space-y-6 font-myriad text-sm leading-relaxed text-slate-700 dark:text-slate-300">
      <header className="border-b border-slate-200 pb-4 dark:border-slate-600">
        <p className="text-xs font-bold uppercase tracking-widest text-[#08047a] dark:text-indigo-300">
          {isEmployeur ? "Contrat employeur — Agent / ADN PRO SERVICE" : "Fiche d&apos;engagement agent"}
        </p>
        <h3 className="mt-2 font-brand text-lg text-[#01003b] dark:text-slate-100">ADN PRO SERVICE SARL</h3>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          Référence dossier : <strong>{referenceDossier}</strong> — Date : <strong>{dateDocument}</strong>
        </p>
        {isEmployeur ? (
          <p className="mt-3 rounded-lg bg-slate-100 px-3 py-2 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            Contrat bilatéral conclu à l&apos;embauche ou à l&apos;ajout au dossier : l&apos;agent est rattaché
            administrativement à ADN PRO SERVICE, même sans mission. Les missions ouvrent une{" "}
            <strong>annexe tripartite</strong> (client + société + agent) sans remplacer le présent contrat employeur.
          </p>
        ) : null}
      </header>

      <section>
        <h4 className="font-semibold text-[#01003b] dark:text-slate-100">1. Identité de l&apos;agent</h4>
        <ul className="mt-2 list-none space-y-1.5">
          <li>
            <span className="text-slate-500 dark:text-slate-400">Nom complet :</span> {agent.nomComplet}
          </li>
          <li>
            <span className="text-slate-500 dark:text-slate-400">Date et lieu de naissance :</span>{" "}
            {agent.dateLieuNaissance}
          </li>
          <li>
            <span className="text-slate-500 dark:text-slate-400">Adresse actuelle :</span> {agent.adresseActuelle}
          </li>
          <li>
            <span className="text-slate-500 dark:text-slate-400">Téléphone :</span> {agent.telephone}
          </li>
          <li>
            <span className="text-slate-500 dark:text-slate-400">Numéro de pièce d&apos;identité :</span>{" "}
            {agent.numeroPieceIdentite}
          </li>
          <li>
            <span className="text-slate-500 dark:text-slate-400">Personne de référence (famille) :</span>{" "}
            {agent.personneReferenceFamille}
          </li>
          <li>
            <span className="text-slate-500 dark:text-slate-400">Téléphone (référence) :</span>{" "}
            {agent.telephoneReference}
          </li>
        </ul>
      </section>

      <section>
        <h4 className="font-semibold text-[#01003b] dark:text-slate-100">2. Statut contractuel</h4>
        <p className="mt-2">Je reconnais être recruté(e) par ADN PRO SERVICE SARL sous :</p>
        <ul className="mt-2 list-none space-y-1">
          <li>☐ Contrat à Durée Déterminée (CDD) de 6 mois renouvelable</li>
          <li>☐ Contrat à durée convenue selon mission</li>
        </ul>
        <p className="mt-2">
          Je comprends que : mon contrat est renouvelable après évaluation ; je reste administrativement rattaché(e) à
          ADN PRO SERVICE pendant toute la durée du contrat ; je ne peux changer d&apos;employeur sans autorisation
          écrite de la Société.
        </p>
      </section>

      <section>
        <h4 className="font-semibold text-[#01003b] dark:text-slate-100">3. Engagements professionnels</h4>
        <p className="mt-2">Je m&apos;engage à : respecter les horaires convenus ; être honnête, loyal(e) et discipliné(e) ; respecter les biens et la vie privée du Client ; maintenir une bonne conduite morale ; informer immédiatement la Société en cas de difficulté ; respecter les instructions données par la Société.</p>
      </section>

      <section>
        <h4 className="font-semibold text-[#01003b] dark:text-slate-100">4. Interdiction de recrutement direct</h4>
        <p className="mt-2">Je m&apos;engage formellement à : ne pas accepter une proposition d&apos;emploi direct du Client ; ne pas conclure d&apos;accord secret avec le Client ; ne pas travailler pour un membre de sa famille sans autorisation écrite ; ne pas poursuivre le travail après résiliation sans validation de la Société.</p>
        <p className="mt-2">
          Cette interdiction s&apos;applique : pendant toute la durée du contrat ; pendant <strong>12 mois</strong>{" "}
          après sa fin.
        </p>
      </section>

      <section>
        <h4 className="font-semibold text-[#01003b] dark:text-slate-100">5. Responsabilité en cas de contournement</h4>
        <p className="mt-2">
          Je reconnais que : tout recrutement direct sans autorisation constitue une faute grave ; je pourrai être
          radié(e) définitivement de la base d&apos;ADN PRO SERVICE ; je pourrai être tenu(e) solidairement responsable
          avec le Client des pénalités prévues ; la Société pourra engager une action judiciaire si nécessaire.
        </p>
      </section>

      <section>
        <h4 className="font-semibold text-[#01003b] dark:text-slate-100">6. Fautes graves</h4>
        <p className="mt-2">
          Sont considérées comme fautes graves : vol, violence, abandon de poste, mensonge grave, divulgation
          d&apos;informations confidentielles, tentative de collusion avec le Client. Ces fautes peuvent entraîner :
          suspension immédiate, rupture du contrat, poursuites judiciaires.
        </p>
      </section>

      <section>
        <h4 className="font-semibold text-[#01003b] dark:text-slate-100">7. Confidentialité</h4>
        <p className="mt-2">
          Je m&apos;engage à ne divulguer aucune information concernant : la vie privée du Client ; les biens ou
          habitudes du Client ; les informations internes de la Société.
        </p>
      </section>

      <section>
        <h4 className="font-semibold text-[#01003b] dark:text-slate-100">8. Acceptation</h4>
        <p className="mt-2">
          Je déclare avoir lu, compris et accepté sans réserve l&apos;ensemble des clauses de la présente fiche. Je
          reconnais que cette fiche complète mon contrat et le règlement intérieur d&apos;ADN PRO SERVICE SARL.
        </p>
        <p className="mt-4 text-sm">
          Fait à Kinshasa, le <span className="border-b border-slate-400 px-6">____ / ____ / ______</span>
        </p>
        <p className="mt-6 text-sm">
          Signature de l&apos;Agent :<span className="ml-8 border-b border-slate-400 px-16" /> <br />
          <span className="mt-2 inline-block">
            Nom en toutes lettres : <span className="border-b border-slate-400 px-8">{agent.nomComplet}</span>
          </span>
        </p>
        <p className="mt-6 text-sm">
          Signature du Représentant ADN PRO SERVICE :<span className="ml-4 border-b border-slate-400 px-20" /> <br />
          <span className="mt-2 block text-slate-500 dark:text-slate-400">Cachet officiel</span>
        </p>
      </section>
    </article>
  );
}
