"use client";

import BaseLayout from "@/components/BaseLayout";
import { GlobalContext } from "@/context";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProfilePage = () => {
  const [userDetails, setUserDetails] = useState({});
  const [profileDetails, setProfileDetails] = useState({});

  const router = useRouter();

  const session = useSession();
  const sessionUserEmail = session?.data?.user?.email;

  //Basic registration details
  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const res = await fetch("/api/userExists", {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch user details");
        }

        const data = await res.json();
        const dataArr = data?.users;
        dataArr.map((item) => {
          if (item.email === sessionUserEmail) {
            console.log("userdetails", item);
            setUserDetails(item);
          }
        });
      } catch (error) {
        console.log(error);
      }
    };
    getUserDetails();
  }, []);

  //Profile details
  useEffect(() => {
    if (!userDetails) return;
    const getProfileDetails = async () => {
      try {
        const res = await fetch("/api/profile", {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch user details");
        }

        const data = await res.json();

        data.map((item) => {
          const reqId = item?.creator?._id;
          if (reqId === userDetails?._id) {
            console.log("profile", item);
            setProfileDetails(item);
          }
        });
        console.log("profileDetails", profileDetails);
      } catch (error) {
        console.log(error);
      }
    };
    getProfileDetails();
  }, [userDetails]);

  const handleDelete = async () => {
    const confirmDelete = confirm(
      "Are you sure you want to delete your account!"
    );

    if (!confirmDelete) return;

    toast.loading("Loading...");

    try {
      const res = await fetch(
        `/api/deleteAccount/${profileDetails?.creator?._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      if (!res.ok) {
        toast.dismiss;
        toast.error("Failed!");
        throw new Error("Failed to fetch user details");
      }

      toast.dismiss();

      signOut();
      router.push("");
    } catch (error) {
      toast.error("Error");
      console.log(error);
    }
    toast.dismiss();
  };

  return (
    <BaseLayout>
      <section className="py-8 px-3 sm:px-8 w-full h-screen overflow-y-scroll">
        <h1 className="text-2xl text-white font-bold mb-3">Profile</h1>
        <div className="flex flex-col gap-3">
          <div className="w-full px-3 sm:px-8 bg-neutral-300 animate-pulse py-4 rounded-lg">
            <div className="flex gap-4 items-center">
              {/* Image options */}
              {!profileDetails && userDetails && (
                <Image
                  src="/assets/images/avatar.jpg"
                  width={70}
                  height={70}
                  alt="avatar"
                  className="rounded-full"
                />
              )}
              {profileDetails && (
                <Image
                  src={
                    profileDetails?.image
                      ? profileDetails.image
                      : "/assets/images/avatar.jpg"
                  }
                  width={70}
                  height={70}
                  alt="avatar"
                  className="rounded-full"
                />
              )}
              {/* Image options stops here */}
              <div className="flex flex-col gap-1">
                <p className="text-sm w-full font-semibold">
                  {userDetails.name}
                </p>
                <p className="text-xs font-medium">{userDetails?.email}</p>
              </div>
            </div>
          </div>
          <div className="w-full px-3 sm:px-8 bg-neutral-300 animate-pulse py-4 rounded-lg">
            <div className="">
              <h3 className="mb-4 text-xl font-semibold">
                Profile Information
              </h3>
              <hr />
              <div className="mt-4 flex flex-col gap-2">
                <div className="flex flex-col sm:flex-row sm:items-center">
                  <p className="w-28 text-base font-medium">Name:</p>
                  <p className="text-sm">{userDetails?.name}</p>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center">
                  <p className="w-28 text-base font-medium">Email:</p>
                  <p className="text-sm">{userDetails?.email}</p>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center">
                  <p className="w-28 text-base font-medium">Address:</p>
                  <p className="text-sm">{profileDetails?.address}</p>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center">
                  <p className="w-28 text-base font-medium">Gender:</p>
                  <p className="text-sm">{profileDetails?.gender}</p>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center">
                  <p className="w-28 text-base font-medium">Phone:</p>
                  <p className="text-sm">{profileDetails?.phone}</p>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center">
                  <p className="w-28 text-base font-medium">Origin:</p>
                  <p className="text-sm">{profileDetails?.origin}</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <button
              className="px-2 py-2 bg-red-500 text-white text-sm rounded-md"
              onClick={handleDelete}
            >
              Delete Account
            </button>
          </div>
        </div>
      </section>
    </BaseLayout>
  );
};

export default ProfilePage;
