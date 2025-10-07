import { DoctorsList } from '~/components/find/DoctorsList';
import { DoctorsMap } from '~/components/find/DoctorsMap';

export function Doctors() {
  return (
    <div className="relative grid grid-cols-1 gap-6 md:grid-cols-[450px_1fr]">
      <DoctorsList />
      <DoctorsMap />
    </div>
  );
}
