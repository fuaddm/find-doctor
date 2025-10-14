import type { Route } from '.react-router/types/app/routes/+types/me';
import { useEffect } from 'react';
import { Button, Label } from 'react-aria-components';
import { redirect, useFetcher, useLoaderData, type ActionFunctionArgs } from 'react-router';
import { toast } from 'sonner';
import { MyInput } from '~/components/ui/input';
import { authContext } from '~/context';
import { jwt } from '~/cookies.server';
import { cn } from '~/libs/cn';

export async function loader({ context }: Route.LoaderArgs) {
  const user = context.get(authContext);

  if (user === null) return redirect('/');

  return { user };
}

export async function action({ request }: ActionFunctionArgs) {
  const cookieHeader = request.headers.get('Cookie');
  const cookie = (await jwt.parse(cookieHeader)) || {};
  const formData = await request.formData();
  const username = String(formData.get('username'));
  const userId = formData.get('userId');

  const actionMethod = formData.get('actionMethod');

  if (actionMethod === 'edit-username') {
    const resp = await fetch(`https://sublime-cactus-e01a5ec7f1.strapiapp.com/api/users/${userId}`, {
      method: 'PUT',
      body: JSON.stringify({
        username,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookie.jwt}`,
      },
    });
    const data = await resp.json();
    if (data.error) {
      if (data.error.name === 'ApplicationError')
        return {
          actionMethod,
          success: false,
          msg: 'İstifadəçi adı artıq götürülüb',
        };
      else if (data.error.name === 'ValidationError')
        return {
          actionMethod,
          success: false,
          msg: 'Min. 1 simvol olmalıdır',
        };
    }
    return {
      actionMethod,
      success: true,
    };
  }

  return {
    actionMethod,
    success: true,
  };
}

export default function MePage() {
  const { user } = useLoaderData<typeof loader>();
  const fetcher = useFetcher<typeof action>();
  const userSaveLoading = fetcher.state !== 'idle';

  useEffect(() => {
    if (fetcher.state === 'idle' && fetcher.data?.actionMethod === 'edit-username') {
      if (fetcher.data?.success) toast.success('Uğurla dəyişdi');
      if (fetcher.data?.success === false) toast.error(fetcher.data?.msg);
    }
  }, [fetcher]);

  return (
    <div className="container flex py-10">
      <fetcher.Form
        method="post"
        className="w-full max-w-[520px] rounded-xl bg-teal-50/50 px-5 py-6 md:px-10 md:py-8"
      >
        <input
          type="hidden"
          name="actionMethod"
          value="edit-username"
        />
        <input
          type="hidden"
          name="userId"
          value={user.id}
        />
        <div className="mb-6 text-2xl font-semibold text-teal-900">Profili redaktə et</div>
        <div className="mb-4 w-full">
          <Label
            htmlFor="username"
            className="mb-1 inline-block px-1 text-sm"
          >
            İstifadəçi adı
          </Label>
          <MyInput
            id="username"
            name="username"
            className="w-full bg-white md:text-base"
            defaultValue={user.username}
          />
        </div>
        <div className="mb-6">
          <Label
            htmlFor="email"
            className="mb-1 inline-block px-1 text-sm"
          >
            E-poçt
          </Label>
          <MyInput
            disabled
            id="email"
            className="w-full bg-white md:text-base"
            defaultValue={user.email}
          />
        </div>
        <div className="flex gap-3">
          <Button
            type="submit"
            isDisabled={userSaveLoading}
            className={cn({
              'relative rounded-md bg-teal-600 px-6 py-1.5 text-white transition hover:bg-teal-500': true,
              'hover:bg-teal-600': userSaveLoading,
            })}
          >
            <div
              className={cn({
                'absolute top-0 left-0 grid h-full w-full place-content-center opacity-0 select-none': true,
                'opacity-100': userSaveLoading,
              })}
            >
              <div role="status">
                <svg
                  aria-hidden="true"
                  className="h-6 w-6 animate-spin fill-white text-transparent"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            </div>
            <span
              className={cn({
                'opacity-100 transition': true,
                'opacity-0': userSaveLoading,
              })}
            >
              Yadda saxla
            </span>
          </Button>
        </div>
      </fetcher.Form>
    </div>
  );
}
