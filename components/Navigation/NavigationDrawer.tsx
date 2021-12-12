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
    >
      <div className="px-4 relative justify-start items-start space-y-4 h-full">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="absolute -left-4 top-1/2 z-50"
          onClick={handleOpen}
        >
          <FontAwesomeIcon
            size="2x"
            icon={open ? faChevronCircleRight : faChevronCircleLeft}
            className="bg-white rounded-full -p-2"
          />
        </motion.button>

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
          <p
            className="text-gray-400 text-sm"
            style={{ fontSize: open ? 16 : 10 }}
          >
            CONTENT
          </p>
          <PageLinks open={open} setCurrent={setCurrent} current={current} />
        </div>
      </div>
    </motion.div>
  );
};

export default NavigationDrawer;
