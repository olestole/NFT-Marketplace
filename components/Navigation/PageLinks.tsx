import React from "react";
import PageLink from "./PageLink";
import {
  faHome,
  faWallet,
  faMoneyCheck,
  faFire,
} from "@fortawesome/free-solid-svg-icons";
import { navItems } from "./NavigationDrawer";

interface Props {
  open: boolean;
  current: navItems;
  setCurrent: (navItem: navItems) => void;
}

const PageLinks: React.FC<Props> = ({ open, current, setCurrent }) => {
  return (
    <div className="flex flex-col">
      <PageLink
        href="/"
        open={open}
        name="Home"
        icon={faHome}
        navItem={navItems["home"]}
        current={current}
        setCurrent={setCurrent}
      />
      <PageLink
        href="/create-item"
        open={open}
        name="Sell Digital Asset"
        icon={faWallet}
        navItem={navItems["create-item"]}
        current={current}
        setCurrent={setCurrent}
      />
      <PageLink
        href="/my-assets"
        open={open}
        name="My Digital Assets"
        icon={faMoneyCheck}
        navItem={navItems["my-assets"]}
        current={current}
        setCurrent={setCurrent}
      />
      <PageLink
        href="/creator-dashboard"
        open={open}
        name="Creator dashboard"
        icon={faFire}
        navItem={navItems["creator-dashboard"]}
        current={current}
        setCurrent={setCurrent}
      />
    </div>
  );
};

export default PageLinks;
