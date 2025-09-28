import { Services } from '~/components/home/Services';
import type { Route } from './+types/home';
import { Intro } from '~/components/home/Intro';
import { Banner } from '~/components/home/Banner';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'New React Router App' }, { name: 'description', content: 'Welcome to React Router!' }];
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
