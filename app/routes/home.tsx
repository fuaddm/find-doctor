import { Services } from '~/components/home/Services';
import type { Route } from './+types/home';
import { Intro } from '~/components/home/Intro';
import { Banner } from '~/components/home/Banner';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Ana səhifə | Sağlamlığın üçün doğru ünvanı tap' },
    {
      name: 'description',
      content: 'Minlərlə həkim arasından sənə uyğun olanı tap və peşəkar tibbi xidmətlərlə tanış ol',
    },
  ];
}

export default function Home() {
  return (
    <>
      <Intro />
      <Services />
      <Banner />
    </>
  );
}
