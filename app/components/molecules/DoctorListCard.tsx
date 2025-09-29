import { HandCoins, Star } from 'lucide-react';

export interface DoctorList {
  full_name: string;
  gender: 'male' | 'female';
  img: string;
  rating: number;
  price: number;
  address: string;
  lat: number;
  lng: number;
  specialty: string;
}

export function DoctorListCard({ full_name, gender, img, rating, price, address, lat, lng, specialty }: DoctorList) {
  return (
    <div className="group flex rounded-xl border border-gray-200 bg-transparent p-3 transition hover:border-white hover:bg-teal-500">
      <div className="me-3 h-20 w-20 overflow-hidden rounded-lg border-2 border-white bg-gray-500 group-hover:border-white">
        <img
          src={img}
          alt=""
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-col pt-2">
        <div className="text-gray-800 group-hover:text-white">{full_name}</div>
        <div className="text-sm text-gray-500 group-hover:text-teal-100">{specialty}</div>
        <div className="mb-2 text-sm text-gray-500 group-hover:text-teal-100">{address}</div>
      </div>
      <div className="ms-auto flex flex-col items-end gap-1">
        <div className="flex items-center gap-1 rounded-full bg-orange-500 px-2 py-0.25 group-hover:bg-orange-100">
          <Star
            size={12}
            className="fill-white stroke-white group-hover:fill-orange-600 group-hover:stroke-orange-600"
          />
          <div className="text-[10px] text-white group-hover:text-orange-600">{rating}</div>
        </div>
        <div className="flex items-center gap-1 rounded-full bg-green-500 px-2 py-0.25 group-hover:bg-teal-100">
          <HandCoins
            size={12}
            className="stroke-white group-hover:stroke-teal-600"
          />
          <div className="text-[10px] text-white group-hover:text-teal-600">{price}₼</div>
        </div>
      </div>
    </div>
  );
}
