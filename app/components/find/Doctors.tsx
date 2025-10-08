import { DoctorsList } from '~/components/find/DoctorsList';
import { DoctorsMap } from '~/components/find/DoctorsMap';
import { Sort } from '~/components/find/Sort';

export function Doctors() {
  return (
    <div>
      <div className="mb-4 flex justify-start">
        <Sort />
      </div>
      <div className="relative grid grid-cols-1 gap-6 md:grid-cols-[450px_1fr]">
        <DoctorsList />
        <DoctorsMap />
      </div>
    </div>
  );
}
