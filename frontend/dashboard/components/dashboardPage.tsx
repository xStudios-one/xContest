import { motion } from "framer-motion";
import type { NextPage } from "next";

const DashboardPage: NextPage<{ key: string }> = ({ children, key }) => {
  const variants = {
    hidden: { opacity: 0 },
    enter: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <motion.main
      key={key}
      variants={variants}
      initial="hidden"
      animate="enter"
      exit="exit"
      transition={{ type: "linear", duration: 0.2 }}
    >
      {children}
    </motion.main>
  );
};

export default DashboardPage;
