import { motion } from "framer-motion";
import Navbar from "../components/Navbar";

const LandingPage = () => {
  return (
    <div className="overflow-hidden h-screen bg-gradient-to-b from-violet-50 to-violet-100">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="flex flex-col items-center justify-center h-[70vh] space-y-6"
      >
        <motion.h1
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-5xl font-bold text-violet-900"
        >
          Welcome to Counselling System
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="text-lg text-violet-700"
        >
          Empowering students with personalized guidance and support.
        </motion.p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 text-lg font-semibold text-white bg-gradient-to-r from-violet-600 to-violet-800 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
        >
          Explore
        </motion.button>
      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="footer h-[30vh] text-center pt-20 bg-gradient-to-b from-violet-500 to-violet-950"
      >
        <h1 className="text-white text-xl font-semibold">
          Made by Parasmani Khunte
        </h1>
        <p className="text-violet-300 mt-2">All Rights Reserved © 2024 CSIT Department</p>
      </motion.div>
    </div>
  );
};

export default LandingPage;