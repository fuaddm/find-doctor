import type { Route } from '.react-router/types/app/routes/+types/find';
import { redirect } from 'react-router';
import { jwt } from '~/cookies.server';

export async function loader({ request }: Route.ClientActionArgs) {
  const cookieHeader = request.headers.get('Cookie');
  const cookie = (await jwt.parse(cookieHeader)) || {};

  const url = new URL(request.url);
  const accessToken = url.searchParams.get('access_token');

  try {
    const resp = await fetch(
      `https://sublime-cactus-e01a5ec7f1.strapiapp.com/api/auth/google/callback?access_token=${accessToken}`
    );
    const data = await resp.json();
    cookie.jwt = data.jwt;
    return redirect('/', {
      headers: {
        'Set-Cookie': await jwt.serialize(cookie),
      },
    });
  } catch (e) {
    console.error(e);
  }

  return redirect('/');
}
