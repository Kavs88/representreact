import { z } from 'zod';

export const discountFormSchema = z.object({
  code: z.string().min(1, 'Discount code is required').max(50, 'Discount code must be less than 50 characters'),
  description: z.string().min(1, 'Description is required').max(500, 'Description must be less than 500 characters'),
  percentage: z.number().min(1, 'Percentage must be at least 1%').max(100, 'Percentage cannot exceed 100%'),
  validFrom: z.date(),
  validUntil: z.date(),
  maxUses: z.number().optional(),
  isActive: z.boolean().default(true),
});

export type DiscountFormData = z.infer<typeof discountFormSchema>; 