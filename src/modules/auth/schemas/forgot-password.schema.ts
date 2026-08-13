import { z } from 'zod'
import { EMAIL_MAX_LENGTH } from '@/modules/auth/const/auth-schemas.const.ts'

export const forgotPasswordSchema = z.object({
  email: z
    .email()
    .trim()
    .nonempty()
    .max(EMAIL_MAX_LENGTH, `Email must be at most ${EMAIL_MAX_LENGTH} characters`),
})

export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>
