import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Navbar = () => {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex p-4 justify-between items-center bg-white shadow-md"
    >
      {/* Logo Section */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="logo flex items-center space-x-4"
      >
        <img
          width={30}
          height={20}
          src="logo.png"
          alt="uni logo"
          className="rounded-full"
        />
        <Link
          to="/"
          className="text-xl font-bold text-violet-900 hover:text-violet-700 transition-colors duration-300"
        >
          CSIT Counseling System
        </Link>
      </motion.div>

      {/* Navigation Links */}
      <div className="navbar">
        <ul className="flex space-x-5">
          <motion.li
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="hover:text-white p-2 cursor-pointer rounded hover:bg-violet-500 transition-colors duration-300"
          >
            <Link to="/student" className="text-violet-900 hover:text-white">
              Student
            </Link>
          </motion.li>
          <motion.li
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="hover:text-white p-2 cursor-pointer rounded hover:bg-violet-500 transition-colors duration-300"
          >
            <Link to="/admin" className="text-violet-900 hover:text-white">
              Admin
            </Link>
          </motion.li>
        </ul>
      </div>
    </motion.nav>
  );
};

export default Navbar;