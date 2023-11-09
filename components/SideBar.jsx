"use client";

import Image from "next/image";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import Link from "next/link";
import { useContext } from "react";
import { SidebarContext } from "@/context/SidebarContext";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { GlobalContext } from "@/context";

const sidebarItems = [
  {
    name: "Home",
    href: "/",
    icon: "/assets/icons/film.svg",
  },
  {
    name: "Profile",
    href: "/profile",
    icon: "/assets/icons/user.svg",
  },
];

const Sidebar = () => {
  const { isCollapsed, toggleSidebarcollapse } = useContext(SidebarContext);
  const { userDetails } = useContext(GlobalContext);
  const router = useRouter();

  return (
    <div className="sidebar__wrapper bg-gray-900">
      <button className="btn" onClick={toggleSidebarcollapse}>
        {isCollapsed ? <MdKeyboardArrowRight /> : <MdKeyboardArrowLeft />}
      </button>
      <aside className="sidebar" data-collapse={isCollapsed}>
        <div className="sidebar__top">
          <Image
            width={50}
            height={50}
            className="sidebar__logo"
            src="/assets/icons/coffee.svg"
            alt="logo"
          />
          <p className="sidebar__logo-name text-white">MY MOVIE APP</p>
        </div>
        <ul className="sidebar__list mb-72">
          {sidebarItems.map(({ name, href, icon }) => {
            return (
              <li className="sidebar__item" key={name}>
                <Link
                  className={`sidebar__link ${
                    router.pathname === href ? "sidebar__link--active" : ""
                  }`}
                  href={href}
                >
                  <span className="sidebar__icon">
                    <Image src={icon} width={20} height={20} alt={name} />
                  </span>
                  <span className="sidebar__name text-white">{name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="flex flex-col gap-3 self-baseline">
          <div className="flex items-center gap-1 cursor-pointer">
            <Link
              href={`/edit-profile?id=${userDetails?._id}`}
              className="flex items-center gap-1 cursor-pointer"
            >
              <Image
                width={20}
                height={20}
                src="/assets/icons/sliders.svg"
                alt="logo"
              />
              <span className="sidebar__name">Settings</span>
            </Link>
          </div>
          <Link
            href="/"
            className="flex items-center gap-1 cursor-pointer"
            onClick={() => signOut()}
          >
            <Image
              width={20}
              height={20}
              src="/assets/icons/log-out.svg"
              alt="logo"
            />
            <span className="sidebar__name">Log Out</span>
          </Link>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
