import { Facebook, Instagram, Linkedin, Mail, Phone } from 'lucide-react';
import { Link } from 'react-router';

export function Footer() {
  return (
    <div className="container flex flex-wrap justify-between gap-20 py-10">
      <div className="flex max-w-[400px] flex-col gap-5">
        <Link
          to="/"
          className="w-fit"
        >
          logo
        </Link>
        <div className="text-lg font-medium text-gray-500">
          Yeniliklər və son paylaşımlardan xəbərdar qalmaq üçün bizi sosial şəbəkələrdə izləyin
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
          <div className="font-medium text-gray-500">find_doc@gmail.com</div>
        </div>
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-teal-600 p-2">
            <Phone
              size={16}
              className="stroke-white"
            />
          </div>
          <div className="font-medium text-gray-500">+994 55 555 55 55</div>
        </div>
      </div>
    </div>
  );
}
