"use client";
import { CustomFilterProps } from "@/types";
import { updateSearchParams } from "@/utills";
import { Listbox, Transition } from "@headlessui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { Fragment, useState } from "react";

const CustomFilter = ({ tittle, options }: CustomFilterProps) => {
  const [selected, setSelected] = useState(options[0]);
  const router=useRouter()
  const handleUpdateParams=(e:{type:string,value:string})=>{
    const newpathname=updateSearchParams(tittle,e.value.toLowerCase());
  router.push(newpathname,{scroll:false});
  }

  return (
    <div className="w-fit">
      <Listbox value={selected} onChange={(e) =>{ setSelected(e)
      // @ts-ignorets
      handleUpdateParams(e);
      }}>
        <div className="w-fit z-10 relative">
          <Listbox.Button className="custom-filter__btn">
            <span className="block truncate">{selected.title}</span>
            <Image
              src="/chevron-up-down.svg"
              width={20}
              height={20}
              className="ml-4 object-contain"
              alt="chervon up down"
            />
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="custom-filter__options">
              {options.map((option) => (
                <Listbox.Option
                  key={option.title}
                  value={option}
                  className={({ active }) =>
                    `relative crusor-default select-none py-2 px-4 ${active? 'bg-primary-blue text-white':"text-grey-900"}`
                  }
                >
                  {({ selected }) => <span className={`block truncate ${selected?"font-medium":'font-normal'}`}>{option.title}</span>}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default CustomFilter;
