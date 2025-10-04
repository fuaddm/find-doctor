import { ArrowUpRight } from 'lucide-react';
import { Link, type LinkProps } from 'react-router';

export function Card({ title, img, ...props }: { title: string; img: string } & LinkProps) {
  return (
    <Link
      className="group/card relative block aspect-[1/1.2] w-full max-w-[420px]"
      {...props}
    >
      <div className="relative z-10 block aspect-[1/1.2] w-full overflow-hidden rounded-xl bg-gray-400 md:rounded-3xl">
        <img
          src={img}
          width={420}
          className="h-full w-full object-cover"
          alt=""
        />
        <div className="absolute bottom-0 left-0 flex w-full items-center justify-between px-4 pt-10 pb-3 md:px-6 md:pt-20 md:pb-5">
          <div className="absolute top-0 left-0 z-10 h-full w-full backdrop-blur-[12px] [mask:linear-gradient(transparent,var(--color-teal-800),var(--color-teal-800))]"></div>
          <div className="relative z-20">
            <div className="text-sm font-medium text-white md:text-2xl">{title}</div>
          </div>
          <div className="relative z-20 grid aspect-square w-[24px] min-w-[24px] place-items-center overflow-hidden rounded-full bg-white transition group-hover/card:bg-transparent md:w-[32px] md:min-w-[32px]">
            <ArrowUpRight
              size={15}
              className="aspect-square max-w-[12px] min-w-[12px] stroke-black transition group-hover/card:translate-x-full group-hover/card:-translate-y-full md:max-w-[15px] md:min-w-[15px]"
            />
            <div className="absolute top-0 left-0 z-10 h-full w-full translate-x-full -translate-y-full rounded-full bg-teal-600 transition group-hover/card:translate-0"></div>
            <div className="absolute top-0 left-0 z-20 grid h-full w-full -translate-x-full translate-y-full place-items-center transition group-hover/card:translate-0">
              <ArrowUpRight
                size={15}
                className="aspect-square max-w-[12px] min-w-[12px] stroke-white md:max-w-[15px] md:min-w-[15px]"
              />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
