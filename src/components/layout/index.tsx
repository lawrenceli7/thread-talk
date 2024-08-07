import React from "react";
import Navbar from "../nav";

interface LayoutProps {
  children: React.ReactElement | React.ReactElement[];
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
};
export default Layout;
