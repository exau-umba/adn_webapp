export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  unread: boolean;
}

export const notificationsData: Notification[] = [
  {
    id: "ntf-001",
    title: "Nouvelle mission assignee",
    message: "L'agent Marc-Antoine Dupont est affecte a une nouvelle mission.",
    time: "Il y a 5 min",
    unread: true,
  },
  {
    id: "ntf-002",
    title: "Dossier incomplet",
    message: "Le dossier de Sophie Lavalliere attend un document de reference.",
    time: "Il y a 1 h",
    unread: true,
  },
  {
    id: "ntf-003",
    title: "Evaluation terminee",
    message: "L'evaluation de Lucas Bernard est maintenant disponible.",
    time: "Hier, 18:20",
    unread: false,
  },
];
