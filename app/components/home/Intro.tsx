import { ArrowRight, ArrowUpRight, Plus, Star, UsersRound, UserStar } from 'lucide-react';
import { Link } from 'react-router';
import reviewPic1 from '~/assets/review-1.webp';
import reviewPic2 from '~/assets/review-2.webp';
import reviewPic3 from '~/assets/review-3.webp';
import reviewPic4 from '~/assets/review-4.webp';
import doctorPic from '~/assets/main-doctor.webp';
import { Tooltip, TooltipContent, TooltipTrigger } from '~/components/ui/tooltip';

export function Intro() {
  return (
    <div
      id="about"
      className="container pt-10 pb-10 md:pt-12"
    >
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:items-center md:gap-20">
        <div>
          <div className="mb-6 flex items-center gap-3">
            <div className="relative w-[calc((32px*2/3)*4+32px)]">
              <div className="relative z-0 h-8 w-8 overflow-hidden rounded-full border-2 border-white bg-gray-400 outline-1 outline-black/10">
                <img
                  src={reviewPic1}
                  alt=""
                />
              </div>
              <div className="absolute top-0 left-0 z-10 h-8 w-8 translate-x-2/3 overflow-hidden rounded-full border-2 border-white bg-gray-400 outline-1 outline-black/10">
                <img
                  src={reviewPic2}
                  alt=""
                />
              </div>
              <div className="absolute top-0 left-0 z-10 h-8 w-8 translate-x-[calc(66%*2)] overflow-hidden rounded-full border-2 border-white bg-gray-400 outline-1 outline-black/10">
                <img
                  src={reviewPic3}
                  alt=""
                />
              </div>
              <div className="absolute top-0 left-0 z-10 h-8 w-8 translate-x-[calc(66%*3)] overflow-hidden rounded-full border-2 border-white bg-gray-400 outline-1 outline-black/10">
                <img
                  src={reviewPic4}
                  alt=""
                />
              </div>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="absolute top-0 left-0 z-10 grid h-8 w-8 translate-x-[calc(66%*4)] place-items-center overflow-hidden rounded-full border-2 border-teal-700 bg-teal-700 outline-1 outline-teal-700">
                    <Plus
                      size={20}
                      className="stroke-white"
                    />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="relative z-10">Tezliklə</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex gap-0.5">
                <Star
                  size={14}
                  className="fill-orange-400 stroke-orange-400"
                />
                <Star
                  size={14}
                  className="fill-orange-400 stroke-orange-400"
                />
                <Star
                  size={14}
                  className="fill-orange-400 stroke-orange-400"
                />
                <Star
                  size={14}
                  className="fill-orange-400 stroke-orange-400"
                />
                <Star
                  size={14}
                  className="fill-orange-400 stroke-orange-400"
                />
              </div>
              <div className="text-sm font-medium">Minlərlə rəyə əsasən</div>
            </div>
          </div>
          <h1 className="mb-6 text-4xl leading-12 font-medium tracking-tight md:text-[54px] md:leading-16">
            Sağlamlığın üçün doğru ünvanı tap
          </h1>
          <div className="mb-6 font-medium text-gray-500">Minlərlə ixtisaslı həkim arasından sənə uyğun olanı tap</div>
          <div className="mb-8 flex flex-wrap items-center gap-2">
            <Link
              to="/find"
              className="group flex items-center gap-2 rounded-full bg-teal-600 px-4 py-2 text-white transition hover:bg-teal-500"
            >
              <span>FindDoc-a keç</span>
              <ArrowRight
                size={16}
                className="transition group-hover:translate-x-0.75"
              />
            </Link>
            <Link
              to="#"
              className="group flex items-center gap-2 rounded-full px-4 py-2 font-medium transition"
            >
              <span>Fəaliyyətimiz</span>
              <ArrowUpRight
                size={16}
                className="transition group-hover:translate-x-0.75 group-hover:-translate-y-0.75"
              />
            </Link>
          </div>
          <div className="flex flex-wrap gap-8">
            <div className="flex items-center gap-4">
              <UsersRound
                size={32}
                className="aspect-square max-w-[32px] min-w-[32px] stroke-teal-800"
              />
              <div className="flex flex-col gap-1">
                <div className="text-lg font-medium">Dəstək</div>
                <div className="text-xs font-medium text-gray-500">24/7 xidmət</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <UserStar
                size={32}
                className="aspect-square max-w-[32px] min-w-[32px] stroke-teal-800"
              />
              <div className="flex flex-col gap-1">
                <div className="text-lg font-medium">Reytinq</div>
                <div className="text-xs font-medium text-gray-500">
                  İstifadəçilər tərəfindən 5 ulduzla qiymətləndirilib
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center md:justify-end">
          <Link
            to="/find-manual?profession=74"
            className="group/card relative block aspect-[1/1.2] w-full max-w-[420px]"
          >
            <div className="absolute top-0 left-0 z-0 h-full w-full -translate-x-8 translate-y-4 -rotate-4 rounded-3xl bg-gradient-to-b from-gray-100 to-transparent"></div>
            <div className="relative z-10 block aspect-[1/1.2] w-full overflow-hidden rounded-3xl border-5 border-white bg-gray-400">
              <img
                src={doctorPic}
                width={420}
                className="h-full w-full object-cover object-top"
                alt=""
              />
              <div className="absolute bottom-0 left-0 flex w-full items-end justify-between px-6 pt-12 pb-5">
                <div className="absolute top-0 left-0 z-10 h-full w-full backdrop-blur-[12px] [mask:linear-gradient(transparent,var(--color-teal-800),var(--color-teal-800))]"></div>
                <div className="relative z-20">
                  <div className="mb-0.5 font-medium text-white">Psixoloq</div>
                  <div className="text-2xl font-medium text-white">Dr. Elçin Məmmədov</div>
                </div>
                <div className="relative z-20 overflow-hidden rounded-full bg-teal-600 p-2 transition group-hover/card:bg-teal-500">
                  <ArrowUpRight
                    size={15}
                    className="stroke-white transition group-hover/card:translate-x-full group-hover/card:-translate-y-full"
                  />
                  <div className="absolute top-0 left-0 grid h-full w-full -translate-x-full translate-y-full place-items-center transition group-hover/card:translate-0">
                    <ArrowUpRight
                      size={15}
                      className="stroke-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
