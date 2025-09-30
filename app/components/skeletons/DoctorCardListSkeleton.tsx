import { HandCoins, Star } from 'lucide-react';

export function DoctorCardListSkeleton() {
  return (
    <div className="flex rounded-xl border border-gray-200 bg-transparent p-3">
      <div className="me-3 h-20 w-20 max-w-20 min-w-20 overflow-hidden rounded-lg border-2 border-white bg-gray-500 group-hover:border-white"></div>
      <div className="flex w-full flex-col gap-1.5 pt-2">
        <div className="h-4 w-full max-w-[150px] rounded-full bg-gray-800"></div>
        <div className="h-4 w-full max-w-[100px] rounded-full bg-gray-500"></div>
        <div className="mb-2 h-4 w-full max-w-[166px] rounded-full bg-gray-500"></div>
      </div>
      <div className="ms-auto flex flex-col items-end gap-1">
        <div className="flex items-center gap-1 rounded-full bg-orange-500/50 px-2 py-0.25 group-hover:bg-orange-100">
          <Star
            size={12}
            className="invisible fill-orange-500 stroke-orange-500"
          />
          <div className="invisible text-[10px] text-orange-500">4</div>
        </div>
        <div className="flex items-center gap-1 rounded-full bg-green-500/50 px-2 py-0.25">
          <HandCoins
            size={12}
            className="invisible stroke-green-500"
          />
          <div className="invisible text-[10px] text-green-500">0₼</div>
        </div>
      </div>
    </div>
  );
}
