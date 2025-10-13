import type { Route } from '.react-router/types/app/routes/+types/find';
import { redirect } from 'react-router';

export async function loader({ request }: Route.ClientActionArgs) {
  const url = new URL(request.url);
  const accessToken = url.searchParams.get('access_token');

  try {
    const resp = await fetch(
      `https://sublime-cactus-e01a5ec7f1.strapiapp.com/api/auth/google/callback?access_token=${accessToken}`
    );
    return redirect('/');
  } catch (e) {
    console.error(e);
  }
}

export default function GoogleRedirect() {
  return <></>;
}
