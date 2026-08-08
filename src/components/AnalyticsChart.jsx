import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  { year: 2018, yield: 210 },
  { year: 2019, yield: 260 },
  { year: 2020, yield: 310 },
  { year: 2021, yield: 350 },
  { year: 2022, yield: 390 },
  { year: 2023, yield: 450 },
];

function AnalyticsChart() {

  return (

    <div
      id="analytics"
      className="
      backdrop-blur-xl
      bg-white/10
      border border-white/10
      rounded-3xl
      p-8
      shadow-2xl
      "
    >

      <h2 className="text-white text-3xl font-bold mb-8">
        Agricultural Yield Analytics
      </h2>

      <div style={{ width: "100%", height: 400 }}>

        <ResponsiveContainer>

          <LineChart data={data}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="year" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="yield"
              stroke="#22c55e"
              strokeWidth={4}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default AnalyticsChart;