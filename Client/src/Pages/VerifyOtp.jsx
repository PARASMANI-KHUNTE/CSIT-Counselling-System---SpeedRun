import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../utils/api';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const VerifyOtp = () => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { email, context } = location.state || {};

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !otp) {
      toast.error('Email and OTP are required.');
      return;
    }
    setLoading(true);
    try {
      const response = await api.post('users/verify-otp', { email, otp });
      toast.success(response.data.message);
      if (context === 'signup') {
        navigate('/login');
      } else if (context === 'resetpassword') {
        navigate('/update-password', { state: { email } });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 via-purple-200 to-white"
    >
      <motion.form
        whileHover={{ scale: 1.02 }}
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-96"
      >
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-2xl font-bold mb-6 text-center"
        >
          Verify OTP
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <input
            type="text"
            placeholder="OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </motion.div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="w-full bg-purple-600 text-white p-2 rounded hover:bg-purple-700 transition duration-300"
        >
          {loading ? <Loader /> : 'Verify OTP'}
        </motion.button>
      </motion.form>
    </motion.div>
  );
};

export default VerifyOtp;