import { DoctorsList } from '~/components/find/DoctorsList';

export function Doctors() {
  return (
    <div className="relative grid grid-cols-[450px_1fr] gap-6">
      <DoctorsList />

      <div className="sticky top-4 h-[400px] w-full rounded-xl bg-gray-500"></div>
    </div>
  );
}
