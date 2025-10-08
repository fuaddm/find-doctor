import { Clock, HandCoins, Hospital, Map, Maximize2, Navigation, X } from 'lucide-react';
import MaleSvg from '~/assets/male.svg';
import FemaleSvg from '~/assets/female.svg';
import { useEffect, useRef, useState, type HTMLProps } from 'react';
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
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [image, setImage] = useState(img ? img : gender === 'Female' ? FemaleSvg : MaleSvg);
  const [rect, setRect] = useState<DOMRect | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (full_name === 'Aqil Şıxəliyev' && wrapperRef.current) {
      console.dir(wrapperRef.current?.getBoundingClientRect());
    }
    if (open) {
      document.body.style.overflow = 'hidden';
      if (document.body.offsetWidth > 768) {
        document.body.style.paddingRight = '15px';
      }
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }
  }, [open]);

  function setRectData() {
    if (wrapperRef.current) setRect(wrapperRef.current.getBoundingClientRect());
    setOpen(true);
  }

  return (
    <>
      <div className="flex gap-1">
        <div
          ref={wrapperRef}
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
                    'flex h-fit items-center gap-1 rounded-full bg-green-500 px-2 py-0.25': true,
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
            onClick={setRectData}
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
          'invisible fixed top-0 left-0 z-1000 h-full w-full bg-black/40 opacity-0 transition': true,
          'visible opacity-100': open,
        })}
      ></div>
      <div
        style={
          {
            '--top': `${rect?.y}px`,
            '--left': `${rect?.x}px`,
            '--width': `${rect?.width}px`,
            '--height': `${rect?.height}px`,
          } as React.CSSProperties
        }
        className={cn({
          'invisible fixed z-1001 container rounded-xl border border-gray-200 bg-white p-3': true,
          'doctorDetailModal visible': open,
        })}
      >
        <button
          onClick={() => setOpen(false)}
          className="absolute top-2 right-2 rounded-md p-2 transition hover:bg-gray-100 md:top-3 md:right-3"
        >
          <X
            size={24}
            className="text-gray-500"
          />
        </button>
      </div>
    </>
  );
}
