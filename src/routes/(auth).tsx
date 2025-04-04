import { ParentProps } from "solid-js/types/server/rendering.js";

export default function AuthLayout (props: ParentProps) {
    return (
        <div class="w-full h-screen flex items-center justify-center">
            {props.children}
        </div>
    )
}
