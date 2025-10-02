import { Check, ChevronsUpDown, Star } from 'lucide-react';
import { cn } from '~/lib/utils';
import { Button } from '~/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '~/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover';
import { useState } from 'react';
import { MyInput } from '~/components/ui/input';
import { useSearchParams } from 'react-router';
import { debounce } from '~/libs/debounce';

export const JOB_OPTIONS = [
  { value: 1, label: 'Aerokosmik Tibb' },
  { value: 2, label: 'Ailə Təbabəti' },
  { value: 3, label: 'Akupunktur' },
  { value: 4, label: 'Allergiya və Sinə Xəstəlikləri' },
  { value: 5, label: 'Allerqoloq' },
  { value: 6, label: 'Alqologiya (Anesteziya və Reanimasiya)' },
  { value: 7, label: 'Alqologiya (Fiziki Təbabət və Reabilitasiya)' },
  { value: 8, label: 'Alqologiya (Neurologiya)' },
  { value: 9, label: 'Anestezioloq' },
  { value: 10, label: 'Biorezonans Sertifikatlı Tibb Həkimi' },
  { value: 11, label: 'Cərrahi Onkologiya' },
  { value: 12, label: 'Damar Cərrahiyyəsi' },
  { value: 13, label: 'Daxili xəstəliklər' },
  { value: 14, label: 'Dermatoloq' },
  { value: 15, label: 'Döş Cərrahiyyəsi' },
  { value: 16, label: 'Endokrin Cərrahiyyə' },
  { value: 17, label: 'Endokrinoloq' },
  { value: 18, label: 'Əl Cərrahiyyəsi və Mikrocərrahiyyə' },
  { value: 19, label: 'Fitoterapiya' },
  { value: 20, label: 'Fizioterapiya' },
  { value: 21, label: 'Fleboloq' },
  { value: 22, label: 'Ftiziatr' },
  { value: 23, label: 'Funksional Tibb' },
  { value: 24, label: 'Genetik' },
  { value: 25, label: 'Geriatriya' },
  { value: 26, label: 'Ginekologiya və Mamalıq' },
  { value: 27, label: 'Ginekoloji Onkoloji Cərrahiyyə' },
  { value: 28, label: 'Hematoloq' },
  { value: 29, label: 'Hemodializ' },
  { value: 30, label: 'Hepatoloq' },
  { value: 31, label: 'Hərbi Sahə Tibb' },
  { value: 32, label: 'Histoloq' },
  { value: 33, label: 'Hüceyrə təbabəti' },
  { value: 34, label: 'İdman Tibb' },
  { value: 35, label: 'İmmunologiya' },
  { value: 36, label: 'İnfeksionist' },
  { value: 37, label: 'İnkişaf Pediatriyası' },
  { value: 38, label: 'İntensiv Baxım (Daxili Xəstəliklər Reanimasiyası)' },
  { value: 39, label: 'İntensiv Baxım (Sinə Xəstəlikləri və İntensiv Baxım)' },
  { value: 40, label: 'Invaziv Radyoloji' },
  { value: 41, label: 'İş yeri həkimi' },
  { value: 42, label: 'Kardioloq' },
  { value: 43, label: 'Klinik Biokimya' },
  { value: 44, label: 'Klinik Genetika' },
  { value: 45, label: 'Klinik Molekulyar Genetika' },
  { value: 46, label: 'Klinik neyrofiziologiya' },
  { value: 47, label: 'Koloproktolog' },
  { value: 48, label: 'Kosmetoloq' },
  { value: 49, label: 'Mama ginekoloq' },
  { value: 50, label: 'Mammoloq' },
  { value: 51, label: 'Məhkəmə Tibb' },
  { value: 52, label: 'Mikologiya' },
  { value: 53, label: 'Narkoloq' },
  { value: 54, label: 'Nefroloq' },
  { value: 55, label: 'Neonatologiya' },
  { value: 56, label: 'Nevroloq' },
  { value: 57, label: 'Nevropatologiya' },
  { value: 58, label: 'Neyrocərrah' },
  { value: 59, label: 'Neyroradiologiya' },
  { value: 60, label: 'Nüvə təbabəti' },
  { value: 61, label: 'Oftalmoloq' },
  { value: 62, label: 'Onko-Ginekoloq' },
  { value: 63, label: 'Onkoloq' },
  { value: 64, label: 'Ortopediya və Travmatologiya' },
  { value: 65, label: 'Otolarinqoloq' },
  { value: 66, label: 'Pediatr' },
  { value: 67, label: 'Pediatrik Qastroenterologiya, Hepatologiya və Qidalanma' },
  { value: 68, label: 'Pediatrik Reanimasiya' },
  { value: 69, label: 'Perinatologiya - Riskli Hamiləliklər' },
  { value: 70, label: 'Peşə təbabəti' },
  { value: 71, label: 'Peşə və peşə xəstəlikləri' },
  { value: 72, label: 'Plastik cərrah' },
  { value: 73, label: 'Proktoloq' },
  { value: 74, label: 'Psixiatr' },
  { value: 75, label: 'Pulmonoloq' },
  { value: 76, label: 'Qastroenteroloji Cərrahiyyə' },
  { value: 77, label: 'Qastroenteroloq' },
  { value: 78, label: 'Radiasiya onkologiyası' },
  { value: 79, label: 'Radioloq' },
  { value: 80, label: 'Reanimatoloq' },
  { value: 81, label: 'Reproduktiv Endokrinologiya və Sonsuzluq' },
  { value: 82, label: 'Revmatoloq' },
  { value: 83, label: 'Sitopatologiya' },
  { value: 84, label: 'Stomatoloq' },
  { value: 85, label: 'Sualtı təbabət və hiperbarik tibb' },
  { value: 86, label: 'Süd vəzi cərrahı' },
  { value: 87, label: 'Terapevt' },
  { value: 88, label: 'Təcili Tibbi Yardım' },
  { value: 89, label: 'Tibbi Estetik Tibb Doktoru' },
  { value: 90, label: 'Tibbi Onkologiya' },
  { value: 91, label: 'Tiroidoloq' },
  { value: 92, label: 'Toksikologiya' },
  { value: 93, label: 'Torokal cərrah' },
  { value: 94, label: 'Transplantoloq' },
  { value: 95, label: 'Travmatoloq' },
  { value: 96, label: 'Ümumi cərrah' },
  { value: 97, label: 'Ürək damar cərrahı' },
  { value: 98, label: 'Uroloq' },
  { value: 99, label: 'Uroonkologiya' },
  { value: 100, label: 'Uroradiologiya' },
  { value: 101, label: 'Uşaq cərrahı' },
  { value: 102, label: 'Uşaq döş qəfəsinin xəstəlikləri' },
  { value: 103, label: 'Uşaq endokrinologiyası' },
  { value: 104, label: 'Uşaq Endokrinologiyası və Metabolik Xəstəliklər' },
  { value: 105, label: 'Uşaq Genetik Xəstəlikləri' },
  { value: 106, label: 'Uşaq Hematologiyası' },
  { value: 107, label: 'Uşaq İmmunologiyası və Allergiya' },
  { value: 108, label: 'Uşaq Kardiologiyası' },
  { value: 109, label: 'Uşaq Metabolik Xəstəlikləri' },
  { value: 110, label: 'Uşaq nevrologiyası' },
  { value: 111, label: 'Uşaq Onkologiyası' },
  { value: 112, label: 'Uşaq Ortopediyası' },
  { value: 113, label: 'Uşaq Radiologiyası' },
  { value: 114, label: 'Uşaq revmatologiyası' },
  { value: 115, label: 'Uşaq Təcili' },
  { value: 116, label: 'Uşaq Ürək-Damar Cərrahiyyəsi' },
  { value: 117, label: 'Uşaq Urologiyası' },
  { value: 118, label: 'Uşaq Urologiyası (Cərrahiyyə)' },
  { value: 119, label: 'Uşaq və Yeniyetmə Psixiatrı' },
  { value: 120, label: 'Uşaq Yoluxucu Xəstəlikləri' },
  { value: 121, label: 'USM Həkimi' },
  { value: 122, label: 'Vertebroloq' },
  { value: 123, label: 'Vərəm, Allergik Xəstəliklər' },
  { value: 124, label: 'Virusologiya' },
  { value: 125, label: 'Yoluxucu Xəstəliklər və Klinik Mikrobiologiya' },
];

