import { JSX } from "solid-js";

export type InputSize = "sm" | "md" | "lg";

export type InputProps = {
  size?: InputSize;
  error?: boolean;
  icon?: () => JSX.Element;
  iconPosition?: "left" | "right";
} & JSX.InputHTMLAttributes<HTMLInputElement>;

export type InputIconProps = {
  size?: InputSize;
} & JSX.HTMLAttributes<HTMLDivElement>;

