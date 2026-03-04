import type { APIRoute } from 'astro';
import { z } from 'zod';

const comparisonSchema = z.object({
  zipCode: z.string().regex(/^\d{5}$/, 'Invalid ZIP code'),
  consumption: z.number().min(500).max(50000),
  currentProvider: z.string().optional(),
  contractType: z.enum(['strom', 'gas', 'beide']),
  city: z.string().optional(),
});

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    
    const validatedData = comparisonSchema.parse(body);
    
    // TODO: Implement actual submission logic
    // - Send to CRM
    // - Send confirmation email
    // - Store in database
    
    if (typeof process !== 'undefined' && process.env.DEBUG) {
      console.log('[API] Comparison submission:', validatedData);
    }
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Comparison request submitted successfully',
        data: {
          submissionId: `sub_${Date.now()}`,
          estimatedProviders: Math.floor(Math.random() * 20) + 10,
          estimatedSavings: Math.floor(validatedData.consumption * 0.15),
        },
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    if (typeof process !== 'undefined' && process.env.DEBUG) {
      console.error('[API Error]', error);
    }
    
    if (error instanceof z.ZodError) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Validation error',
          details: error.errors,
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }
    
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
};