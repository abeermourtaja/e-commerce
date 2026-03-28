import * as zod from 'zod';
export const registerSchema=zod.object({
    name:zod.string().nonempty('field is required').min(2,'min 2 char').max(20,'max 20 char'),
    email:zod.string().nonempty('field is required').email('invalid email address'),
    password:zod.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[a-z]/, "Must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[0-9]/, "Must contain at least one number")
    .regex(/[@$!%*#?&]/, "Must contain at least one special character"),
    rePassword:zod.string().nonempty('field is required'),
    phone:zod.string().nonempty('field is required').regex(/^01[0125][0-9]{8}$/, "Invalid Egyptian phone number"),
}).refine((data)=>data.password===data.rePassword,{error:'password doesnt match',path:['rePassword']})
export type registerSchemaType=zod.infer<typeof registerSchema>