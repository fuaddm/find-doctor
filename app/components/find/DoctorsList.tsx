import { distance, point } from '@turf/turf';
import { useQueryState } from 'nuqs';
import { useContext } from 'react';
import { useFetcher } from 'react-router';
import { toast } from 'sonner';
import { DoctorsContext } from '~/components/find/DoctorsContext';
import { DoctorListCard } from '~/components/molecules/DoctorListCard';
import { DoctorCardListSkeleton } from '~/components/skeletons/DoctorCardListSkeleton';
import { useMyLocationStore } from '~/store/useMyLocation';
import { useSelectedDoctor } from '~/store/useSelectedDoctor';

export function DoctorsList() {
  const fetcher = useFetcher({ key: 'msg-to-ai' });
  const data = useContext(DoctorsContext);
  let sortedData = [];
  const doctorId = useSelectedDoctor((state) => state.doctorId);
  const setDoctorId = useSelectedDoctor((state) => state.setDoctorId);
  const myLocation = useMyLocationStore((state) => state.myLocation);

  const [sort, setSort] = useQueryState('sort');

  if (sort === 'priceLow') {
    sortedData = [...data].sort((a, b) => a.price - b.price);
  } else if (sort === 'priceHigh') {
    sortedData = [...data].sort((a, b) => b.price - a.price);
  } else if (sort === 'experience') {
    sortedData = [...data].sort((a, b) => b.experience_years - a.experience_years);
  } else if (sort === 'distance') {
    if (!myLocation) toast.error('Yer məlumatı hal-hazırda əlçatmazdır');
    else {
      sortedData = data.map((doctor: any) => {
        const from = point([myLocation.lat, myLocation.lng]);
        const to = point([doctor.hospital.lat, doctor.hospital.long]);
        const km = distance(from, to, { units: 'kilometers' });
        doctor.distance = km;
        return doctor;
      });
      sortedData = [...data].sort((a, b) => a.distance - b.distance);
    }
  } else {
    sortedData = [...data];
  }

  return (
    <div>
      {fetcher.state === 'idle' && (
        <div className="flex flex-col gap-2">
          {sortedData.map((doctor: any) => {
            let km = null;
            if (myLocation) {
              const from = point([myLocation.lat, myLocation.lng]);
              const to = point([doctor.hospital.lat, doctor.hospital.long]);
              km = distance(from, to, { units: 'kilometers' });
            }
            return (
              <DoctorListCard
                key={doctor.id}
                onClick={() => setDoctorId(doctor.id)}
                full_name={doctor.full_name}
                gender={doctor.gender}
                img={doctor.photo_url}
                rating={5}
                price={doctor.price}
                address={doctor.hospital.name}
                lat={doctor.hospital.lat}
                lng={doctor.hospital.long}
                distance={km}
                workHours={doctor.is_saatlari}
                specialty={doctor.profession.name}
                isSelected={doctorId === doctor.id}
              />
            );
          })}
        </div>
      )}
      {fetcher.state !== 'idle' && (
        <div className="flex flex-col gap-2">
          <DoctorCardListSkeleton />
          <DoctorCardListSkeleton />
          <DoctorCardListSkeleton />
          <DoctorCardListSkeleton />
        </div>
      )}
    </div>
  );
}
