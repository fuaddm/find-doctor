import { useEffect } from 'react';
import { useFetcher, useSearchParams } from 'react-router';
import { Doctors } from '~/components/find/Doctors';
import { DoctorsContext } from '~/components/find/DoctorsContext';
import { Filter } from '~/components/find/Filter';
import type { loader } from '~/routes/get-doctors';

export default function FindManualPage() {
  const fetcher = useFetcher<typeof loader>({ key: 'get-doctors' });
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    fetcher.load(`/get-doctors?${searchParams.toString()}`);
  }, [searchParams]);

  const data = fetcher.data ?? [];
  const doctors = data.map((item: any) => item.doctor);

  return (
    <div className="container py-10 pb-40">
      <Filter />
      <DoctorsContext value={doctors}>
        <Doctors />
      </DoctorsContext>
    </div>
  );
}
