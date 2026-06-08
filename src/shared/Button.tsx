import type { ReactNode } from "react";
import styles from "./Button.module.css";

type Props = {
  variant?: "surface" | "surfaceObject";
  children: ReactNode;
  type?: "button" | "submit";
  onClick?: () => void;
};

export function Button({
  variant = "surface",
  children,
  type = "button",
  onClick,
}: Props) {
  return (
    <button
      className={`${styles.button} ${styles[variant]}`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
