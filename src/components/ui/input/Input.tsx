import { Component, splitProps } from "solid-js";
import { cn } from "~/lib/utils";
import { InputProps } from ".";
import { InputContext } from "./context";

export const Input: Component<InputProps> = (props) => {
  // Split custom props from native input props
  const [local, inputProps] = splitProps(props, [
    "size",
    "icon",
    "class",
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
      local.icon && local.iconPosition === "right" ? {
        "pr-8": local.size === "sm",
        "pr-10": local.size === "md" || !local.size,
        "pr-12": local.size === "lg",
      } : null,
      
      local.icon && local.iconPosition !== "right" ? {
        "pl-8": local.size === "sm",
        "pl-10": local.size === "md" || !local.size,
        "pl-12": local.size === "lg",
      } : null,
      
      // Custom classes
      local.class
    );
  };

  return (
    <div class="relative">
    {local.icon && 
      <InputContext.Provider value={{ iconPosition: local.iconPosition || "left" }}>
          {local.icon}
      </InputContext.Provider>}
      <input
        class={getInputClass()}
        aria-invalid={local.error ? "true" : "false"}
        {...inputProps}
      />
    </div>
  );
};
