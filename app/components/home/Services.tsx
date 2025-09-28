import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router';
import cardiologyPic from '~/assets/cardiology.webp';
import pediatricsPic from '~/assets/pediatrics.webp';
import neurologyPic from '~/assets/neurology.webp';
import { SectionHeader } from '~/components/molecules/SectionHeader';
import { Card } from '~/components/molecules/Card';

export function Services() {
  return (
    <div className="container py-10">
      <SectionHeader
        suptitle="Services"
        title="Expert care made simple"
        subtitle="We offer a wide range of expert-led healthcare services built to support your well-being"
        className="mb-10"
      >
        <Link
          to="#"
          className="group flex items-center gap-2"
        >
          <div>View all services</div>
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
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        <Card
          to="#"
          title="Cardiology"
          img={cardiologyPic}
        />
        <Card
          to="#"
          title="Pediatrics"
          img={pediatricsPic}
        />
        <Card
          to="#"
          title="Neurology"
          img={neurologyPic}
        />
        <Card
          to="#"
          title="Cardiology"
          img={cardiologyPic}
        />
        <Card
          to="#"
          title="Pediatrics"
          img={pediatricsPic}
        />
        <Card
          to="#"
          title="Neurology"
          img={neurologyPic}
        />
      </div>
    </div>
  );
}
