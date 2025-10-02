import { useContext } from 'react';
import { useFetcher } from 'react-router';
import { DoctorsContext } from '~/components/find/DoctorsContext';
import { DoctorListCard } from '~/components/molecules/DoctorListCard';
import { DoctorCardListSkeleton } from '~/components/skeletons/DoctorCardListSkeleton';
import { useSelectedDoctor } from '~/store/useSelectedDoctor';

export function DoctorsList() {
  const fetcher = useFetcher({ key: 'msg-to-ai' });
  const data = useContext(DoctorsContext);
  const doctorId = useSelectedDoctor((state) => state.doctorId);
  const setDoctorId = useSelectedDoctor((state) => state.setDoctorId);

  return (
    <div>
      {fetcher.state === 'idle' && (
        <div className="flex flex-col gap-2">
          {data.map((doctor) => {
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
                lng={doctor.hospital.lng}
                specialty={doctor.profession.prf_name}
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
