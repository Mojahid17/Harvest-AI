import { useEffect, useState } from "react";
import API from "../services/api";

function HistoryTable() {

  const [history, setHistory] = useState([]);

  useEffect(() => {

    fetchHistory();

  }, []);

  const fetchHistory = async () => {

    try {

      const response = await API.get("/history");

      setHistory(response.data);

    } catch (error) {

      console.log(error);

    }
  };

  return (

    <section className="py-24 px-8">

      <div
        className="
        backdrop-blur-xl
        bg-white/10
        border border-white/10
        rounded-3xl
        p-8
        shadow-2xl
        overflow-x-auto
        "
      >

        <h2 className="text-4xl font-bold text-white mb-8">
          Prediction History
        </h2>

        <table className="w-full text-white">

          <thead>

            <tr className="border-b border-white/20">

              <th className="p-4 text-left">
                Rainfall
              </th>

              <th className="p-4 text-left">
                Fertilizer
              </th>

              <th className="p-4 text-left">
                Pesticide
              </th>

              <th className="p-4 text-left">
                Predicted Yield
              </th>

              <th className="p-4 text-left">
                Timestamp
              </th>

            </tr>

          </thead>

          <tbody>

            {history.map((item, index) => (

              <tr
                key={index}
                className="border-b border-white/10"
              >

                <td className="p-4">
                  {item.rainfall} mm/year
                </td>

                <td className="p-4">
                  {item.fertilizer} kg/hectare
                </td>

                <td className="p-4">
                  {item.pesticide} kg/hectare
                </td>

                <td className="p-4 text-green-400 font-bold">
                  {item.yield.toFixed(2)} tons/hectare
                </td>

                <td className="p-4">
                  {item.created_at}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </section>
  );
}

export default HistoryTable;