const GENDERS = [
  { value: 'Male', label: 'Male' },
  { value: 'Female', label: 'Female' },
];

export function Filter() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [open, setOpen] = useState(false);
  const [professionValue, setProfession] = useState(searchParams.get('profession') ?? '');

  const [open2, setOpen2] = useState(false);
  const [genderValue, setGender] = useState(searchParams.get('gender') ?? '');

  const [open3, setOpen3] = useState(false);
  const [ratingValue, setRating] = useState(searchParams.get('rating') ?? '');

  function setParamForPrice(value: string, name: 'minPrice' | 'maxPrice') {
    setSearchParams((searchParams) => {
      if (value) searchParams.set(name, value);
      else searchParams.delete(name);

      return searchParams;
    });
  }

  const debouncedSearchParams = debounce(setParamForPrice, 500);

  return (
    <div className="mb-10 flex flex-col gap-2 md:flex-row md:gap-3">
      <Popover
        open={open}
        onOpenChange={setOpen}
      >
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between md:w-[350px]"
          >
            {professionValue
              ? JOB_OPTIONS.find((job) => String(job.value) === professionValue)?.label
              : 'Select specialty...'}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          side="bottom"
          avoidCollisions={false}
          className="w-[var(--radix-popover-trigger-width)] p-0"
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
                    value={String(job.value)}
                    keywords={[job.label]}
                    onSelect={(currentValue) => {
                      setProfession(currentValue === professionValue ? '' : currentValue);
                      setSearchParams((searchParams) => {
                        if (professionValue !== currentValue) searchParams.set('profession', currentValue);
                        else searchParams.delete('profession');

                        return searchParams;
                      });

                      setOpen(false);
                    }}
                  >
                    {job.label}
                    <Check
                      className={cn('ml-auto', professionValue === String(job.value) ? 'opacity-100' : 'opacity-0')}
                    />
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
            className="w-full justify-between md:w-[200px]"
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
          className="w-[var(--radix-popover-trigger-width)] p-0"
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
            className="w-full justify-between md:w-[150px]"
          >
            {genderValue ? GENDERS.find((gender) => gender.value === genderValue)?.label : 'Select gender...'}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          side="bottom"
          avoidCollisions={false}
          className="w-[var(--radix-popover-trigger-width)] p-0"
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
      <div className="flex w-full flex-col gap-2 md:flex-row">
        <MyInput
          type="number"
          defaultValue={searchParams.get('minPrice') ?? ''}
          onChange={(e) => {
            debouncedSearchParams(e.target.value, 'minPrice');
          }}
          placeholder="Min. price"
          className="w-full"
        />
        <MyInput
          type="number"
          defaultValue={searchParams.get('maxPrice') ?? ''}
          onChange={(e) => {
            debouncedSearchParams(e.target.value, 'maxPrice');
          }}
          placeholder="Max. price"
          className="w-full"
        />
      </div>
    </div>
  );
}
