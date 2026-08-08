import { useState } from "react";
import API from "../services/api";
import GlassCard from "./GlassCard";

function CropRecommendation() {

  const [formData, setFormData] = useState({
    Crop_Year: "",
    State: "",
    Season: "",
    Area: "",
    Annual_Rainfall: "",
    Fertilizer: "",
    Pesticide: ""
  });

  const [recommendations, setRecommendations] =
    useState([]);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await API.post(
        "/recommend-crop",
        {
          Crop_Year: Number(formData.Crop_Year),
          State: formData.State,
          Season: formData.Season,
          Area: Number(formData.Area),
          Annual_Rainfall: Number(formData.Annual_Rainfall),
          Fertilizer: Number(formData.Fertilizer),
          Pesticide: Number(formData.Pesticide)
        }
      );

      setRecommendations(
        response.data.recommendations
      );

    } catch (error) {

      console.log(error);

      alert("Recommendation Failed");

    }

  };

  return (

    <section className="py-24 px-6 flex justify-center">

      <GlassCard>

        <h2 className="text-4xl font-bold text-white mb-8">
          Smart Crop Recommendation
        </h2>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
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
            placeholder="Area"
            onChange={handleChange}
            className="p-4 rounded-xl bg-black/30 text-white"
          />

          <input
            type="number"
            name="Annual_Rainfall"
            placeholder="Annual Rainfall"
            onChange={handleChange}
            className="p-4 rounded-xl bg-black/30 text-white"
          />

          <input
            type="number"
            name="Fertilizer"
            placeholder="Fertilizer"
            onChange={handleChange}
            className="p-4 rounded-xl bg-black/30 text-white"
          />

          <input
            type="number"
            name="Pesticide"
            placeholder="Pesticide"
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
            "
          >
            Recommend Crops
          </button>

        </form>

        {recommendations.length > 0 && (

          <div className="mt-10">

            <h3 className="text-3xl text-green-400 font-bold mb-6">
              Top 3 Recommended Crops
            </h3>

            {recommendations.map(
              (item, index) => (

                <div
                  key={index}
                  className="
                  bg-white/10
                  p-5
                  rounded-xl
                  mb-4
                  "
                >

                  <h4 className="text-2xl text-white font-bold">
                    #{index + 1} {item.crop}
                  </h4>

                  <p className="text-green-300">
                    Confidence:
                    {" "}
                    {item.confidence}%
                  </p>

                </div>

              )
            )}

          </div>

        )}

      </GlassCard>

    </section>

  );

}

export default CropRecommendation;