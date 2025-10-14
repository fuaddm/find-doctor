import { authContext } from '~/context';
import { jwt } from '~/cookies.server';

export const authMiddleware = async ({ request, context }) => {
  const cookieHeader = request.headers.get('Cookie');
  const cookie = (await jwt.parse(cookieHeader)) || {};
  const jwtToken = cookie?.jwt;

  if (jwtToken) {
    const resp = await fetch('https://sublime-cactus-e01a5ec7f1.strapiapp.com/api/users/me', {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });
    const data = await resp.json();
    context.set(authContext, data);
  }
};
