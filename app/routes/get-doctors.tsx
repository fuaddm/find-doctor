import type { Route } from '.react-router/types/app/routes/+types/get-doctors';
import { JOB_OPTIONS } from '~/components/find/Filter';

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const minPrice = url.searchParams.get('minPrice') ?? 0;
  const maxPrice = url.searchParams.get('maxPrice');
  const foundJob = JOB_OPTIONS.find((job) => String(job.value) === url.searchParams.get('profession'));
  const profession = foundJob === undefined ? null : foundJob.value;
  const gender = url.searchParams.get('gender');

  try {
    const resp = await fetch(`https://hzq2fc96.rpcl.app/webhook/58e85096-169f-4a93-91c0-7bb6b73c7588?token=fuad`, {
      method: 'POST',
      body: JSON.stringify({
        min_price: minPrice,
        max_price: maxPrice,
        profession: profession,
        experience_years: null,
        gender: gender,
      }),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
    const data = await resp.json();
    if (data.length === 1 && typeof data[0] === 'object' && !('doctor' in data[0])) return [];
    return data.slice(0, 15);
  } catch {
    return [];
  }
}
