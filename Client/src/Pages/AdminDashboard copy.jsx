import  { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Home from "./Home";
import StudentsData from "./StudentsData";
import Applications from "./Applications";
import History from "./History";
import Profile from "./Profile";
import Settings from "./Settings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faUser,
  faCog,
  faBook,
  faSignOutAlt,
  faClockRotateLeft,
  faDatabase,
} from "@fortawesome/free-solid-svg-icons";

const AdminDashboard = () => {
 const navigate =  useNavigate();

 const handleLogout = async () => {
  const confirmLogout = window.confirm('Are you sure you want to log out?');
  if (!confirmLogout) return;

  try {
      const response = await fetch('http://localhost:9080/api/auth/employee/logout', {
          method: 'POST',
          credentials: 'include', // Include cookies in the request
      });

      if (response.ok) {
          alert('Logged out successfully');
          localStorage.removeItem('isAuthenticated');
          navigate('/login'); // Redirect to login page
      } else {
          const result = await response.json();
          alert('Logout failed: ' + result.message);
      }
  } catch (error) {
      console.error('Error during logout:', error);
      alert('Network error: Please ensure the server is running.');
  }
};

  const [activeComponent, setActiveComponent] = useState("Home");

  // Function to render the selected component
  const renderContent = () => {
    switch (activeComponent) {
      case "Home":
        return <Home />;
      case "StudentsData":
        return <StudentsData />;
      case "Applications":
        return <Applications />;
      case "History":
        return <History />;
      case "Profile":
        return <Profile />;
      case "Settings":
        return <Settings />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="flex h-screen bg-dark text-white">
      {/* Sidebar */}
      <div className="w-20 bg-gray-900 flex flex-col items-center py-6 space-y-8">
        {/* Sidebar Items */}
        <button
          className={`group relative p-3 w-full flex items-center justify-center ${
            activeComponent === "Home" ? "text-blue-400" : ""
          }`}
          onClick={() => setActiveComponent("Home")}
        >
          <span
            className={`absolute left-0 top-0 h-full w-1 ${
              activeComponent === "Home" ? "bg-blue-500" : "opacity-0"
            } group-hover:opacity-100 transition-all`}
          ></span>
          <FontAwesomeIcon icon={faHouse} className="text-2xl" />
        </button>

        <button
          className={`group relative p-3 w-full flex items-center justify-center ${
            activeComponent === "StudentsData" ? "text-blue-400" : ""
          }`}
          onClick={() => setActiveComponent("StudentsData")}
        >
          <span
            className={`absolute left-0 top-0 h-full w-1 ${
              activeComponent === "StudentsData" ? "bg-blue-500" : "opacity-0"
            } group-hover:opacity-100 transition-all`}
          ></span>
          <FontAwesomeIcon icon={faDatabase} className="text-2xl" />
        </button>

        <button
          className={`group relative p-3 w-full flex items-center justify-center ${
            activeComponent === "Applications" ? "text-blue-400" : ""
          }`}
          onClick={() => setActiveComponent("Applications")}
        >
          <span
            className={`absolute left-0 top-0 h-full w-1 ${
              activeComponent === "Applications" ? "bg-blue-500" : "opacity-0"
            } group-hover:opacity-100 transition-all`}
          ></span>
          <FontAwesomeIcon icon={faBook} className="text-2xl" />
        </button>

        <button
          className={`group relative p-3 w-full flex items-center justify-center ${
            activeComponent === "History" ? "text-blue-400" : ""
          }`}
          onClick={() => setActiveComponent("History")}
        >
          <span
            className={`absolute left-0 top-0 h-full w-1 ${
              activeComponent === "History" ? "bg-blue-500" : "opacity-0"
            } group-hover:opacity-100 transition-all`}
          ></span>
          <FontAwesomeIcon icon={faClockRotateLeft} className="text-2xl" />
        </button>

        <button
          className={`group relative p-3 w-full flex items-center justify-center ${
            activeComponent === "Profile" ? "text-blue-400" : ""
          }`}
          onClick={() => setActiveComponent("Profile")}
        >
          <span
            className={`absolute left-0 top-0 h-full w-1 ${
              activeComponent === "Profile" ? "bg-blue-500" : "opacity-0"
            } group-hover:opacity-100 transition-all`}
          ></span>
          <FontAwesomeIcon icon={faUser} className="text-2xl" />
        </button>

        <button
          className={`group relative p-3 w-full flex items-center justify-center ${
            activeComponent === "Settings" ? "text-blue-400" : ""
          }`}
          onClick={() => setActiveComponent("Settings")}
        >
          <span
            className={`absolute left-0 top-0 h-full w-1 ${
              activeComponent === "Settings" ? "bg-blue-500" : "opacity-0"
            } group-hover:opacity-100 transition-all`}
          ></span>
          <FontAwesomeIcon icon={faCog} className="text-2xl" />
        </button>

        <button
          className="group relative p-3 w-full flex items-center justify-center mt-auto"
          onClick={handleLogout}
        >
          <span
            className="absolute left-0 top-0 h-full w-1 bg-red-500 opacity-0 group-hover:opacity-100 transition-all"
          ></span>
          <FontAwesomeIcon icon={faSignOutAlt} className="text-2xl" />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gradient-to-b from-gray-900 via-black to-gray-800 p-8">
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminDashboard;
