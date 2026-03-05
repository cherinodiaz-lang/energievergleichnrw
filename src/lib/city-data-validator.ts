import { z } from 'zod';

export const cityDataSchema = z.object({
  name: z.string().min(1, 'City name is required'),
  slug: z.string().min(1, 'City slug is required'),
  postalCode: z.string().regex(/^\d{5}$/, 'Invalid postal code'),
  population: z.number().positive('Population must be positive'),
  area: z.number().positive('Area must be positive'),
  providers: z
    .array(
      z.object({
        name: z.string(),
        type: z.enum(['strom', 'gas', 'beide']),
        basePrice: z.number().nonnegative(),
        workingPrice: z.number().positive(),
        greenEnergy: z.boolean().optional(),
      })
    )
    .min(1, 'At least one provider is required'),
  description: z.string().min(50, 'Description must be at least 50 characters'),
  metaTitle: z.string().max(60, 'Meta title must not exceed 60 characters').optional(),
  metaDescription: z
    .string()
    .max(160, 'Meta description must not exceed 160 characters')
    .optional(),
});

export type CityData = z.infer<typeof cityDataSchema>;

export function validateCityData(data: unknown): CityData {
  return cityDataSchema.parse(data);
}

export function isCityDataValid(data: unknown): data is CityData {
  return cityDataSchema.safeParse(data).success;
}
