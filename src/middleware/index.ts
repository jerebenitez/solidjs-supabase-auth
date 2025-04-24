import { csrfProtection } from "./csrf-protection";
import { createMiddleware } from "@solidjs/start/middleware"

export default createMiddleware({ onRequest: [csrfProtection] })
