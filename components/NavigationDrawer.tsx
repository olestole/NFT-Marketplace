import React, { useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faWallet,
  faMoneyCheck,
  faFire,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

enum navItems {
  "home",
  "create-item",
  "my-assets",
  "creator-dashboard",
}

const NavigationDrawer: React.FC = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<navItems>(navItems.home);

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  return (
    <motion.div
      initial={{ width: 68 }}
      animate={{ width: open ? 320 : 68 }}
      className="h-full fixed right-0 overflow-y-scroll overflow-x-hidden rounded-l-2xl shadow-2xl"
    >
      <div className="m-4 flex flex-col justify-start items-start space-y-4">
        <button className="" onClick={handleOpen}>
          X
        </button>
        <div className="flex justify-between">
          <motion.div
            animate={{ width: open ? 48 : 32, height: open ? 48 : 32 }}
            initial={{ width: open ? 48 : 32, height: open ? 48 : 32 }}
            className="flex justify-center items-center border-4 bg-yellow-400 rounded-lg border-gray-700"
          >
            <motion.p
              animate={{ fontSize: open ? 20 : 8 }}
              initial={{ fontSize: open ? 20 : 8 }}
              className="font-bold text-gray-700"
            >
              OAS
            </motion.p>
          </motion.div>
        </div>
        <div className="flex flex-col space-y-1 w-full">
          <p className="text-gray-400 text-sm">CONTENT</p>
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
      </div>
    </motion.div>
  );
};

interface PageProps extends React.HTMLAttributes<HTMLDivElement> {
  href: string;
  name: string;
  open: boolean;
  icon: any;
  navItem: navItems;
  setCurrent: (current: navItems) => void;
  current: navItems;
}

const PageLink: React.FC<PageProps> = ({
  href,
  open,
  name,
  icon,
  current,
  setCurrent,
  navItem,
}) => {
  return (
    <div
      className="hover:bg-blue-400 hover:bg-opacity-20 p-2 rounded-md transition-all"
      onClick={() => setCurrent(navItem)}
    >
      <Link href={href} passHref>
        <a className="flex flex-nowrap items-center overflow-hidden">
          <FontAwesomeIcon
            icon={icon}
            className="mr-2"
            color={current === navItem ? "#0374ff" : "#374151"}
          />
          <motion.p
            className="whitespace-nowrap"
            initial={{ opacity: open ? 1 : 0 }}
            animate={{ opacity: open ? 1 : 0 }}
            style={{color: current === navItem ? "#0374ff" : "#374151"}}
          >
            {name}
          </motion.p>
        </a>
      </Link>
    </div>
  );
};

export default NavigationDrawer;
