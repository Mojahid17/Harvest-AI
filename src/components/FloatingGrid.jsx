import { motion } from "framer-motion";

function FloatingGrid() {

  const particles = Array.from({ length: 40 });

  return (

    <div className="absolute inset-0 overflow-hidden pointer-events-none">

      {particles.map((_, i) => (

        <motion.div
          key={i}
          className="
          absolute
          w-2
          h-2
          bg-green-400
          rounded-full
          opacity-20
          "
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            y: [null, -100, 100],
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            repeatType: "mirror",
          }}
        />

      ))}

    </div>
  );
}

export default FloatingGrid;