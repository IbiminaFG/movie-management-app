"use client";

import CircleLoader from "@/components/circle-loader";
import { useSession } from "next-auth/react";
import { createContext, useEffect, useState } from "react";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [searchResults, setSearchResults] = useState({});
  const [userDetails, setUserDetails] = useState({});
  const [profileDetails, setProfileDetails] = useState({});

  const { data: session } = useSession();

  if (session === undefined) return <CircleLoader />;

  return (
    <GlobalContext.Provider
      value={{
        searchResults,
        setSearchResults,
        userDetails,
        setUserDetails,
        profileDetails,
        setProfileDetails,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
