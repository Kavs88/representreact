import { revalidatePath } from 'next/cache';
import { auth } from '@clerk/nextjs'; // or your specific auth provider
import { z } from 'zod';
import { discountFormSchema } from '@/lib/validator'; // Ensure this path is correct
import { Discount, CreateDiscountParams } from '@/lib/types';

export async function createDiscount({ discount, userId }: CreateDiscountParams): Promise<Discount> { // Assuming Promise<Discount> is the return type
  // 1. VALIDATE USER SESSION ON THE SERVER
  const { sessionClaims } = auth();
  if (sessionClaims?.userId !== userId) {
    throw new Error('Unauthorized: User IDs do not match.');
  }

  try {
    // 2. VALIDATE INCOMING DATA WITH ZOD ON THE SERVER
    const validatedDiscount = discountFormSchema.parse(discount);

    // 3. PROCEED WITH DATABASE LOGIC (YOUR EXISTING CODE)
    // IMPORTANT: Use `validatedDiscount` from now on, not the original `discount` object.
    const newDiscount = await prisma.discount.create({ // Replace with your actual database client and method
      data: {
        ...validatedDiscount,
        creatorId: userId, // Assuming you link discounts to a user
      }
    });

    if (!newDiscount) {
      throw new Error('Discount creation failed in the database.');
    }

    // 4. REVALIDATE CACHE FOR RELEVANT PAGES
    revalidatePath('/discounts'); // Invalidate the main discounts list page
    revalidatePath(`/discounts/${newDiscount.id}`); // Invalidate the new discount's detail page

    return JSON.parse(JSON.stringify(newDiscount)); // Return the created object

  } catch (error) {
    // Handle specific Zod validation errors
    if (error instanceof z.ZodError) {
      console.error('Server-side validation failed:', error.errors);
      throw new Error(`Invalid form data provided: ${error.errors.map(e => e.message).join(', ')}`);
    }
    
    // Handle generic errors
    console.error('An error occurred in createDiscount:', error);
    throw new Error('An unexpected error occurred while creating the discount.');
  }
} 