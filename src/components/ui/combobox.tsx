"use client";

import { useState } from "react";

import { HiChevronUpDown, HiCheck } from "react-icons/hi2";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function Combobox({
  id,
  options,
  disabled = false,
  value,
  setValue,
}: {
  id: string;
  options: { value: string; label: string }[];
  disabled?: boolean;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          disabled={disabled}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-96 justify-between disabled:cursor-not-allowed"
        >
          {value || `Select a ${id.split("-").join(" ")}`}
          <HiChevronUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96 p-0">
        <Command id={id}>
          <CommandInput placeholder={`Select ${id.split('-').join(' ')}`} />
          <CommandEmpty>No {id.split('-').join(' ')} found.</CommandEmpty>
          <CommandGroup className="max-h-[24rem] overflow-y-auto">
            {options.map((option) => (
              <CommandItem
                key={option.value}
                onSelect={(currentValue) => {
                  setValue(option.value);
                  setOpen(false);
                }}
              >
                <HiCheck
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === option.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {option.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}