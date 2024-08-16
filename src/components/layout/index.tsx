import React, { ReactNode } from "react";
import Navbar from "../nav";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="dark:bg-[#0f1113] h-screen">
      <Navbar />
      <main>{children}</main>
    </div>
  );
};
export default Layout;
