import { useState } from "react";
import API from "../services/api";
import GlassCard from "./GlassCard";
import { motion } from "framer-motion";

function PredictionForm() {

  const [formData, setFormData] = useState({
    Crop_Year: "",
    State: "",
    Season: "",
    Area: "",
    Annual_Rainfall: "",
    Fertilizer: "",
    Pesticide: "",
  });

  const [prediction, setPrediction] = useState(null);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await API.post(
        "/predict",
        {
          Crop_Year: Number(formData.Crop_Year),
          State: formData.State,
          Season: formData.Season,
          Area: Number(formData.Area),
          Annual_Rainfall: Number(formData.Annual_Rainfall),
          Fertilizer: Number(formData.Fertilizer),
          Pesticide: Number(formData.Pesticide),
        }
      );

      setPrediction(
        response.data.predicted_yield
      );

    } catch (error) {

      console.log("FULL ERROR:", error);

      console.log(
        "SERVER RESPONSE:",
        error.response
      );

      alert(
        error.response?.data?.error ||
        error.message ||
        "Prediction Failed"
      );

    }

  };

  return (

    <section
      id="prediction"
      className="py-24 px-6 flex justify-center"
    >

      <GlassCard>

        <motion.div
          initial={{
            opacity: 0,
            y: 80,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
          }}
        >

          <h2 className="text-4xl font-bold text-white mb-8">
            Smart Crop Yield Prediction
          </h2>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5"
          >

            <input
              type="number"
              name="Crop_Year"
              placeholder="Crop Year"
              onChange={handleChange}
              className="p-4 rounded-xl bg-black/30 text-white"
            />

            <input
              type="text"
              name="State"
              placeholder="State"
              onChange={handleChange}
              className="p-4 rounded-xl bg-black/30 text-white"
            />

            <input
              type="text"
              name="Season"
              placeholder="Season"
              onChange={handleChange}
              className="p-4 rounded-xl bg-black/30 text-white"
            />

            <input
              type="number"
              name="Area"
              placeholder="Area (hectares)"
              onChange={handleChange}
              className="p-4 rounded-xl bg-black/30 text-white"
            />

            <input
              type="number"
              name="Annual_Rainfall"
              placeholder="Annual Rainfall (mm/year)"
              onChange={handleChange}
              className="p-4 rounded-xl bg-black/30 text-white"
            />

            <input
              type="number"
              name="Fertilizer"
              placeholder="Fertilizer (kg/hectare)"
              onChange={handleChange}
              className="p-4 rounded-xl bg-black/30 text-white"
            />

            <input
              type="number"
              name="Pesticide"
              placeholder="Pesticide (kg/hectare)"
              onChange={handleChange}
              className="p-4 rounded-xl bg-black/30 text-white"
            />

            <button
              type="submit"
              className="
              bg-green-500
              hover:bg-green-400
              text-black
              font-bold
              py-4
              rounded-xl
              transition
              "
            >
              Predict Yield
            </button>

          </form>

          {prediction !== null && (

            <div className="mt-8 text-center">

              <h3 className="text-green-400 text-3xl font-bold">
                Predicted Yield
              </h3>

              <p className="text-white text-2xl mt-4">
                {prediction} tons/hectare
              </p>

            </div>

          )}

        </motion.div>

      </GlassCard>

    </section>

  );

}

export default PredictionForm;