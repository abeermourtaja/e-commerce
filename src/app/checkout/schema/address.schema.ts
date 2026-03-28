import * as zod from 'zod'
export const addressSchema=zod.object({
    city:zod.string().min(2,'City name must be at least 2 characters'),
    details:zod.string().min(10, "Address details must be at least 10 characters"),
    phone:zod.string().nonempty('field is required').regex(/^01[0125][0-9]{8}$/, "Invalid Egyptian phone number"),
    name:zod.string().optional()
       
})
export type addressSchemaType=zod.infer<typeof addressSchema>;