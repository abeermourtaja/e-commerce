import * as zod from 'zod'
export const loginSchema=zod.object({
    email:zod.string().email('invalid email'),
    password:zod.string().min(8, "Password must be at least 8 characters")
        ,
})
export type loginSchemaType=zod.infer<typeof loginSchema>;