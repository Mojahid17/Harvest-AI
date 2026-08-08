import { motion } from "framer-motion";

function Navbar() {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 1 }}
      className="fixed top-0 left-0 w-full z-50
      backdrop-blur-md bg-white/5 border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">
        
        <h1 className="text-2xl font-bold text-green-400 tracking-widest">
          HARVEST AI
        </h1>

        <div className="flex gap-8 text-white">
          <a href="/">Home</a>
          <a href="#prediction">Prediction</a>
          <a href="#analytics">Analytics</a>
          <a href="/admin">Admin</a>
        </div>

      </div>
    </motion.nav>
  );
}

export default Navbar;