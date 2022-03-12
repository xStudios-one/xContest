import type { NextPage } from "next";
import Dashboard from "../components/dashboard";
import DashboardPage from "../components/dashboardPage";

const Home: NextPage = () => {
  return (
    <div>
      <Dashboard
        pages={{
          Home: <DashboardPage key="Home">Joe Mama</DashboardPage>,
          Contests: <DashboardPage key="Contests">Contests</DashboardPage>,
          "Your mom": (
            <DashboardPage key="Your mom">
              Your mom is not that fat
            </DashboardPage>
          ),
          "Idiots that made this": (
            <DashboardPage key="Idiots that made this">
              We are idiots
            </DashboardPage>
          ),
        }}
      />
    </div>
  );
};

export default Home;
