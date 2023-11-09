"use client";

import React, { useState } from "react";
import LoadingSkeleton from "./LoadingSkeleton";
import HeartCard from "./HeartCard";
import Image from "next/image";
import { useRouter } from "next/navigation";
import CircleLoader from "./circle-loader";

const Feed = ({ data, areVideosLoading, isVideoLoading, searchState }) => {
  const arr = [1, 1, 1, 1, 1, 1, 1];
  const router = useRouter();

  const openMovie = (id) => {
    router.push(`/movie-detail?id=${id}`);
  };

  return (
    <div className="px-3 sm:px-8 py-4">
      <h2 className="mb-8 text-white">My Search</h2>
      {areVideosLoading && (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          <LoadingSkeleton />
          <LoadingSkeleton />
          <LoadingSkeleton />
          <LoadingSkeleton />
          <LoadingSkeleton />
          <LoadingSkeleton />
          <LoadingSkeleton />
          <LoadingSkeleton />
        </div>
      )}
      {data?.length > 0 && !areVideosLoading && (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {data &&
            data?.map(({ Title, Year, imdbID, Type, Poster }, index) => {
              if (Poster === "N/A") return;
              return (
                <div
                  key={index}
                  className={`movie_card relative flex flex-col justify-between`}
                  onClick={() => {}}
                >
                  {isVideoLoading ? (
                    <div className="relative top-20">
                      <CircleLoader />
                    </div>
                  ) : (
                    <Image
                      src={Poster}
                      width={300}
                      height={200}
                      className="object-cover cursor-pointer"
                      alt="poster"
                      onClick={() => openMovie(imdbID)}
                    />
                  )}

                  <div className="m-8 absolute top-1 right-1"></div>
                  <div className="absolute bottom-0 left-0 h-20 w-full title_cont flex flex-col justify-center px-2">
                    <h4 className="text-base font-semibold">{Title}</h4>
                    <p className="text-sm">
                      {Year} | {Type}
                    </p>
                  </div>
                </div>
              );
            })}
        </div>
      )}
      {!data?.length && !areVideosLoading && (
        <div className="w-full px-1 sm:px-3 py-4 bg-neutral-300 animate-pulse h-[296px] rounded-lg">
          <p className="text-sm sm:text-xl">
            {searchState
              ? "Did not find any movie yet!"
              : " There has been no search Yet! Start typing to make a search."}
          </p>
        </div>
      )}
    </div>
  );
};

export default Feed;
