import { Component, JSX, Show, splitProps } from "solid-js";
import { LucideIcon } from "lucide-solid";
import { cn } from "~/lib/utils";

type InputSize = "sm" | "md" | "lg";

export type InputProps = {
  size?: InputSize;
  error?: boolean;
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
} & JSX.InputHTMLAttributes<HTMLInputElement>;

export const Input: Component<InputProps> = (props) => {
  // Split custom props from native input props
  const [local, inputProps] = splitProps(props, [
    "size",
    "icon",
    "iconPosition",
    "error",
  ]);

  const getInputClass = () => {
    return cn(
      "block w-full border rounded-lg focus:outline-none focus:ring-4",
      "text-gray-900 dark:text-white dark:bg-gray-700",
      
      // Error state classes
      local.error 
        ? "border-red-500 dark:border-red-500 text-red-900 focus:border-red-500 focus:ring-red-500" 
        : "border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500",
      
      // Size classes
      local.size === "sm" && "text-xs p-2",
      local.size === "lg" && "text-base p-4",
      (local.size === "md" || !local.size) && "text-sm p-2.5",
      
      // Icon padding adjustments
      local.icon && local.iconPosition === "right" && {
        "pr-8": local.size === "sm",
        "pr-10": local.size === "md" || !local.size,
        "pr-12": local.size === "lg",
      },
      
      local.icon && local.iconPosition !== "right" && {
        "pl-8": local.size === "sm",
        "pl-10": local.size === "md" || !local.size,
        "pl-12": local.size === "lg",
      },
      
      // Custom classes
      inputProps.class
    );
  };

  const getIconClass = () => {
    return cn(
      "absolute flex items-center justify-center text-gray-500 dark:text-gray-400",
      
      // Position classes
      local.iconPosition === "right" ? "right-0" : "left-0",
      
      // Size classes
      local.size === "sm" && "p-2",
      local.size === "lg" && "p-4",
      (local.size === "md" || !local.size) && "p-2.5"
    );
  };

  return (
    <div class="relative">
      <Show when={local.icon && (local.iconPosition !== "right")}>
        <div class={getIconClass()}>
          <local.icon size={local.size === "lg" ? 24 : local.size === "sm" ? 16 : 20} />
        </div>
      </Show>
      
      <input
        class={getInputClass()}
        aria-invalid={local.error ? "true" : "false"}
        {...inputProps}
      />
      
      <Show when={local.icon && local.iconPosition === "right"}>
        <div class={getIconClass()}>
          <local.icon size={local.size === "lg" ? 24 : local.size === "sm" ? 16 : 20} />
        </div>
      </Show>
    </div>
  );
};

