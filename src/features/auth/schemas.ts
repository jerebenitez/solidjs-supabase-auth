import { z } from "zod";

const UserSchema = z.object({
    email: z.string().email({ message: "Invalid e-mail format." }),
    password: z.string().min(6, { message: "Password must contain at least 6 charaters." })
})

export const UserSignInSchema = UserSchema.pick({
    email: true,
    password: true
}).extend({
    rememberMe: z.boolean().optional()
})
export type UserSignIn = z.infer<typeof UserSignInSchema>

export const UserSignUpSchema = UserSchema.pick({
    email: true,
    password: true
}).extend({
    confirmPassword: z.string().min(6, { message: "Password must contain at least 6 charaters." })
}).superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
        ctx.addIssue({
            code: "custom",
            message: "Passwords do no match.",
            path: ['confirmPassword']
        })
    }
})
export type UserSignUp = z.infer<typeof UserSignUpSchema>

export const UserDeleteSchema = UserSchema.pick({ email: true })
export type UserDelete = z.infer<typeof UserDeleteSchema>

export const UpdatePasswordSchema = z.object({
    oldPassword: z.string().min(6, { message: "Password must contain at least 6 charaters." }),
    newPassword: z.string().min(6, { message: "Password must contain at least 6 charaters." }),
    confirmPassword: z.string().min(6, { message: "Password must contain at least 6 charaters." })
}).superRefine(({ confirmPassword, newPassword }, ctx) => {
    if (confirmPassword !== newPassword) {
        ctx.addIssue({
            code: "custom",
            message: "New passwords do no match.",
            path: ['confirmPassword']
        })
    }
})
export type UpdatePassword = z.infer<typeof UpdatePasswordSchema>
