import { useState } from "react";
import API from "../services/api";

function RetrainModel() {

  const [message, setMessage] = useState("");

  const handleRetrain = async () => {

    alert("Retrain button clicked");

    console.log("Retrain button clicked");

    try {

      const response = await API.post(
        "/retrain-model"
      );

      console.log(response.data);

      setMessage(
        response.data.message
      );

    } catch (error) {

      console.error(error);

      setMessage(
        "Retraining failed"
      );

    }
  };

  return (

    <div
      className="
      backdrop-blur-xl
      bg-white/10
      border
      border-white/10
      rounded-3xl
      p-8
      shadow-2xl
      "
    >

      <h2
        className="
        text-3xl
        font-bold
        text-white
        mb-6
        "
      >
        AI Model Retraining
      </h2>

      <p
        className="
        text-green-200
        mb-8
        "
      >
        Retrain the machine learning model
        using the latest uploaded dataset.
      </p>

      <button
        type="button"
        onClick={handleRetrain}
        className="
        bg-green-500
        hover:bg-green-400
        text-black
        font-bold
        py-3
        px-8
        rounded-xl
        transition
        cursor-pointer
        "
      >
        Retrain Model
      </button>

      {message && (

        <p
          className="
          text-green-400
          mt-6
          "
        >
          {message}
        </p>

      )}

    </div>
  );
}

export default RetrainModel;