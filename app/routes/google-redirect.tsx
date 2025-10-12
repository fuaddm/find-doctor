import type { Route } from '.react-router/types/app/routes/+types/find';
import { redirect } from 'react-router';

export async function loader({ request }: Route.ClientActionArgs) {
  const url = new URL(request.url);
  const accessToken = url.searchParams.get('id_token');

  try {
    const resp = await fetch(
      `https://sublime-cactus-e01a5ec7f1.strapiapp.com/api/auth/google/callback?access_token=${accessToken}`
    );
    const data = await resp.json();
    console.log(data);
    return redirect('/');
  } catch (e) {
    console.error('fetch getmedi');
  }
}

export default function GoogleRedirect() {
  return <></>;
}
