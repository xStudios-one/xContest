import { AnimatePresence } from "framer-motion";
import type { NextPage } from "next";
import { useState } from "react";
import DashboardPage from "./dashboardPage";

interface Props {
  pages: { [key: string]: any };
}

const Dashboard: NextPage<Props> = ({ pages }) => {
  const [selectedPage, setSelectedPage] = useState(Object.keys(pages)[0]);

  return (
    <div className="flex flex-row w-auto h-auto m-4">
      <ul className="menu bg-base-200 w-56 rounded-box shadow-md w-72 h-fit">
        {Object.keys(pages).map((p) => {
          return (
            <li key={p} className={p == selectedPage ? "bordered" : ""}>
              <button onClick={() => setSelectedPage(p)}>{p}</button>
            </li>
          );
        })}
      </ul>
      <div className="w-auto h-auto ml-4">
        <AnimatePresence exitBeforeEnter={true}>
          {pages[selectedPage]}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Dashboard;
