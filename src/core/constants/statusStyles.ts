export function getStatusTone(status: string) {
  return status === "Actif"
    ? { text: "text-emerald-600", dot: "bg-emerald-500" }
    : { text: "text-red-600", dot: "bg-red-500" };
}
