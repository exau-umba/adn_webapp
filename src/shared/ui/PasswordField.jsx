import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { IconButton } from "./AppButton";
import { fieldBaseClass } from "./FormFields";

export function PasswordField({ className = "", id, disabled, ...props }) {
  const [visible, setVisible] = useState(false);
  return (
    <div className={`relative ${className}`}>
      <input
        id={id}
        disabled={disabled}
        type={visible ? "text" : "password"}
        className={`${fieldBaseClass} pr-11`}
        {...props}
      />
      <IconButton
        type="button"
        disabled={disabled}
        onClick={() => setVisible((v) => !v)}
        className="absolute top-1/2 right-1.5 -translate-y-1/2 border-0 bg-transparent"
        aria-label={visible ? "Masquer le mot de passe" : "Afficher le mot de passe"}
        title={visible ? "Masquer" : "Afficher"}
      >
        {visible ? <FaEyeSlash className="text-base" /> : <FaEye className="text-base" />}
      </IconButton>
    </div>
  );
}
