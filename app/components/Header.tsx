import { ArrowRight, Menu } from 'lucide-react';
import { Button } from 'react-aria-components';
import { Link } from 'react-router';
import { TextUpAnimation } from '~/components/fancy/TextUpAnimation';
import { cn } from '~/libs/cn';
import { useMenuStore } from '~/store/useMenu';

export function Header() {
  const isOpen = useMenuStore((state) => state.isOpen);
  const toggleMenu = useMenuStore((state) => state.toggleMenu);

  return (
    <div className="sticky top-0 left-0 z-1000 md:relative">
      <div className="relative z-100 bg-white">
        <div className="container flex items-center justify-between py-6">
          <div>logo</div>
          <nav className="hidden items-center gap-5 md:flex">
            <Link to="#">
              <TextUpAnimation text="About" />
            </Link>
            <Link to="#">
              <TextUpAnimation text="Services" />
            </Link>
            <Link to="#">
              <TextUpAnimation text="Doctors" />
            </Link>
            <Link to="#">
              <TextUpAnimation text="Blog" />
            </Link>
            <Link
              to="#"
              className="group flex items-center gap-2 rounded-full bg-teal-500 px-4 py-2 text-white transition hover:bg-teal-400"
            >
              <span>Contact Us</span>
              <ArrowRight
                size={16}
                className="transition group-hover:translate-x-0.75"
              />
            </Link>
          </nav>
          <Button
            onPress={toggleMenu}
            className={cn({
              'block aspect-square w-fit rounded-full bg-teal-500 p-3 transition md:hidden': true,
              'rotate-90': isOpen,
            })}
          >
            <Menu
              size={20}
              className="stroke-white"
            />
          </Button>
        </div>
      </div>
      <div
        className={cn({
          'absolute top-[calc(100%+1px)] left-0 z-0 flex w-full -translate-y-full flex-col items-center justify-center gap-6 overflow-hidden border-b border-gray-200 bg-white pt-2 pb-8 transition md:hidden': true,
          'translate-y-0': isOpen,
        })}
      >
        <Link to="#">About</Link>
        <Link to="#">Services</Link>
        <Link to="#">Doctors</Link>
        <Link to="#">Blog</Link>
        <Link
          to="#"
          className="group flex items-center gap-2 rounded-full bg-teal-600 px-4 py-2 text-white transition hover:bg-teal-500"
        >
          <span>Contact Us</span>
          <ArrowRight
            size={16}
            className="transition group-hover:translate-x-0.75"
          />
        </Link>
      </div>
    </div>
  );
}
