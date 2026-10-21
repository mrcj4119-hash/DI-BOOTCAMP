import { z } from 'zod'

export const credentialsSchema = z.object({
  username: z.string().trim().min(3).max(24).regex(/^[a-zA-Z0-9_]+$/),
  password: z
    .string()
    .min(12)
    .max(72)
    .regex(/[a-z]/, 'Password must include a lowercase letter.')
    .regex(/[A-Z]/, 'Password must include an uppercase letter.')
    .regex(/[0-9]/, 'Password must include a number.')
    .regex(/[^a-zA-Z0-9]/, 'Password must include a symbol.'),
})

export const profileSchema = z.object({
  name: z.string().trim().min(1).max(80),
  bio: z.string().trim().max(280),
})
