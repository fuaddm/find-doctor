import { Facebook, Instagram, Linkedin, Mail, Phone } from 'lucide-react';
import { Link } from 'react-router';

export function Footer() {
  return (
    <div className="container flex flex-wrap justify-between gap-20 py-10">
      <div className="flex max-w-[400px] flex-col gap-5">
        <div>logo</div>
        <div className="text-xl font-medium text-gray-500">
          Stay up to date on the latest features and releases by joining our socials
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            to="#"
            className="rounded-full bg-teal-600 p-2 shadow-lg transition hover:bg-teal-500"
          >
            <Linkedin
              size={16}
              className="stroke-white"
            />
          </Link>
          <Link
            to="#"
            className="rounded-full bg-teal-600 p-2 shadow-lg transition hover:bg-teal-500"
          >
            <Instagram
              size={16}
              className="stroke-white"
            />
          </Link>
          <Link
            to="#"
            className="rounded-full bg-teal-600 p-2 shadow-lg transition hover:bg-teal-500"
          >
            <Facebook
              size={16}
              className="stroke-white"
            />
          </Link>
        </div>
      </div>
      <div className="flex flex-wrap gap-4 self-end md:gap-10">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-teal-600 p-2">
            <Mail
              size={16}
              className="stroke-white"
            />
          </div>
          <div className="font-medium text-gray-500">dmirciyevfuad@mail.ru</div>
        </div>
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-teal-600 p-2">
            <Phone
              size={16}
              className="stroke-white"
            />
          </div>
          <div className="font-medium text-gray-500">+994 77 295 89 91</div>
        </div>
      </div>
    </div>
  );
}
