import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { navItems } from "./NavigationDrawer";

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
            style={{ color: current === navItem ? "#0374ff" : "#374151" }}
          >
            {name}
          </motion.p>
        </a>
      </Link>
    </div>
  );
};

export default PageLink;
