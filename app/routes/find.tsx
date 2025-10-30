import type { Route } from '.react-router/types/app/routes/+types/find';
import { useFetcher } from 'react-router';
import { Chatbot } from '~/components/find/Chatbot';
import { Doctors } from '~/components/find/Doctors';
import { DoctorsContext } from '~/components/find/DoctorsContext';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'FindDoc' },
    {
      name: 'description',
      content:
        'FindDoc ilə minlərlə ixtisaslı həkim arasından seçim et və sağlamlığın üçün ən uyğun tibbi xidmətləri kəşf et',
    },
  ];
}

export async function action({ request }: Route.ClientActionArgs) {
  const formData = await request.formData();
  const type = formData.get('type');
  const text = formData.get('text') as string;

  if (type === 'msg-to-ai') {
    try {
      const resp = await fetch(
        `https://hzq2fc96.rpcl.app/webhook/733ba71e-4d8c-44b7-bbab-085d3d128af5?token=fuad&text=${encodeURIComponent(text)}`
      );
      const data = await resp.json();
      const doctors = data.slice(1);

      return { success: true, doctors, aiTextResponse: data[0] };
    } catch (e) {
      console.error('fetch getmedi');
    }
  }

  return { success: false };
}

export default function FindPage() {
  const fetcher = useFetcher({ key: 'msg-to-ai' });

  let loading = false;
  if (fetcher.state === 'submitting') {
    loading = true;
  }

  console.log(fetcher.data);
  return (
    <div className="container py-10 pb-40">
      <DoctorsContext value={{ data: fetcher.data?.doctors ?? [], loading }}>
        <Chatbot />
        <Doctors />
      </DoctorsContext>
    </div>
  );
}
