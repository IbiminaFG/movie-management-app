import { GlobalContext } from "@/context";
import Image from "next/image";
import React, { useContext } from "react";

const Header = ({ showSearch, handleSearch }) => {
  const { profileDetails, userDetails } = useContext(GlobalContext);
  return (
    <header className="flex flex-col px-2  py-8 justify-around items-center">
      <div className="flex items-center justify-around w-full">
        <span className="text-white text-base">
          {userDetails?.name ? userDetails?.name : "Hello"}
        </span>

        {showSearch && (
          <div>
            <div className="items-center border hidden sm:flex border-solid border-white rounded-sm pr-1">
              <input
                type="text"
                name="query"
                placeholder="Enter movie name "
                className="search_input h-7 w-full rounded-md placeholder-white color-white"
                onInput={handleSearch}
              />
              <Image
                src="/assets/icons/search.svg"
                width={20}
                height={20}
                alt="search icon"
              />
            </div>
          </div>
        )}

        <div>
          <div className="flex gap-2 w-[50px] h-[50px] items-center">
            <Image
              src={
                profileDetails?.image
                  ? `${profileDetails?.image}`
                  : "/assets/images/avatar.jpg"
              }
              width={50}
              height={50}
              alt="profile"
              className="w-full h-full rounded-full"
            />
          </div>
        </div>
      </div>
      {showSearch && (
        <div className="items-center border mt-2 flex sm:hidden border-solid border-white rounded-sm pr-1">
          <input
            type="text"
            name="query"
            placeholder="Enter movie name"
            className="search_input h-7 w-full rounded-md placeholder-white"
            onInput={handleSearch}
          />
          <Image
            src="/assets/icons/search.svg"
            width={20}
            height={20}
            alt="search icon"
          />
        </div>
      )}
    </header>
  );
};

export default Header;
