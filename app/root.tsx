import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  type LoaderFunctionArgs,
} from 'react-router';
import { NuqsAdapter } from 'nuqs/adapters/react-router/v7';

import type { Route } from './+types/root';
import './app.css';
import { Header } from '~/components/Header';
import { Footer } from '~/components/Footer';
import { Toaster } from '~/components/ui/sonner';
import { jwt } from '~/cookies.server';

export const links: Route.LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
  },
  {
    rel: 'icon',
    type: 'image/svg+xml',
    href: '/logo.svg',
  },
];

export async function loader({ request }: LoaderFunctionArgs) {
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
    // context.set(authContext, data);
  }
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="az">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <Meta />
        <Links />
      </head>
      <body>
        <Header />
        {children}
        <Footer />
        <Toaster
          richColors
          position="top-right"
        />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <NuqsAdapter>
      <Outlet />
    </NuqsAdapter>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = 'Oops!';
  let details = 'An unexpected error occurred.';
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error';
    details = error.status === 404 ? 'The requested page could not be found.' : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="container mx-auto p-4 pt-16">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full overflow-x-auto p-4">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
