import { useState } from 'react';
import { motion } from 'framer-motion';
import api from '../utils/api';

const StudentRegister = () => {
  const [appNo, setAppNo] = useState('');
  const [password, setPassword] = useState('');
  const [isVerified , setIsVerified] = useState(null);

  const handelNext = () =>{
    if(appNo){
        setIsVerified(true)
    }
    const response = {
        isVerified : false,

    }
    if(response){
        setIsVerified(response.isVerified)
    }
  }





  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-600 via-white to-gray-400"
    >
      <motion.form
        whileHover={{ scale: 1.02 }}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-2xl font-bold text-center text-gray-800 mb-6"
        >
          Student Registration
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <label htmlFor="Cuet_app_no" className="block text-gray-700 font-medium mb-1">
            CUET APPLICATION No.
          </label>
          <input
            type="text"
            id="Cuet_app_no"
            name="Cuet_app_no"
            placeholder="CUET/25/01010101"
            value={appNo}
            onChange={(e) => setAppNo(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
            required
          />
        </motion.div>
        {isVerified ? (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <label htmlFor="password" className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
              required
            />
          </motion.div> 
        ): (<p>Already registered</p>) } 
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-6"
        >
          {isVerified ? (
            <button
              onClick={handleSubmit}
              className="w-full bg-violet-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-violet-700 transition duration-300"
            >
              Submit
            </button>
          ) : (
            <button
              onClick={handelNext}
              className="w-full bg-violet-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-violet-700 transition duration-300"
            >
              Next
            </button>
          )}
        </motion.div>
      </motion.form>
    </motion.div>
  );
};

export default StudentRegister;