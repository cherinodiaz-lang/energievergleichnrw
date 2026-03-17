import type { APIRoute } from 'astro';
import { searchStromTariffs, validateStromTariffInput } from '@/lib/strom-tariff-provider';

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
    },
  });
}

export const POST: APIRoute = async ({ request }) => {
  let payload: Record<string, unknown>;

  try {
    payload = await request.json();
  } catch {
    return json(
      {
        status: 'error',
        message: 'Die Anfrage konnte nicht verarbeitet werden.',
        tariffs: [],
      },
      400,
    );
  }

  const validation = validateStromTariffInput(payload);
  if (!validation.valid || !validation.data) {
    return json(
      {
        status: 'error',
        message: 'Bitte pruefen Sie die eingegebenen Werte.',
        tariffs: [],
        errors: validation.errors,
      },
      400,
    );
  }

  const result = await searchStromTariffs(validation.data);
  const statusCode = result.status === 'error' ? 502 : 200;
  return json(result, statusCode);
};
