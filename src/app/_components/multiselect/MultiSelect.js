"use client";
import React from "react";
import { CheckIcon, ChevronDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import _ from "lodash";

function MultiSelect(props) {
  const { options, toggleOptions, selectedOptions } = props;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="flex w-full p-1 rounded-md border min-h-10 h-auto items-center justify-between bg-inherit hover:bg-inherit [&_svg]:pointer-events-auto">
          <div className="flex items-center justify-between w-full mx-auto">
            <span className="text-sm text-muted-foreground mx-3">
              Select Team Members
            </span>
            <ChevronDown className="h-4 cursor-pointer text-muted-foreground mx-2" />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Command>
          <CommandInput placeholder="Search..." />
          <CommandList className="max-h-52">
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Team Members">
              {_.map(options, (item) => {
                const isSelected = selectedOptions.some(
                  (member) => member?._id === item?._id
                );

                return (
                  <CommandItem
                    key={item?._id}
                    onSelect={() => toggleOptions(item)}
                  >
                    <div
                      className={`mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-black  ${
                        isSelected
                          ? "bg-black text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible"
                      }`}
                    >
                      <CheckIcon className="size-4" />
                    </div>
                    <span>{item?.name}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default MultiSelect;
