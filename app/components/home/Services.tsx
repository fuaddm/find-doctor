import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router';
import cardiologyPic from '~/assets/cardiology.webp';
import pediatricsPic from '~/assets/pediatrics.webp';
import neurologyPic from '~/assets/neurology.webp';
import generalCarePic from '~/assets/general-care.webp';
import ostPic from '~/assets/ort.webp';
import gastPic from '~/assets/gast.webp';
import { SectionHeader } from '~/components/molecules/SectionHeader';
import { Card } from '~/components/molecules/Card';

export function Services() {
  return (
    <div
      id="services"
      className="container py-10"
    >
      <SectionHeader
        suptitle="Xidmətlər"
        title="Peşəkar tibbi xidmət – sadə və əlçatan"
        subtitle="Sağlamlığını dəstəkləmək üçün mütəxəssislər tərəfindən göstərilən geniş tibbi xidmətlər təklif edirik"
        className="mb-10"
      >
        <Link
          to="/find-manual"
          className="group flex items-center gap-2"
        >
          <div>Bütün xidmətlərə bax</div>
          <div className="relative overflow-hidden">
            <ArrowUpRight
              size={16}
              className="transition group-hover:translate-x-full group-hover:-translate-y-full"
            />
            <div className="absolute top-0 left-0 h-full w-full -translate-x-full translate-y-full transition group-hover:translate-0">
              <ArrowUpRight size={16} />
            </div>
          </div>
        </Link>
      </SectionHeader>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
        <Card
          to="/find-manual?profession=42"
          title="Kardioloq"
          img={cardiologyPic}
        />
        <Card
          to="/find-manual?profession=66"
          title="Pediatr"
          img={pediatricsPic}
        />
        <Card
          to="/find-manual?profession=56"
          title="Nevroloq"
          img={neurologyPic}
        />
        <Card
          to="/find-manual?profession=2"
          title="Ailə Təbabəti"
          img={generalCarePic}
        />
        <Card
          to="/find-manual?profession=64"
          title="Ortoped"
          img={ostPic}
        />
        <Card
          to="/find-manual?profession=77"
          title="Qastroenteroloq"
          img={gastPic}
        />
      </div>
    </div>
  );
}
