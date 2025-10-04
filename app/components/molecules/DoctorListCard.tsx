import { Clock, HandCoins, Map, MapPin, Navigation, Star } from 'lucide-react';
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
  distance: number | null;
  workHours: string;
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
  distance,
  workHours,
  isSelected,
  ...props
}: DoctorList & HTMLProps<HTMLDivElement>) {
  const [image, setImage] = useState(img ? img : gender === 'Female' ? FemaleSvg : MaleSvg);

  return (
    <div className="flex gap-1">
      <div
        className={cn({
          'group w-full rounded-xl border border-gray-200 bg-transparent p-3 transition duration-50 ease-out': true,
          'border-white bg-teal-500': isSelected,
          'hover:bg-gray-100': !isSelected,
        })}
        {...props}
      >
        <div className="flex pb-2">
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
          <div className="flex flex-col pt-1">
            <div
              className={cn({
                'mb-1 text-gray-800': true,
                'text-white': isSelected,
              })}
            >
              {full_name}
            </div>
            <div
              className={cn({
                'mb-1 w-fit rounded border border-gray-200 px-2 text-xs font-medium text-gray-500': true,
                'border-teal-100 bg-teal-100 text-teal-800': isSelected,
              })}
            >
              {specialty}
            </div>
            <div className="mb-2 flex gap-1">
              <MapPin
                size={14}
                className={cn({
                  'mt-0.75 min-w-[14px] text-gray-500': true,
                  'text-teal-100': isSelected,
                })}
              />
              <div
                className={cn({
                  'max-w-[80px] overflow-hidden text-sm overflow-ellipsis whitespace-nowrap text-gray-500 md:max-w-[200px]': true,
                  'text-teal-100': isSelected,
                })}
              >
                {address}
              </div>
            </div>
          </div>
          <div className="ms-auto flex flex-col items-end gap-1 pt-2">
            {/* <div
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
        </div> */}
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
        <div
          className={cn({
            'flex flex-wrap gap-6 border-t border-gray-200 px-1 pt-2': true,
            'border-teal-200': isSelected,
          })}
        >
          {distance && (
            <div>
              <div
                className={cn({
                  'mb-0.5 text-sm text-gray-500': true,
                  'text-teal-100': isSelected,
                })}
              >
                Məsafə
              </div>
              <div className="flex items-center gap-1.5">
                <Navigation
                  size={12}
                  className={cn({
                    'text-teal-50': isSelected,
                  })}
                />
                <div
                  className={cn({
                    'text-xs': true,
                    'text-teal-50': isSelected,
                  })}
                >
                  {distance.toFixed(2) + 'km'}
                </div>
              </div>
            </div>
          )}
          <div>
            <div
              className={cn({
                'mb-0.5 text-sm text-gray-500': true,
                'text-teal-100': isSelected,
              })}
            >
              İş saatları
            </div>
            <div className="flex items-center gap-1.5">
              <Clock
                size={12}
                className={cn({
                  'text-teal-50': isSelected,
                })}
              />
              <div
                className={cn({
                  'text-xs': true,
                  'text-teal-50': isSelected,
                })}
              >
                {workHours}
              </div>
            </div>
          </div>
        </div>
      </div>
      <a
        href={`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`}
        target="_blank"
        rel="noopener"
        className="grid place-items-center rounded-lg bg-teal-600 px-3 transition duration-50 ease-out"
      >
        <Map
          size={14}
          className="text-white"
        />
      </a>
    </div>
  );
}
