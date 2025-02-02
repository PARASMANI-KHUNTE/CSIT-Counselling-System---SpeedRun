import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faBook,
  faFileAlt,
  faUser,
  faCog,
  faChartBar,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";

const StudentDashboard = () => {
  const [activeComponent, setActiveComponent] = useState("Home");

//   // Function to render the selected component
//   const renderContent = () => {
//     switch (activeComponent) {
//       case "Home":
//         return <StudentHome />;
//       case "Courses":
//         return <StudentApplication />;
//       case "Profile":
//         return <Profile />;
//       case "Settings":
//         return <Settings />;
//       default:
//         return <StudentHome />;
//     }
//   };

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
            activeComponent === "Courses" ? "text-blue-400" : ""
          }`}
          onClick={() => setActiveComponent("Courses")}
        >
          <span
            className={`absolute left-0 top-0 h-full w-1 ${
              activeComponent === "Courses" ? "bg-blue-500" : "opacity-0"
            } group-hover:opacity-100 transition-all`}
          ></span>
          <FontAwesomeIcon icon={faBook} className="text-2xl" />
        </button>

        <button
          className={`group relative p-3 w-full flex items-center justify-center ${
            activeComponent === "Assignments" ? "text-blue-400" : ""
          }`}
          onClick={() => setActiveComponent("Assignments")}
        >
          <span
            className={`absolute left-0 top-0 h-full w-1 ${
              activeComponent === "Assignments" ? "bg-blue-500" : "opacity-0"
            } group-hover:opacity-100 transition-all`}
          ></span>
          <FontAwesomeIcon icon={faFileAlt} className="text-2xl" />
        </button>

        <button
          className={`group relative p-3 w-full flex items-center justify-center ${
            activeComponent === "Grades" ? "text-blue-400" : ""
          }`}
          onClick={() => setActiveComponent("Grades")}
        >
          <span
            className={`absolute left-0 top-0 h-full w-1 ${
              activeComponent === "Grades" ? "bg-blue-500" : "opacity-0"
            } group-hover:opacity-100 transition-all`}
          ></span>
          <FontAwesomeIcon icon={faChartBar} className="text-2xl" />
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
          onClick={() => alert("Sign out clicked!")}
        >
          <span
            className="absolute left-0 top-0 h-full w-1 bg-red-500 opacity-0 group-hover:opacity-100 transition-all"
          ></span>
          <FontAwesomeIcon icon={faSignOutAlt} className="text-2xl" />
        </button>
      </div>

      {/* Main Content */}
      {/* <div className="flex-1 bg-gradient-to-b from-gray-900 via-black to-gray-800 p-8">
        {renderContent()}
      </div> */}
    </div>
  );
};

export default StudentDashboard;
