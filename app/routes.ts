import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route('find', 'routes/find.tsx'),
  route('find-manual', 'routes/find-manual.tsx'),
] satisfies RouteConfig;
