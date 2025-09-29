import { Check, ChevronsUpDown, Star } from 'lucide-react';
import { cn } from '~/lib/utils';
import { Button } from '~/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '~/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover';
import { useState } from 'react';
import { Input } from 'react-aria-components';
import { MyInput } from '~/components/ui/input';
import { useSearchParams } from 'react-router';

const JOB_OPTIONS = [
  { value: 'general_practitioner', label: 'General Practitioner' },
  { value: 'family_physician', label: 'Family Physician' },
  { value: 'internist', label: 'Internist' },
  { value: 'hospitalist', label: 'Hospitalist' },
  { value: 'cardiologist', label: 'Cardiologist' },
  { value: 'neurologist', label: 'Neurologist' },
  { value: 'endocrinologist', label: 'Endocrinologist' },
  { value: 'pulmonologist', label: 'Pulmonologist' },
  { value: 'gastroenterologist', label: 'Gastroenterologist' },
  { value: 'nephrologist', label: 'Nephrologist' },
  { value: 'hematologist', label: 'Hematologist' },
  { value: 'oncologist', label: 'Oncologist' },
  { value: 'infectious_disease_specialist', label: 'Infectious Disease Specialist' },
  { value: 'rheumatologist', label: 'Rheumatologist' },
  { value: 'general_surgeon', label: 'General Surgeon' },
  { value: 'orthopedic_surgeon', label: 'Orthopedic Surgeon' },
  { value: 'neurosurgeon', label: 'Neurosurgeon' },
  { value: 'cardiothoracic_surgeon', label: 'Cardiothoracic Surgeon' },
  { value: 'plastic_surgeon', label: 'Plastic Surgeon' },
  { value: 'ent_surgeon_otolaryngologist', label: 'ENT Surgeon (Otolaryngologist)' },
  { value: 'urologist', label: 'Urologist' },
  { value: 'vascular_surgeon', label: 'Vascular Surgeon' },
  { value: 'transplant_surgeon', label: 'Transplant Surgeon' },
  { value: 'pediatrician', label: 'Pediatrician' },
  { value: 'neonatologist', label: 'Neonatologist' },
  { value: 'obstetrician_gynecologist', label: 'Obstetrician-Gynecologist (OB-GYN)' },
  { value: 'reproductive_endocrinologist', label: 'Reproductive Endocrinologist' },
  { value: 'maternal_fetal_medicine_specialist', label: 'Maternal-Fetal Medicine Specialist' },
  { value: 'pediatric_surgeon', label: 'Pediatric Surgeon' },
  { value: 'radiologist', label: 'Radiologist' },
  { value: 'pathologist', label: 'Pathologist' },
  { value: 'anesthesiologist', label: 'Anesthesiologist' },
  { value: 'nuclear_medicine_physician', label: 'Nuclear Medicine Physician' },
  { value: 'interventional_radiologist', label: 'Interventional Radiologist' },
  { value: 'clinical_geneticist', label: 'Clinical Geneticist' },
  { value: 'clinical_pharmacologist', label: 'Clinical Pharmacologist' },
  { value: 'psychiatrist', label: 'Psychiatrist' },
  { value: 'child_and_adolescent_psychiatrist', label: 'Child and Adolescent Psychiatrist' },
  { value: 'forensic_psychiatrist', label: 'Forensic Psychiatrist' },
  { value: 'addiction_psychiatrist', label: 'Addiction Psychiatrist' },
  { value: 'geriatric_psychiatrist', label: 'Geriatric Psychiatrist' },
  { value: 'dermatologist', label: 'Dermatologist' },
  { value: 'ophthalmologist', label: 'Ophthalmologist' },
  { value: 'allergist_immunologist', label: 'Allergist/Immunologist' },
  { value: 'geriatrician', label: 'Geriatrician' },
  { value: 'sports_medicine_physician', label: 'Sports Medicine Physician' },
  { value: 'emergency_medicine_physician', label: 'Emergency Medicine Physician' },
  { value: 'occupational_medicine_specialist', label: 'Occupational Medicine Specialist' },
  { value: 'public_health_physician', label: 'Public Health Physician' },
  { value: 'palliative_care_specialist', label: 'Palliative Care Specialist' },
];

