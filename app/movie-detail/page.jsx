"use client";

import BaseLayout from "@/components/BaseLayout";
import Header from "@/components/Header";
import HeartCard from "@/components/HeartCard";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import CircleLoader from "@/components/circle-loader";
import { GlobalContext } from "@/context";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";

const MovieDetailPage = () => {
  const session = useSession();

  if (!session.data) redirect("/");

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({});

  const searchParams = useSearchParams();
  const imdbID = searchParams.get("id");

  useEffect(() => {
    const fetchData = async () => {
      const url = `https://movie-database-alternative.p.rapidapi.com/?r=json&i=${imdbID}`;
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "b81b577216mshd4b5c46a06d527dp1d6ee7jsn1139d97e4df1",
          "X-RapidAPI-Host": "movie-database-alternative.p.rapidapi.com",
        },
      };

      setIsLoading(true);
      try {
        const response = await fetch(url, options);
        if (response.ok) {
          const result = await response.json();
          setData(result);
          setTimeout(setIsLoading(false), 4000);
        } else {
          setIsLoading(false);
          throw new Error("Request failed");
        }
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const inputString = data?.Runtime;

  // Extract the numeric value from the string
  const match = inputString?.match(/\d+/);
  const totalMinutes = match ? parseInt(match[0], 10) : 0;

  // Calculate hours
  const hours = Math.floor(totalMinutes / 60);

  // Calculate remaining minutes
  const remainingMinutes = totalMinutes % 60;

  // Calculate seconds if needed
  const seconds = remainingMinutes * 60;

  if (!data) return <CircleLoader />;

  return (
    <BaseLayout>
      <div className="px-3 sm:px-8 pb-10 w-full h-screen overflow-y-scroll overflow-x-hidden bg-[#21201E]">
        <Header showSearch={false} />

        <section className="mt-8">
          <div className="flex sm:px-10 gap-4 items-center justify-around flex-wrap md:flex-nowrap">
            {isLoading ? (
              <LoadingSkeleton />
            ) : (
              <div className="">
                <Image
                  src={data?.Poster}
                  width={400}
                  height={200}
                  alt={data?.Title}
                  className="rounded-20"
                />
              </div>
            )}

            <div className="w-full flex flex-col gap-5">
              <div className="flex justify-between items-center">
                <p className="text-sm font-medium sm:font-semi-bold leading-8 sm:text-[32px] text-white">
                  {data?.Title}
                </p>

                <p className="text-[8px] text-white sm:text-lg sm:font-medium flex gap-2 items-center">
                  <Image
                    src="/assets/icons/star.svg"
                    width={16}
                    height={16}
                    alt="star rating"
                  />{" "}
                  {data?.imdbRating}/10
                </p>
              </div>
              <div className="flex gap-2">
                <p className="text-white text-[10px] sm:text-md font-medium">
                  {data?.Year}
                </p>
                <p className="text-white text-[10px] sm:text-md font-medium">
                  {data?.Genre}
                </p>
                <p className="text-white text-[10px] sm:text-md font-medium">
                  {hours}h {remainingMinutes}m {seconds && `${seconds}s`}
                </p>
              </div>
              <p className="text-xs text-white sm:text-sm text-justify">
                {data?.Plot}
              </p>
              <div className="flex gap-4 items-center">
                <button className="px-[10px] sm:px-[24px] py-[8px] sm:py-[17px] text-sm sm:text-md bg-violet-700 text-white rounded-lg sm:rounded-[14px] cursor-pointer">
                  Watch Now
                </button>
                <HeartCard />
              </div>
            </div>
          </div>
        </section>

        <section className="mt-4">
          <div className="text-xs text-white sm:text-sm flex flex-wrap sm:flex-nowrap gap-1 mb-1">
            <p className="w-16">Director: </p>
            <div className="flex gap-1 flex-wrap text-white sm:flex-nowrap text-xs sm:text-sm">
              <span>
                {!data?.Director || data?.Director === "N/A"
                  ? "Not Available Yet!"
                  : data?.Director}
              </span>
            </div>
          </div>

          <div className="text-white text-xs sm:text-sm flex flex-wrap sm:flex-nowrap gap-1 mb-1">
            <p className="w-16">Writer: </p>
            <div className="text-white flex gap-1 flex-wrap sm:flex-nowrap text-xs sm:text-sm">
              <span>
                {" "}
                {!data?.Writer || data?.Writer === "N/A"
                  ? "Not Available Yet!"
                  : data?.Writer}
              </span>
            </div>
          </div>

          <div className="text-white text-xs sm:text-sm flex flex-wrap sm:flex-nowrap gap-1 mb-1">
            <p className="w-16">Actors: </p>
            <div className="text-white flex gap-1 flex-wrap sm:flex-nowrap text-xs sm:text-sm">
              <span>
                {" "}
                {!data?.Actor || data?.Actor === "N/A"
                  ? "Not Available Yet!"
                  : data?.Actor}
              </span>
              Actor
            </div>
          </div>

          <div className="text-white text-xs sm:text-sm flex flex-wrap sm:flex-nowrap gap-1 mb-1">
            <p className="w-14 sm:w-20">Realease: </p>
            <div className="text-white flex gap-1 flex-wrap sm:flex-nowrap text-xs sm:text-sm">
              <span>
                {" "}
                {!data?.Realease || data?.Realease === "N/A"
                  ? "Not Available Yet!"
                  : data?.Realease}
              </span>
            </div>
          </div>
          <div className="text-white text-xs sm:text-sm flex flex-wrap sm:flex-nowrap gap-1 mb-1">
            <p className="w-14 sm:w-20">Awards: </p>
            <div className="text-white flex gap-1 flex-wrap sm:flex-nowrap text-xs sm:text-sm">
              <span>
                {" "}
                {!data?.Awards || data?.Awards === "N/A"
                  ? "Not Available Yet!"
                  : data?.Awards}
              </span>
            </div>
          </div>
          <div className="text-white text-xs sm:text-sm flex flex-wrap sm:flex-nowrap gap-1 mb-1">
            <p className="w-14 sm:w-20">IMDB ID: </p>
            <div className="text-white flex gap-1 flex-wrap sm:flex-nowrap text-xs sm:text-sm">
              <span>
                {" "}
                {!data?.imdbID || data?.imdbID === "N/A"
                  ? "Not Available Yet!"
                  : data?.imdbID}
              </span>
            </div>
          </div>
          <div className="text-white text-xs sm:text-sm flex flex-wrap sm:flex-nowrap gap-1 mb-1">
            <p className="w-14 sm:w-20">Type: </p>
            <div className="text-white flex gap-1 flex-wrap sm:flex-nowrap text-xs sm:text-sm">
              <span>
                {" "}
                {!data?.Type || data?.Type === "N/A"
                  ? "Not Available Yet!"
                  : data?.Type}
              </span>
            </div>
          </div>
          <div className="text-white text-xs sm:text-sm flex flex-wrap sm:flex-nowrap gap-1 mb-1">
            <p className="w-14 sm:w-20">DVD: </p>
            <div className="text-white flex gap-1 flex-wrap sm:flex-nowrap text-xs sm:text-sm">
              <span>
                {" "}
                {!data?.DVD || data?.DVD === "N/A"
                  ? "Not Available Yet!"
                  : data?.DVD}
              </span>
            </div>
          </div>
          <div className="text-white text-xs sm:text-sm flex flex-wrap sm:flex-nowrap gap-1 mb-1">
            <p className="w-14 sm:w-20">Box Office: </p>
            <div className="text-white flex gap-1 flex-wrap sm:flex-nowrap text-xs sm:text-sm">
              <span>
                {" "}
                {!data?.BoxOffice || data?.BoxOffice === "N/A"
                  ? "Not Available Yet!"
                  : data?.BoxOffice}
              </span>
            </div>
          </div>
          <div className="text-white text-xs sm:text-sm flex flex-wrap sm:flex-nowrap gap-1 mb-1">
            <p className="w-14 sm:w-20">Production: </p>
            <div className="text-white flex gap-1 flex-wrap sm:flex-nowrap text-xs sm:text-sm">
              <span>
                {" "}
                {!data?.Production || data?.Production === "N/A"
                  ? "Not Available Yet!"
                  : data?.Production}
              </span>
            </div>
          </div>
          <div className="text-white text-xs sm:text-sm flex flex-wrap sm:flex-nowrap gap-1 mb-1">
            <p className="w-14 sm:w-20">Website: </p>
            <div className="text-white flex gap-1 flex-wrap sm:flex-nowrap text-xs sm:text-sm">
              <span>
                {" "}
                {!data?.Website === "N/A"
                  ? "Not Available Yet!"
                  : data?.Website}
              </span>
            </div>
            Website
          </div>
          <div className="text-white text-xs sm:text-sm flex flex-wrap sm:flex-nowrap gap-1 mb-1">
            <p className="w-14 sm:w-20">Response: </p>
            <div className="text-white flex gap-1 flex-wrap sm:flex-nowrap text-xs sm:text-sm">
              <span>
                {" "}
                {!data?.Response || data?.Response === "N/A"
                  ? "Not Available Yet!"
                  : data?.Response}
              </span>
            </div>
          </div>
        </section>
      </div>
    </BaseLayout>
  );
};

export default MovieDetailPage;
