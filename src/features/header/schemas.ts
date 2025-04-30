import { z } from "zod";

export const notifications = z.object({
    id: z.number().int().positive().finite(),
    from: z.object({
        name: z.string(),
        photo: z.string()
    }),
    read: z.boolean().default(false),
    target: z.object({
        url: z.string().url(),
        type: z.enum(["post", "comment"])
    }).optional(),
    createdOn: z.string().datetime(),
    message: z.string().optional(),
    type: z.enum(["like", "message", "post"])
})

export type NotificationSchema = z.infer<typeof notifications>