const GENDERS = [
  { value: 'men', label: 'Men' },
  { value: 'women', label: 'Women' },
];

export function Filter() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [open, setOpen] = useState(false);
  const [jobValue, setJob] = useState('');

  const [open2, setOpen2] = useState(false);
  const [genderValue, setGender] = useState('');

  const [open3, setOpen3] = useState(false);
  const [ratingValue, setRating] = useState('');

  return (
    <div className="mb-10 flex gap-3">
      <Popover
        open={open}
        onOpenChange={setOpen}
      >
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[350px] justify-between"
          >
            {jobValue ? JOB_OPTIONS.find((job) => job.value === jobValue)?.label : 'Select specialty...'}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          side="bottom"
          avoidCollisions={false}
          className="w-[350px] p-0"
        >
          <Command>
            <CommandInput
              placeholder="Search job..."
              className="h-9"
            />
            <CommandList>
              <CommandEmpty>No specialty found.</CommandEmpty>
              <CommandGroup>
                {JOB_OPTIONS.map((job) => (
                  <CommandItem
                    key={job.value}
                    value={job.value}
                    onSelect={(currentValue) => {
                      setJob(currentValue === jobValue ? '' : currentValue);
                      setSearchParams((searchParams) => {
                        if (jobValue !== currentValue) searchParams.set('job', currentValue);
                        else searchParams.delete('job');

                        return searchParams;
                      });

                      setOpen(false);
                    }}
                  >
                    {job.label}
                    <Check className={cn('ml-auto', jobValue === job.value ? 'opacity-100' : 'opacity-0')} />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <Popover
        open={open3}
        onOpenChange={setOpen3}
      >
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open3}
            className="w-[250px] justify-between"
          >
            {ratingValue ? (
              <div className="flex items-center gap-1">
                <Star
                  className={cn({
                    'stroke-orange-400': true,
                    'fill-orange-400': Number(ratingValue) >= 1,
                  })}
                />
                <Star
                  className={cn({
                    'stroke-orange-400': true,
                    'fill-orange-400': Number(ratingValue) >= 2,
                  })}
                />
                <Star
                  className={cn({
                    'stroke-orange-400': true,
                    'fill-orange-400': Number(ratingValue) >= 3,
                  })}
                />
                <Star
                  className={cn({
                    'stroke-orange-400': true,
                    'fill-orange-400': Number(ratingValue) >= 4,
                  })}
                />
                <Star
                  className={cn({
                    'stroke-orange-400': true,
                    'fill-orange-400': Number(ratingValue) >= 5,
                  })}
                />
              </div>
            ) : (
              'Select rating...'
            )}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          side="bottom"
          avoidCollisions={false}
          className="w-[250px] p-0"
        >
          <Command>
            <CommandList>
              <CommandGroup>
                <CommandItem
                  value="5"
                  onSelect={(currentValue) => {
                    setRating(currentValue === ratingValue ? '' : currentValue);
                    setSearchParams((searchParams) => {
                      if (ratingValue !== currentValue) searchParams.set('rating', currentValue);
                      else searchParams.delete('rating');

                      return searchParams;
                    });
                    setOpen3(false);
                  }}
                >
                  <div className="flex items-center gap-1">
                    <Star className="fill-orange-400 stroke-orange-400" />
                    <Star className="fill-orange-400 stroke-orange-400" />
                    <Star className="fill-orange-400 stroke-orange-400" />
                    <Star className="fill-orange-400 stroke-orange-400" />
                    <Star className="fill-orange-400 stroke-orange-400" />
                  </div>
                  <Check className={cn('ml-auto', ratingValue === '5' ? 'opacity-100' : 'opacity-0')} />
                </CommandItem>
                <CommandItem
                  value="4"
                  onSelect={(currentValue) => {
                    setRating(currentValue === ratingValue ? '' : currentValue);
                    setSearchParams((searchParams) => {
                      if (ratingValue !== currentValue) searchParams.set('rating', currentValue);
                      else searchParams.delete('rating');

                      return searchParams;
                    });
                    setOpen3(false);
                  }}
                >
                  <div className="flex items-center gap-1">
                    <Star className="fill-orange-400 stroke-orange-400" />
                    <Star className="fill-orange-400 stroke-orange-400" />
                    <Star className="fill-orange-400 stroke-orange-400" />
                    <Star className="fill-orange-400 stroke-orange-400" />
                    <Star className="stroke-orange-400" />
                  </div>
                  <Check className={cn('ml-auto', ratingValue === '4' ? 'opacity-100' : 'opacity-0')} />
                </CommandItem>
                <CommandItem
                  value="3"
                  onSelect={(currentValue) => {
                    setRating(currentValue === ratingValue ? '' : currentValue);
                    setSearchParams((searchParams) => {
                      if (ratingValue !== currentValue) searchParams.set('rating', currentValue);
                      else searchParams.delete('rating');

                      return searchParams;
                    });
                    setOpen3(false);
                  }}
                >
                  <div className="flex items-center gap-1">
                    <Star className="fill-orange-400 stroke-orange-400" />
                    <Star className="fill-orange-400 stroke-orange-400" />
                    <Star className="fill-orange-400 stroke-orange-400" />
                    <Star className="stroke-orange-400" />
                    <Star className="stroke-orange-400" />
                  </div>
                  <Check className={cn('ml-auto', ratingValue === '3' ? 'opacity-100' : 'opacity-0')} />
                </CommandItem>
                <CommandItem
                  value="2"
                  onSelect={(currentValue) => {
                    setRating(currentValue === ratingValue ? '' : currentValue);
                    setSearchParams((searchParams) => {
                      if (ratingValue !== currentValue) searchParams.set('rating', currentValue);
                      else searchParams.delete('rating');

                      return searchParams;
                    });
                    setOpen3(false);
                  }}
                >
                  <div className="flex items-center gap-1">
                    <Star className="fill-orange-400 stroke-orange-400" />
                    <Star className="fill-orange-400 stroke-orange-400" />
                    <Star className="stroke-orange-400" />
                    <Star className="stroke-orange-400" />
                    <Star className="stroke-orange-400" />
                  </div>
                  <Check className={cn('ml-auto', ratingValue === '2' ? 'opacity-100' : 'opacity-0')} />
                </CommandItem>
                <CommandItem
                  value="1"
                  onSelect={(currentValue) => {
                    setRating(currentValue === ratingValue ? '' : currentValue);
                    setSearchParams((searchParams) => {
                      if (ratingValue !== currentValue) searchParams.set('rating', currentValue);
                      else searchParams.delete('rating');

                      return searchParams;
                    });
                    setOpen3(false);
                  }}
                >
                  <div className="flex items-center gap-1">
                    <Star className="fill-orange-400 stroke-orange-400" />
                    <Star className="stroke-orange-400" />
                    <Star className="stroke-orange-400" />
                    <Star className="stroke-orange-400" />
                    <Star className="stroke-orange-400" />
                  </div>
                  <Check className={cn('ml-auto', ratingValue === '1' ? 'opacity-100' : 'opacity-0')} />
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <Popover
        open={open2}
        onOpenChange={setOpen2}
      >
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open2}
            className="w-[200px] justify-between"
          >
            {genderValue ? GENDERS.find((gender) => gender.value === genderValue)?.label : 'Select gender...'}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          side="bottom"
          avoidCollisions={false}
          className="w-[200px] p-0"
        >
          <Command>
            <CommandList>
              <CommandEmpty>No gender found.</CommandEmpty>
              <CommandGroup>
                {GENDERS.map((gender) => (
                  <CommandItem
                    key={gender.value}
                    value={gender.value}
                    onSelect={(currentValue) => {
                      setGender(currentValue === genderValue ? '' : currentValue);
                      setSearchParams((searchParams) => {
                        if (genderValue !== currentValue) searchParams.set('gender', currentValue);
                        else searchParams.delete('gender');

                        return searchParams;
                      });

                      setOpen2(false);
                    }}
                  >
                    {gender.label}
                    <Check className={cn('ml-auto', genderValue === gender.value ? 'opacity-100' : 'opacity-0')} />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <div className="flex gap-2">
        <MyInput
          type="number"
          placeholder="Min. price"
        />
        <MyInput
          type="number"
          placeholder="Max. price"
        />
      </div>
    </div>
  );
}
