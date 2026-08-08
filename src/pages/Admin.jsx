import AnalyticsChart from "../components/AnalyticsChart";
import StatsSection from "../components/StatsSection";
import HistoryTable from "../components/HistoryTable";
import CSVUpload from "../components/CSVUpload";
import RetrainModel from "../components/RetrainModel";
import { useEffect } from "react";
import { logout } from "../services/auth";

function Admin() {

  useEffect(() => {

    const token =
      localStorage.getItem("token");

    if (!token) {

      window.location.href = "/login";

    }

  }, []);

  const handleLogout = () => {

    logout();

    window.location.href = "/";

  };

  return (

    <div className="min-h-screen bg-[#07140d] text-white p-8">

      {/* Header */}

      <div className="flex justify-between items-center mb-12">

        <h1 className="text-6xl font-bold text-green-400">
          Admin Dashboard
        </h1>

        <button
          onClick={handleLogout}
          className="
          bg-red-500
          hover:bg-red-400
          px-6
          py-3
          rounded-xl
          font-bold
          transition
          "
        >
          Logout
        </button>

      </div>

      {/* Statistics */}

      <StatsSection />

      {/* Analytics */}

      <div className="mt-16">
        <AnalyticsChart />
      </div>

      {/* Prediction History */}

      <div className="mt-16">
        <HistoryTable />
      </div>

      {/* Upload Dataset */}

      <div className="mt-16">
        <CSVUpload />
      </div>

      {/* Retrain Model */}

      <div className="mt-16">
        <RetrainModel />
      </div>

    </div>

  );
}

export default Admin;