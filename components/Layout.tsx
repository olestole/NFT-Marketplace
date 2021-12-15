import React from "react";
import Backdrop from "../assets/Backdrop.svg";
import NavigationDrawer from "./Navigation/NavigationDrawer";

const Layout: React.FC = ({ children }) => {
  return (
    <main className="flex w-screen min-h-screen bg-secondary">
      <Backdrop className="absolute -z-50 h-screen w-screen" />
      <div className="z-50 w-full min-h-screen p-12">{children}</div>
      <NavigationDrawer />
    </main>
  );
};

export default Layout;
