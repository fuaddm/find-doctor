import { Clock, HandCoins, Hospital, Map, Maximize2, Navigation, Pin, X } from 'lucide-react';
import MaleSvg from '~/assets/male.svg';
import FemaleSvg from '~/assets/female.svg';
import { useEffect, useState, type HTMLProps } from 'react';
import { cn } from '~/libs/cn';
import doctorLandscape from '~/assets/doctor-landscape.webp';

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
  experienceYears: number;
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
  experienceYears,
  isSelected,
  ...props
}: DoctorList & HTMLProps<HTMLDivElement>) {
  const [image, setImage] = useState(img ? img : gender === 'Female' ? FemaleSvg : MaleSvg);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      if (document.body.offsetWidth > 768) {
        document.body.style.paddingRight = '15px';
      }
    } else {
      setTimeout(() => {
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
      }, 250);
    }
  }, [open]);

  return (
    <>
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
                'relative me-3 h-20 w-20 max-w-20 min-w-20 overflow-hidden rounded-xl border-2 border-white bg-gray-500': true,
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
            <div className="flex w-full flex-col pt-1">
              <div className="flex justify-between">
                <div
                  className={cn({
                    'mb-1 text-wrap text-gray-800': true,
                    'text-white': isSelected,
                  })}
                >
                  {full_name}
                </div>
                <div
                  className={cn({
                    'flex h-fit items-center gap-1 rounded-full bg-green-600 px-2 py-0.25': true,
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
              <div
                className={cn({
                  'mb-1 w-fit rounded border border-gray-200 px-2 text-xs font-medium text-gray-500': true,
                  'border-teal-100 bg-teal-100 text-teal-800': isSelected,
                })}
              >
                {specialty}
              </div>
              <div className="mb-2 flex gap-1">
                <Hospital
                  size={14}
                  className={cn({
                    'mt-0.75 min-w-[14px] text-gray-500': true,
                    'text-teal-100': isSelected,
                  })}
                />
                <div
                  className={cn({
                    'overflow-hidden text-sm text-gray-500': true,
                    'text-teal-100': isSelected,
                  })}
                >
                  {address}
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
        <div className="grid grid-rows-2 gap-1">
          <button
            onClick={() => setOpen(true)}
            className="grid place-items-center rounded-lg bg-teal-600 px-3 transition hover:bg-teal-600/90"
          >
            <Maximize2
              size={14}
              className="text-white"
            />
          </button>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`}
            target="_blank"
            rel="noopener"
            className="grid place-items-center rounded-lg bg-teal-600 px-3"
          >
            <Map
              size={14}
              className="text-white"
            />
          </a>
        </div>
      </div>
      <div
        onClick={() => setOpen(false)}
        className={cn({
          'invisible fixed top-0 left-0 z-1000 h-full w-full bg-black/40 opacity-0 transition-all': true,
          'visible opacity-100': open,
        })}
      ></div>
      <div
        className={cn({
          'pointer-events-none invisible fixed top-0 left-1/2 z-1001 container h-full w-full -translate-x-1/2': true,
          visible: open,
        })}
      >
        <div
          className={cn({
            'pointer-events-auto invisible relative z-1001 container mt-5 h-full max-h-[calc(100%-60px)] w-full overflow-y-auto rounded-xl border border-gray-200 bg-white p-3 opacity-0 transition-all duration-250': true,
            'visible opacity-100': open,
          })}
        >
          <button
            onClick={() => setOpen(false)}
            className="absolute top-4 right-4 z-10 rounded-md bg-white/50 p-2 transition hover:bg-white"
          >
            <X
              size={24}
              className="text-gray-700"
            />
          </button>
          <div className="relative z-0 mb-10 md:mb-15">
            <div className="h-[100px] overflow-hidden rounded-md bg-gray-400 md:h-[160px]">
              <img
                src={doctorLandscape}
                className="h-full w-full object-cover"
                alt=""
              />
            </div>
            <div className="absolute bottom-0 left-1/2 aspect-square w-20 -translate-x-1/2 translate-y-1/2 overflow-hidden rounded-full border-4 border-white bg-gray-400 md:w-28 md:border-4">
              <img
                src={image}
                onError={() => setImage(gender === 'Female' ? FemaleSvg : MaleSvg)}
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          <div className="text-center text-xl font-semibold md:mb-1 md:text-2xl">{full_name}</div>
          <div className="mb-2 text-center text-base text-gray-500 md:text-lg">{specialty}</div>
          <div className="mx-auto flex w-fit items-center gap-1 rounded-md border border-teal-600 bg-teal-600/10 px-2 py-1 text-teal-600">
            <Pin className="aspect-square w-4" />
            <div className="text-xs md:text-sm">{address}</div>
          </div>
        </div>
      </div>
    </>
  );
}
