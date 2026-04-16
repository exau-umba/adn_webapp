function getInitials(fullName) {
  const parts = String(fullName || "")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  if (parts.length === 0) return "?";
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1]?.[0] ?? "" : "";
  return (first + last).toUpperCase() || "?";
}

export function UserAvatar({ fullName, photoUrl, size = 40 }) {
  const initials = getInitials(fullName);
  const s = `${size}px`;

  if (photoUrl) {
    return (
      <img
        src={photoUrl}
        alt={fullName ? `Photo de ${fullName}` : "Photo de profil"}
        className="rounded-full object-cover"
        style={{ width: s, height: s }}
        onError={(e) => {
          // fallback: hide broken image
          e.currentTarget.style.display = "none";
        }}
      />
    );
  }

  return (
    <div
      className="flex items-center justify-center rounded-full bg-gradient-to-br from-[#01003b] to-[#08047a] font-myriad text-xs font-bold text-white"
      style={{ width: s, height: s }}
      aria-label={fullName ? `Initiales de ${fullName}` : "Initiales"}
      title={fullName || ""}
    >
      {initials}
    </div>
  );
}

