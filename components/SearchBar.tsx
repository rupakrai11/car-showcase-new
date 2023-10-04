"use client";
import { useState } from "react";
import { SearchManufacturer } from ".";
import Image from "next/image";
import { manufacturers } from "@/constants";
import { useRouter } from "next/navigation";
const SearchBar = () => {
  const [manuFacturer, setManuFacturer] = useState("");
  const [model, setModel] = useState("");
  const router = useRouter();
  const SearchButton = ({ otherClasses }: { otherClasses: string }) => (
    <button type="submit" className={`-ml-3 z-10 ${otherClasses}`}>
      <Image
        src="/magnifying-glass.svg"
        alt="magnifying-glass"
        className="object-contain"
        width={30}
        height={30}
      />
    </button>
  );

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (manuFacturer === "" && model === "") {
      return alert("");
    }
    updateSearchParams(
      model.toLocaleLowerCase(),
      manuFacturer.toLocaleLowerCase()
    );
  };
  const updateSearchParams = (model: string, manufacturer: string) => {
    console.log("manufacturer", manufacturer);
    const searchParams = new URLSearchParams(window.location.search);
    if (model) {
      searchParams.set("model", model);
    } else {
      searchParams.delete("model");
    }
    if (manufacturer) {
      searchParams.set("manufacturer", manufacturer);
    } else {
      searchParams.delete("manufacturer");
    }
    const newPathname = `${
      window.location.pathname
    }?${searchParams.toString()}`;
    router.push(newPathname,{scroll:false});
  };
  return (
    <form className="searchbar" onSubmit={handleSearch}>
      <div className="searchbar__item">
        <SearchManufacturer
          manufacturer={manuFacturer}
          setManufacturer={setManuFacturer}
        />
        <SearchButton otherClasses="sm:hidden" />
      </div>
      <div className="searchbar__item">
        <Image
          src="/model-icon.png"
          width={25}
          height={25}
          className="absolute w-[20px] h-[20px] ml-4"
          alt="car model"
        />
        <input
          type="text"
          name="modal"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          className="searchbar__input"
        />
        <SearchButton otherClasses="sm:hidden" />
      </div>
      <SearchButton otherClasses="max-sm:hidden" />
    </form>
  );
};

export default SearchBar;
