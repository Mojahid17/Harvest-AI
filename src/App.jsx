import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero3D from "./components/Hero3D";
import PredictionForm from "./components/PredictionForm";
import CropRecommendation from "./components/CropRecommendation";
import AnalyticsChart from "./components/AnalyticsChart";
import StatsSection from "./components/StatsSection";
import FloatingGrid from "./components/FloatingGrid";
import HistoryTable from "./components/HistoryTable";

import Login from "./pages/Login";
import Admin from "./pages/Admin";

function HomePage() {

  return (

    <div className="bg-[#07140d] min-h-screen overflow-hidden">

      <FloatingGrid />

      <Navbar />

      <section className="relative h-screen flex items-center justify-center">

        <div className="absolute inset-0">
          <Hero3D />
        </div>

        <div className="relative z-10 text-center px-6">

          <h1 className="text-7xl font-bold text-white mb-6">
            HARVEST AI
          </h1>

          <p className="text-green-300 text-xl max-w-2xl mx-auto">
            Smart Agriculture Intelligence Platform powered by
            predictive analytics and machine learning.
          </p>

        </div>

      </section>

      {/* Yield Prediction */}
      <PredictionForm />

      {/* Crop Recommendation */}
      <CropRecommendation />

      {/* Analytics */}
      <section className="px-8 pb-24">
        <AnalyticsChart />
      </section>

      {/* Statistics */}
      <StatsSection />

      {/* History */}
      <HistoryTable />

    </div>

  );

}

function App() {

  return (

    <Routes>

      <Route
        path="/"
        element={<HomePage />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/admin"
        element={<Admin />}
      />

    </Routes>

  );

}

export default App;