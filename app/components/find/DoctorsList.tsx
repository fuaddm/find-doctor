import { useActionData } from 'react-router';
import { DoctorListCard, type DoctorList } from '~/components/molecules/DoctorListCard';

const DOCTORS: DoctorList[] = [
  {
    full_name: 'Dr. Amelia Carter',
    img: 'https://randomuser.me/api/portraits/women/44.jpg',
    rating: 4.8,
    price: 120,
    address: '123 Main St, New York, NY',
    lat: 40.712776,
    lng: -74.005974,
    gender: 'female',
    specialty: 'Cardiologist',
  },
  {
    full_name: 'Dr. Ethan Morales',
    img: 'https://randomuser.me/api/portraits/men/32.jpg',
    rating: 4.6,
    price: 90,
    address: '456 Elm St, Los Angeles, CA',
    lat: 34.052235,
    lng: -118.243683,
    gender: 'male',
    specialty: 'Dermatologist',
  },
  {
    full_name: 'Dr. Sophia Nguyen',
    img: 'https://randomuser.me/api/portraits/women/55.jpg',
    rating: 4.9,
    price: 150,
    address: '789 Oak Ave, Chicago, IL',
    lat: 41.878113,
    lng: -87.629799,
    gender: 'female',
    specialty: 'Pediatrician',
  },
  {
    full_name: 'Dr. Liam Patel',
    img: 'https://randomuser.me/api/portraits/men/47.jpg',
    rating: 4.7,
    price: 110,
    address: '321 Pine Rd, Houston, TX',
    lat: 29.760427,
    lng: -95.369804,
    gender: 'male',
    specialty: 'Orthopedic Surgeon',
  },
  {
    full_name: 'Dr. Isabella Rossi',
    img: 'https://randomuser.me/api/portraits/women/60.jpg',
    rating: 4.5,
    price: 100,
    address: '654 Maple Blvd, Miami, FL',
    lat: 25.761681,
    lng: -80.191788,
    gender: 'female',
    specialty: 'Neurologist',
  },
];

export function DoctorsList() {
  const data = useActionData();

  return (
    <div className="flex flex-col gap-2">
      {data?.map((doctor) => {
        return (
          <DoctorListCard
            key={doctor.id}
            full_name={doctor.full_name}
            gender={'male'}
            img={''}
            rating={5}
            price={doctor.price}
            address={doctor.hospital.name}
            lat={doctor.hospital.lat}
            lng={doctor.hospital.lng}
            specialty={doctor.profession.prf_name}
          />
        );
      })}
    </div>
  );
}
