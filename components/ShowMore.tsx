"use client"
import { ShowMoreProps } from "@/types";
import React from "react";
import { useParams, useRouter } from "next/navigation";
import { CustomButton } from ".";
import { updateSearchParams } from "@/utills";

const ShowMore = ({ isNext, pageNumber }: ShowMoreProps) => {
  const router = useRouter();


  const handleNavigation = () => {
console.log("pageNumber",pageNumber)

    const newLimit=(pageNumber+1)*10 
    const newPathname=updateSearchParams("limit",`${newLimit}`)
    router.push(newPathname,{scroll:false})
  };
  return (
    <div className="w-full flex-center gap-5 mt-10">
      {!isNext && <CustomButton title="show more" btnType="button" containerStyles="bg-primary-blue rounded-full text-white" handleClick={handleNavigation} />}
    </div>
  );
};

export default ShowMore;
