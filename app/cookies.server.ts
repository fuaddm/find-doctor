import { createCookie } from 'react-router';

export const jwt = createCookie('jwt', {
  maxAge: 7 * 24 * 60 * 60,
});
