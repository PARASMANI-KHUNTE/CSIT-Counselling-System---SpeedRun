import { useState } from 'react';
import PropTypes from 'prop-types';

const DashboardCard = ({ session }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [isFormActive, setIsFormActive] = useState(false);

  // Function to handle session close
  const handleCloseSession = async () => {
    setLoading(true);
    setError(null);
    setSuccessMessage('');

    try {
      const response = await fetch('http://localhost:9080/api/dashboard/updateSessionStatus', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sessionId: session.sessionId }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage(data.message); // Show success message
      } else {
        setError(data.error); // Show error message
      }
    } catch (err) {
      setError(`Internal server error ${err}`);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle form activation
  const handleActivateForm = async () => {
    setLoading(true);
    setError(null);
    setSuccessMessage('');

    try {
      const response = await fetch('http://localhost:9080/api/dashboard/ActivateForm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sessionId: session.sessionId }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage(data.message); // Show success message
        setIsFormActive(true); // Mark form as active
      } else {
        setError(data.error); // Show error message
      }
    } catch (err) {
      setError(`Internal server error ${err}`);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle form deactivation
  const handleDeactivateForm = async () => {
    setLoading(true);
    setError(null);
    setSuccessMessage('');

    try {
      const response = await fetch('http://localhost:9080/api/dashboard/DeactivateForm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sessionId: session.sessionId }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage(data.message); // Show success message
        setIsFormActive(false); // Mark form as inactive
      } else {
        setError(data.error); // Show error message
      }
    } catch (err) {
      setError(`Internal server error ${err}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md text-gray-300">
      <h2 className="text-2xl font-semibold text-white">Active Session</h2>
      <p className="mt-2">
        <strong>Title:</strong> {session.sessionTitle}
      </p>
      <p className="mt-2">
        <strong>Session id:</strong> {session.sessionId}
      </p>
      <p className="mt-2">
        <strong>Type:</strong> {session.courseType === "ug" ? "Under Graduate" : "Post Graduate"}
      </p>

      {/* Success message */}
      {successMessage && <p className="mt-2 text-green-500">{successMessage}</p>}

      {/* Error message */}
      {error && <p className="mt-2 text-red-500">{error}</p>}

      <p className="mt-2">
        <strong>Form Status:</strong> {isFormActive ? 'Active' : 'Inactive'}
      </p>

      {/* Session Buttons */}
      <button
        onClick={handleCloseSession}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-red-700"
        disabled={loading}
      >
        {loading ? 'Closing...' : 'Close Session'}
      </button>

      {/* Form Activation/Deactivation Buttons */}
      {!isFormActive ? (
        <button
          onClick={handleActivateForm}
          className="mt-4 ml-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          disabled={loading}
        >
          {loading ? 'Activating...' : 'Open Form'}
        </button>
      ) : (
        <button
          onClick={handleDeactivateForm}
          className="mt-4 ml-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          disabled={loading}
        >
          {loading ? 'Deactivating...' : 'Close Form'}
        </button>
      )}
    </div>
  );
};

// Add PropTypes for validation
DashboardCard.propTypes = {
  session: PropTypes.shape({
    sessionId: PropTypes.string.isRequired,
    sessionTitle: PropTypes.string.isRequired,
    courseType: PropTypes.oneOf(['ug', 'pg']).isRequired, // Only "ug" or "pg" allowed
  }).isRequired,
};

export default DashboardCard;
