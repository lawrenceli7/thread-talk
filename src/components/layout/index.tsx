import React from "react";
import Navbar from "../nav";

const Layout: React.FC = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
};
export default Layout;
