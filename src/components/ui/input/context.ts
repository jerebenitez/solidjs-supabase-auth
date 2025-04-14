import { createContext, useContext } from "solid-js";

export const InputContext = createContext<{ iconPosition: "left" | "right" }>()

export function useInputContext(){
    return useContext(InputContext)
}
