import { Check, ChevronsUpDown } from 'lucide-react';
import { useQueryState } from 'nuqs';
import { useContext, useEffect, useState } from 'react';
import { DoctorsContext } from '~/components/find/DoctorsContext';
import { Button } from '~/components/ui/button';
import { Command, CommandGroup, CommandItem, CommandList } from '~/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover';
import { cn } from '~/libs/cn';
import { useMyLocationStore } from '~/store/useMyLocation';

const sorts = [
  {
    value: 'priceLow',
    label: 'Qiymətə görə: Aşağıdan → Yuxarıya',
  },
  {
    value: 'priceHigh',
    label: 'Qiymətə görə: Yuxarıdan → Aşağıya',
  },
  {
    value: 'distance',
    label: 'Məsafəyə görə',
  },
  {
    value: 'experience',
    label: 'Təcrübəyə görə',
  },
];

export function Sort() {
  const { data } = useContext(DoctorsContext);
  const [value, setValue] = useQueryState('sort');
  const [open, setOpen] = useState(false);

  const myLocation = useMyLocationStore((state) => state.myLocation);

  useEffect(() => {
    if (data.length === 0) setValue(null);
  }, []);

  return (
    <Popover
      open={open}
      onOpenChange={setOpen}
    >
      <PopoverTrigger
        disabled={data.length === 0}
        asChild
      >
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-fit justify-between"
        >
          {value ? sorts.find((sort) => sort.value === value)?.label : 'Sırala'}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="w-[300px] p-0"
      >
        <Command>
          <CommandList>
            <CommandGroup>
              {sorts.map((sort) => (
                <CommandItem
                  key={sort.value}
                  value={sort.value}
                  disabled={sort.value === 'distance' && !myLocation}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? null : currentValue);
                    setOpen(false);
                  }}
                >
                  {sort.label}
                  <Check className={cn('ml-auto', value === sort.value ? 'opacity-100' : 'opacity-0')} />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
