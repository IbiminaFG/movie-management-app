"use client";

import BaseLayout from "@/components/BaseLayout";
import Feed from "@/components/Feed";
import Header from "@/components/Header";
import { GlobalContext } from "@/context";
import { useSession } from "next-auth/react";
import { useContext, useEffect, useState } from "react";

export default function Dashboard() {
  const [areVideosLoading, setAreVideosLoading] = useState(false);
  const [isVideoLoading, setIsVideoLoading] = useState(false);
  const [searchState, setSearchState] = useState(false);

  const { searchResults, setSearchResults, setUserDetails, userDetails } =
    useContext(GlobalContext);

  const session = useSession();
  const sessionUserEmail = session?.data?.user?.email;

  //Get the user that corresponds with the session
  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const res = await fetch("/api/trial/profile", {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch user details");
        }

        const data = await res.json();

        const dataArr = data?.accounts;
        dataArr.map((item, index) => {
          if (item.email === sessionUserEmail) {
            setUserDetails(item);
          }
        });
      } catch (error) {
        console.log(error);
      }
    };
    getUserDetails();
  }, []);

  const handleSearch = async (e) => {
    const query = e.target.value;
    console.log(query);
    if (query.length > 0) {
      setSearchState(true);
    } else {
      setSearchState(false);
    }

    const url = `https://movie-database-alternative.p.rapidapi.com/?s=${query}&r=json&page=1`;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "b81b577216mshd4b5c46a06d527dp1d6ee7jsn1139d97e4df1",
        "X-RapidAPI-Host": "movie-database-alternative.p.rapidapi.com",
      },
    };

    try {
      setAreVideosLoading(true);
      setIsVideoLoading(true);
      const response = await fetch(url, options);
      const result = await response.json();

      if (result.Response) {
        setAreVideosLoading(false);
        setSearchResults(result.Search);
        setTimeout(() => {
          setIsVideoLoading(false);
        }, 4000);
      } else {
        console.log(result.Error);
        setAreVideosLoading(false);
      }
    } catch (error) {
      console.error(error);
      setAreVideosLoading(false);
    }
  };
  return (
    <BaseLayout>
      <div className="overflow-y-scroll h-screen">
        <Header
          showSearch={true}
          handleSearch={handleSearch}
          userDetails={userDetails}
        />
        <div className="px-3 sm:px-8">
          <div className="w-full px-1 sm:px-3 bg-neutral-300 animate-pulse py-3 rounded-lg">
            <p className="text-md sm:text-2xl">
              Hello {userDetails?.name}, welcome to your dashboard
            </p>
          </div>
        </div>
        <Feed
          searchState={searchState}
          data={searchResults}
          areVideosLoading={areVideosLoading}
          isVideoLoading={isVideoLoading}
        />
      </div>
    </BaseLayout>
  );
}
