import { Check, ChevronsUpDown, Star } from 'lucide-react';
import { cn } from '~/lib/utils';
import { Button } from '~/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '~/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover';
import { useState } from 'react';
import { MyInput } from '~/components/ui/input';
import { useSearchParams } from 'react-router';

export const JOB_OPTIONS = [
  { value: 'aerokosmik_tibb', label: 'Aerokosmik Tibb' },
  { value: 'aile_tebabati', label: 'Ailə Təbabəti' },
  { value: 'akupunktur', label: 'Akupunktur' },
  { value: 'allergiya_ve_sine_xestelikleri', label: 'Allergiya və Sinə Xəstəlikləri' },
  { value: 'allerqoloq', label: 'Allerqoloq' },
  { value: 'alqologiya_anesteziya_reanimasiya', label: 'Alqologiya (Anesteziya və Reanimasiya)' },
  { value: 'alqologiya_fiziki_tebabət_reabilitasiya', label: 'Alqologiya (Fiziki Təbabət və Reabilitasiya)' },
  { value: 'alqologiya_nevrologiya', label: 'Alqologiya (Neurologiya)' },
  { value: 'anestezioloq', label: 'Anestezioloq' },
  { value: 'biorezonans_sertifikatli_tibb_hekimi', label: 'Biorezonans Sertifikatlı Tibb Həkimi' },
  { value: 'cerrahi_onkologiya', label: 'Cərrahi Onkologiya' },
  { value: 'damar_cerrahiyyəsi', label: 'Damar Cərrahiyyəsi' },
  { value: 'daxili_xestelikler', label: 'Daxili xəstəliklər' },
  { value: 'dermatoloq', label: 'Dermatoloq' },
  { value: 'dos_cerrahiyyəsi', label: 'Döş Cərrahiyyəsi' },
  { value: 'endokrin_cerrahiyyə', label: 'Endokrin Cərrahiyyə' },
  { value: 'endokrinoloq', label: 'Endokrinoloq' },
  { value: 'el_cerrahiyyəsi_ve_mikrocerrahiyyə', label: 'Əl Cərrahiyyəsi və Mikrocərrahiyyə' },
  { value: 'fitoterapiya', label: 'Fitoterapiya' },
  { value: 'fizioterapiya', label: 'Fizioterapiya' },
  { value: 'fleboloq', label: 'Fleboloq' },
  { value: 'ftiziatr', label: 'Ftiziatr' },
  { value: 'funksional_tibb', label: 'Funksional Tibb' },
  { value: 'genetik', label: 'Genetik' },
  { value: 'geriatriya', label: 'Geriatriya' },
  { value: 'ginekologiya_ve_mamaliq', label: 'Ginekologiya və Mamalıq' },
  { value: 'ginekoloji_onkoloji_cerrahiyyə', label: 'Ginekoloji Onkoloji Cərrahiyyə' },
  { value: 'hematoloq', label: 'Hematoloq' },
  { value: 'hemodializ', label: 'Hemodializ' },
  { value: 'hepatoloq', label: 'Hepatoloq' },
  { value: 'herbi_sahe_tibb', label: 'Hərbi Sahə Tibb' },
  { value: 'histoloq', label: 'Histoloq' },
  { value: 'huceyre_tebabəti', label: 'Hüceyrə təbabəti' },
  { value: 'idman_tibb', label: 'İdman Tibb' },
  { value: 'immunologiya', label: 'İmmunologiya' },
  { value: 'infeksionist', label: 'İnfeksionist' },
  { value: 'inkisaf_pediatriyası', label: 'İnkişaf Pediatriyası' },
  { value: 'intensiv_baxim_daxili_xestelikler', label: 'İntensiv Baxım (Daxili Xəstəliklər Reanimasiyası)' },
  { value: 'intensiv_baxim_sine_xestelikleri', label: 'İntensiv Baxım (Sinə Xəstəlikləri və İntensiv Baxım)' },
  { value: 'invaziv_radyoloji', label: 'Invaziv Radyoloji' },
  { value: 'is_yeri_hekimi', label: 'İş yeri həkimi' },
  { value: 'kardioloq', label: 'Kardioloq' },
  { value: 'klinik_biokimya', label: 'Klinik Biokimya' },
  { value: 'klinik_genetika', label: 'Klinik Genetika' },
  { value: 'klinik_molekulyar_genetika', label: 'Klinik Molekulyar Genetika' },
  { value: 'klinik_neyrofiziologiya', label: 'Klinik neyrofiziologiya' },
  { value: 'koloproktolog', label: 'Koloproktolog' },
  { value: 'kosmetoloq', label: 'Kosmetoloq' },
  { value: 'mama_ginekoloq', label: 'Mama ginekoloq' },
  { value: 'mammoloq', label: 'Mammoloq' },
  { value: 'mehkeme_tibb', label: 'Məhkəmə Tibb' },
  { value: 'mikologiya', label: 'Mikologiya' },
  { value: 'narkoloq', label: 'Narkoloq' },
  { value: 'nefroloq', label: 'Nefroloq' },
  { value: 'neonatologiya', label: 'Neonatologiya' },
  { value: 'nevroloq', label: 'Nevroloq' },
  { value: 'nevropatologiya', label: 'Nevropatologiya' },
  { value: 'neyrocerrah', label: 'Neyrocərrah' },
  { value: 'neyroradiologiya', label: 'Neyroradiologiya' },
  { value: 'nuve_tebabəti', label: 'Nüvə təbabəti' },
  { value: 'oftalmoloq', label: 'Oftalmoloq' },
  { value: 'onko_ginekoloq', label: 'Onko-Ginekoloq' },
  { value: 'onkoloq', label: 'Onkoloq' },
  { value: 'ortopediya_travmatologiya', label: 'Ortopediya və Travmatologiya' },
  { value: 'otolarinqoloq', label: 'Otolarinqoloq' },
  { value: 'pediatr', label: 'Pediatr' },
  { value: 'pediatrik_qastroenterologiya', label: 'Pediatrik Qastroenterologiya, Hepatologiya və Qidalanma' },
  { value: 'pediatrik_reanimasiya', label: 'Pediatrik Reanimasiya' },
  { value: 'perinatologiya', label: 'Perinatologiya - Riskli Hamiləliklər' },
  { value: 'pese_tebabəti', label: 'Peşə təbabəti' },
  { value: 'pese_xestelikleri', label: 'Peşə və peşə xəstəlikləri' },
  { value: 'plastik_cerrah', label: 'Plastik cərrah' },
  { value: 'proktoloq', label: 'Proktoloq' },
  { value: 'psixiatr', label: 'Psixiatr' },
  { value: 'pulmonoloq', label: 'Pulmonoloq' },
  { value: 'qastroenteroloji_cerrahiyyə', label: 'Qastroenteroloji Cərrahiyyə' },
  { value: 'qastroenteroloq', label: 'Qastroenteroloq' },
  { value: 'radiasiya_onkologiyasi', label: 'Radiasiya onkologiyası' },
  { value: 'radioloq', label: 'Radioloq' },
  { value: 'reanimatoloq', label: 'Reanimatoloq' },
  { value: 'reproduktiv_endokrinologiya', label: 'Reproduktiv Endokrinologiya və Sonsuzluq' },
  { value: 'revmatoloq', label: 'Revmatoloq' },
  { value: 'sitopatologiya', label: 'Sitopatologiya' },
  { value: 'stomatoloq', label: 'Stomatoloq' },
  { value: 'sualti_tebabət', label: 'Sualtı təbabət və hiperbarik tibb' },
  { value: 'sud_vezi_cerrahi', label: 'Süd vəzi cərrahı' },
  { value: 'terapevt', label: 'Terapevt' },
  { value: 'tecili_tibbi_yardim', label: 'Təcili Tibbi Yardım' },
  { value: 'tibbi_estetik', label: 'Tibbi Estetik Tibb Doktoru' },
  { value: 'tibbi_onkologiya', label: 'Tibbi Onkologiya' },
  { value: 'tiroidoloq', label: 'Tiroidoloq' },
  { value: 'toksikologiya', label: 'Toksikologiya' },
  { value: 'torokal_cerrah', label: 'Torokal cərrah' },
  { value: 'transplantoloq', label: 'Transplantoloq' },
  { value: 'travmatoloq', label: 'Travmatoloq' },
  { value: 'umumi_cerrah', label: 'Ümumi cərrah' },
  { value: 'urek_damar_cerrahi', label: 'Ürək damar cərrahı' },
  { value: 'uroloq', label: 'Uroloq' },
  { value: 'uroonkologiya', label: 'Uroonkologiya' },
  { value: 'uroradiologiya', label: 'Uroradiologiya' },
  { value: 'usaq_cerrahi', label: 'Uşaq cərrahı' },
  { value: 'usaq_dos_qefesi', label: 'Uşaq döş qəfəsinin xəstəlikləri' },
  { value: 'usaq_endokrinologiyasi', label: 'Uşaq endokrinologiyası' },
  { value: 'usaq_endokrinologiyasi_metabolik', label: 'Uşaq Endokrinologiyası və Metabolik Xəstəliklər' },
  { value: 'usaq_genetik_xestelikleri', label: 'Uşaq Genetik Xəstəlikləri' },
  { value: 'usaq_hematologiyasi', label: 'Uşaq Hematologiyası' },
  { value: 'usaq_immunologiyasi', label: 'Uşaq İmmunologiyası və Allergiya' },
  { value: 'usaq_kardiologiyasi', label: 'Uşaq Kardiologiyası' },
  { value: 'usaq_metabolik_xestelikleri', label: 'Uşaq Metabolik Xəstəlikləri' },
  { value: 'usaq_nefrologiyasi', label: 'Uşaq Nefrologiyası' },
  { value: 'usaq_nevrologiyasi', label: 'Uşaq nevrologiyası' },
  { value: 'usaq_onkologiyasi', label: 'Uşaq Onkologiyası' },
  { value: 'usaq_ortopediyasi', label: 'Uşaq Ortopediyası' },
  { value: 'usaq_radiologiyasi', label: 'Uşaq Radiologiyası' },
  { value: 'usaq_revmatologiyasi', label: 'Uşaq revmatologiyası' },
  { value: 'usaq_tecili', label: 'Uşaq Təcili' },
  { value: 'usaq_urek_damar_cerrahiyyəsi', label: 'Uşaq Ürək-Damar Cərrahiyyəsi' },
  { value: 'usaq_uroloq', label: 'Uşaq Urologiyası' },
  { value: 'usaq_uroloq_cerrahiyyə', label: 'Uşaq Urologiyası (Cərrahiyyə)' },
  { value: 'usaq_yeniyetme_psixiatr', label: 'Uşaq və Yeniyetmə Psixiatrı' },
  { value: 'usaq_yoluxucu_xestelikler', label: 'Uşaq Yoluxucu Xəstəlikləri' },
  { value: 'usm_hekimi', label: 'USM Həkimi' },
  { value: 'vertebroloq', label: 'Vertebroloq' },
  { value: 'verem_allergik_xestelikler', label: 'Vərəm, Allergik Xəstəliklər' },
  { value: 'virusologiya', label: 'Virusologiya' },
  { value: 'yoluxucu_xestelikler_klinik_mikrobiologiya', label: 'Yoluxucu Xəstəliklər və Klinik Mikrobiologiya' },
];

