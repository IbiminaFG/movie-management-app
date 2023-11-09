"use client";

import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { GlobalContext } from "@/context";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

// Function to covert to binary64
const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

const Editpage = () => {
  const [profileDetails, setProfileDetails] = useState({});
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [origin, setOrigin] = useState("");
  const [imageFile, setImageFile] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  console.log(profileDetails);

  //Get profile details
  useEffect(() => {
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
          if (reqId === id) {
            setProfileDetails(item);
            // Set the initial values of the input fields after fetching data
            setImage(item.image || "");
            setName(item.creator.name || "");
            setAddress(item.address || "");
            setGender(item.gender || "");
            setPhone(item.phone || "");
            setOrigin(item.origin || "");
          }
        });
        console.log("profileDetails", profileDetails);
      } catch (error) {
        console.log(error);
      }
    };
    getProfileDetails();
  }, []);

  console.log("name", name);
  console.log("nameP", profileDetails?.creator?.name);

  const handleSubmit = async (e) => {
    e.preventDefault();

    toast.loading("Loading...");
    //Put request
    try {
      const response = await fetch(
        `/api/profile/${profileDetails?._id}?id=${profileDetails?.creator?._id}`,
        {
          method: "PUT",
          body: JSON.stringify({
            name,
            image,
            address,
            gender,
            phone,
            origin,
          }),
        }
      );

      if (response.ok) {
        this.success("Successful!");
        router.push("/dashboard");
        console.log("okay res", response);
      }
    } catch (error) {
      toast.dismiss();
      console.log(error);
    } finally {
      // setIsSubmitting(false);
    }

    //Post request
    try {
      const response = await fetch(`/api/profile/new`, {
        method: "POST",
        body: JSON.stringify({
          userId: id,
          image,
          address,
          gender,
          phone,
          origin,
        }),
      });

      if (response.ok) {
        toast.success("Successfull!");
        router.push("/dashboard");
        console.log("okay res", response);
      }
    } catch (error) {
      toast.dismiss();
      console.log(error);
    } finally {
      // setIsSubmitting(false);
    }

    toast.dismiss();
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    setImageFile(URL.createObjectURL(file));
    const base64 = await convertToBase64(file);
    setImage(base64);
  };

  return (
    <div className="profile-bg flex px-3 sm:px-10 justify-center py-6 sm:w-full">
      <form
        onSubmit={handleSubmit}
        className="p-3 w-auto sm:w-auto sm:p-10 flex flex-col gap-4 m-auto relative bg-neutral-300 animate-pulse py-3 rounded-lg"
      >
        <Link href="/dashboard" className="absolute top-2 right-3">
          Back
        </Link>

        <div className="flex flex-col w-[80px] h-[80px] gap-2 relative">
          {imageFile && (
            <Image
              src={imageFile}
              width={50}
              height={50}
              alt="avatar"
              className="w-full h-full rounded-full"
            />
          )}
          {!imageFile && !profileDetails?.image && (
            <Image
              src="/assets/images/avatar.jpg"
              width={50}
              height={50}
              alt="avatar"
              className="w-full h-full rounded-full"
            />
          )}
          {profileDetails?.image && !imageFile && (
            <Image
              src={profileDetails?.image}
              width={50}
              height={50}
              alt="avatar"
              className="w-full h-full rounded-full"
            />
          )}
          <label
            htmlFor="image"
            className="cursor-pointer absolute bottom-0 right-0"
          >
            <Image
              src="/assets/icons/import.svg"
              width={20}
              height={20}
              alt="avatar"
            />
          </label>

          <input
            type="file"
            name="image"
            id="image"
            className="hidden"
            accept=".jpeg, .png, .jpg"
            onChange={handleFileUpload}
          />
        </div>
        <div className="flex flex-col w-full border-b">
          <label htmlFor="name" className="text-sm">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            className="outline-none w-full border-0 px-2 bg-transparent"
          />
        </div>
        <div className="flex flex-col w-full border-b">
          <label htmlFor="address" className="text-sm">
            Address
          </label>
          <input
            type="text"
            name="address"
            id="name"
            onChange={(e) => setAddress(e.target.value)}
            value={address}
            className="outline-none w-full border-0 px-2 bg-transparent"
          />
        </div>
        <div className="flex flex-col w-full border-b">
          <label htmlFor="gender" className="text-sm">
            Gender
          </label>
          <select
            onChange={(e) => setGender(e.target.value)}
            name="gender"
            id="gender"
            value={gender}
            className="outline-none text-xs text-gray-500 my-2"
          >
            <option value="Male">male</option>
            <option value="Female">female</option>
          </select>
        </div>
        <div className="flex flex-col w-full border-b">
          <label htmlFor="phone" className="text-sm">
            Phone
          </label>
          <input
            type="tel"
            name="phone"
            id="phone"
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
            className="outline-none w-full border-0 px-2 bg-transparent"
          />
        </div>
        <div className="flex flex-col w-full border-b">
          <label htmlFor="origin" className="text-sm">
            Origin
          </label>
          <input
            type="text"
            name="origin"
            id="origin"
            onChange={(e) => setOrigin(e.target.value)}
            value={origin}
            className="outline-none w-full border-0 px-2 bg-transparent"
          />
        </div>
        <button
          type="submit"
          className="save-btn bg-[#6100C2] rounded-xl py-3 text-white "
        >
          Save Profile
        </button>
      </form>
    </div>
  );
};

export default Editpage;
