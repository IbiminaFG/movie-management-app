"use client";

import Sidebar from "./SideBar";

const BaseLayout = ({ children }) => {
  return (
    <div className="layout">
      <Sidebar />
      <main className="layout__main-content">{children}</main>
    </div>
  );
};

export default BaseLayout;
