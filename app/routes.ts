import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route('find', 'routes/find.tsx'),
  route('find-manual', 'routes/find-manual.tsx'),
  route('get-doctors', 'routes/get-doctors.tsx'),
  route('connect/google/redirect', 'routes/google-redirect.tsx'),
  route('me', 'routes/me.tsx'),
] satisfies RouteConfig;
