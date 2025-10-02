import { HandCoins, Star } from 'lucide-react';
import MaleSvg from '~/assets/male.svg';
import FemaleSvg from '~/assets/female.svg';
import { useState, type HTMLProps } from 'react';
import { cn } from '~/libs/cn';

export interface DoctorList {
  full_name: string;
  gender: 'Male' | 'Female';
  img: string;
  rating: number;
  price: number;
  address: string;
  lat: number;
  lng: number;
  specialty: string;
  isSelected: boolean;
}

export function DoctorListCard({
  full_name,
  gender,
  img,
  rating,
  price,
  address,
  lat,
  lng,
  specialty,
  isSelected,
  ...props
}: DoctorList & HTMLProps<HTMLDivElement>) {
  const [image, setImage] = useState(img ? img : gender === 'Female' ? FemaleSvg : MaleSvg);

  return (
    <div
      className={cn({
        'group flex rounded-xl border border-gray-200 bg-transparent p-3 transition duration-50 ease-out': true,
        'border-white bg-teal-500': isSelected,
        'hover:bg-gray-100': !isSelected,
      })}
      {...props}
    >
      <div
        className={cn({
          'me-3 h-20 w-20 max-w-20 min-w-20 overflow-hidden rounded-xl border-2 border-white bg-gray-500': true,
          'border-white': isSelected,
        })}
      >
        <img
          src={image}
          onError={() => setImage(gender === 'Female' ? FemaleSvg : MaleSvg)}
          alt=""
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-col pt-2">
        <div
          className={cn({
            'text-gray-800': true,
            'text-white': isSelected,
          })}
        >
          {full_name}
        </div>
        <div
          className={cn({
            'text-sm text-gray-500': true,
            'text-teal-100': isSelected,
          })}
        >
          {specialty}
        </div>
        <div
          className={cn({
            'mb-2 text-sm text-gray-500': true,
            'text-teal-100': isSelected,
          })}
        >
          {address}
        </div>
      </div>
      <div className="ms-auto flex flex-col items-end gap-1">
        <div
          className={cn({
            'flex items-center gap-1 rounded-full bg-orange-500 px-2 py-0.25': true,
            'bg-orange-100': isSelected,
          })}
        >
          <Star
            size={12}
            className={cn({
              'fill-white stroke-white': true,
              'fill-orange-600 stroke-orange-600': isSelected,
            })}
          />
          <div
            className={cn({
              'text-[10px] text-white': true,
              'text-orange-600': isSelected,
            })}
          >
            {rating}
          </div>
        </div>
        <div
          className={cn({
            'flex items-center gap-1 rounded-full bg-green-500 px-2 py-0.25': true,
            'bg-teal-100': isSelected,
          })}
        >
          <HandCoins
            size={12}
            className={cn({
              'stroke-white': true,
              'stroke-teal-600': isSelected,
            })}
          />
          <div
            className={cn({
              'text-[10px] text-white': true,
              'text-teal-600': isSelected,
            })}
          >
            {price}₼
          </div>
        </div>
      </div>
    </div>
  );
}
