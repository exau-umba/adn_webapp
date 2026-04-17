export type PasswordRule = { id: string; ok: boolean; label: string };

export type PasswordStrength = {
  rules: PasswordRule[];
  isStrong: boolean;
};

const RULE_DEFS: { id: string; test: (p: string) => boolean; label: string }[] = [
  { id: "len", test: (p) => p.length >= 8, label: "Au moins 8 caractères" },
  { id: "upper", test: (p) => /[A-Z]/.test(p), label: "Une lettre majuscule" },
  { id: "lower", test: (p) => /[a-z]/.test(p), label: "Une lettre minuscule" },
  { id: "digit", test: (p) => /\d/.test(p), label: "Un chiffre" },
  { id: "special", test: (p) => /[^A-Za-z0-9]/.test(p), label: "Un caractère spécial" },
];

export function getPasswordStrength(password: string): PasswordStrength {
  const rules = RULE_DEFS.map((d) => ({ id: d.id, ok: d.test(password), label: d.label }));
  return { rules, isStrong: rules.every((r) => r.ok) };
}
