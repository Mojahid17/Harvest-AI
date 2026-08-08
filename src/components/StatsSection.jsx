import { motion } from "framer-motion";

const stats = [
  {
    title: "Dataset Records",
    value: "5000+",
  },
  {
    title: "Prediction Accuracy",
    value: "94%",
  },
  {
    title: "States Analysed",
    value: "28",
  },
  {
    title: "ML Processing Speed",
    value: "0.3s",
  },
];

function StatsSection() {

  return (

    <section className="py-24 px-8">

      <div className="grid md:grid-cols-4 gap-8">

        {stats.map((item, index) => (

          <motion.div
            key={index}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            className="
            backdrop-blur-xl
            bg-white/10
            border border-white/10
            rounded-3xl
            p-8
            text-center
            shadow-2xl
            "
          >

            <h2 className="text-5xl font-bold text-green-400 mb-4">
              {item.value}
            </h2>

            <p className="text-white text-lg">
              {item.title}
            </p>

          </motion.div>

        ))}

      </div>

    </section>
  );
}

export default StatsSection;