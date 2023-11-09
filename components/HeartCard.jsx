"use client";

import Image from "next/image";
import { useState } from "react";

const HeartCard = ({ height, width }) => {
  const [isTicked, setIsTicked] = useState(false);
  return (
    <div
      className={`h-[30px] w-[30px] sm:h-[54px] sm:w-[54px] heart_card cursor-pointer`}
      onClick={() => setIsTicked((prev) => !prev)}
    >
      <Image
        src={
          isTicked
            ? "/assets/icons/ticked-heart.svg"
            : "/assets/icons/unticked-heart.svg"
        }
        width={20}
        height={20}
        alt="heart card"
      />
    </div>
  );
};

export default HeartCard;
