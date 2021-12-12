import React, { useState } from "react";
import { motion } from "framer-motion";
import PageLinks from "./PageLinks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronCircleLeft,
  faChevronCircleRight,
} from "@fortawesome/free-solid-svg-icons";

export enum navItems {
  "home",
  "create-item",
  "my-assets",
  "creator-dashboard",
}
import ElephantLogo from "../../assets/elephant.svg";

const NavigationDrawer: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<navItems>(navItems.home);

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  return (
    <motion.div
      initial={{ width: 78 }}
      animate={{ width: open ? 320 : 78 }}
      className="h-screen sticky right-0 top-0 rounded-l-3xl shadow-stripe z-10 bg-white ml-4"
      layout
    >
      <div className="px-4 relative justify-start items-start h-full">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="absolute -left-4 top-1/2 z-50"
          onClick={handleOpen}
        >
          <FontAwesomeIcon
            size="2x"
            icon={open ? faChevronCircleRight : faChevronCircleLeft}
            className="bg-white rounded-full -p-2 text-accent"
          />
        </motion.button>
        <div className="space-y-4 py-4">
          <motion.div
            className="mx-auto mt-4 h-8 w-8"
            animate={{ height: open ? 96 : 50, width: open ? 96 : 50 }}
            initial={{ height: open ? 96 : 50, width: open ? 96 : 50 }}
          >
            <ElephantLogo />
          </motion.div>
          <div className="flex flex-col space-y-1 w-full">
            <p
              className="text-gray-400 text-xs transition-all"
              style={{ transform: open ? "scale(1)" : "scale(0)" }}
            >
              CONTENT
            </p>
            <PageLinks open={open} setCurrent={setCurrent} current={current} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default NavigationDrawer;