const GENDERS = [
  { value: 'men', label: 'Men' },
  { value: 'women', label: 'Women' },
];

export function Filter() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [open, setOpen] = useState(false);
  const [professionValue, setProfession] = useState(searchParams.get('profession') ?? '');

  const [open2, setOpen2] = useState(false);
  const [genderValue, setGender] = useState(searchParams.get('gender') ?? '');

  const [open3, setOpen3] = useState(false);
  const [ratingValue, setRating] = useState(searchParams.get('rating') ?? '');

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
            {professionValue ? JOB_OPTIONS.find((job) => job.value === professionValue)?.label : 'Select specialty...'}
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
                    value={job.value}
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
                    <Check className={cn('ml-auto', professionValue === job.value ? 'opacity-100' : 'opacity-0')} />
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
            className="w-full justify-between md:w-[250px]"
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
            className="w-full justify-between md:w-[200px]"
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
            setSearchParams((searchParams) => {
              if (e.target.value) searchParams.set('minPrice', e.target.value);
              else searchParams.delete('minPrice');

              return searchParams;
            });
          }}
          placeholder="Min. price"
          className="w-full"
        />
        <MyInput
          type="number"
          defaultValue={searchParams.get('maxPrice') ?? ''}
          onChange={(e) => {
            setSearchParams((searchParams) => {
              if (e.target.value) searchParams.set('maxPrice', e.target.value);
              else searchParams.delete('maxPrice');

              return searchParams;
            });
          }}
          placeholder="Max. price"
          className="w-full"
        />
      </div>
      <button className="rounded-md bg-teal-700 px-5 py-2 text-white transition hover:bg-teal-600 md:py-0">
        Submit
      </button>
    </div>
  );
}
