import { useEffect, useState } from "react";
import DashboardCard from "./DashboardCard";
import * as XLSX from "xlsx";

const Home = () => {
  const [activeSession, setActiveSession] = useState(null);
  const [loading, setLoading] = useState(false);
  const [converting, setConverting] = useState(false); // Track conversion state
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchActiveSession = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:9080/api/dashboard/activeSession");

        if (!response.ok) {
          throw new Error("Failed to fetch active session");
        }

        const data = await response.json();
        if (data.activeSession) {
          setActiveSession(data.activeSession);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchActiveSession();
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.target);
    const file = formData.get("file");

    if (!file || file.type !== "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
      setError("Please upload a valid Excel file.");
      setLoading(false);
      return;
    }

    try {
      setConverting(true); // Start conversion loading state

      // Convert Excel file to JSON data
      const jsonData = await new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (event) => {
          try {
            const data = new Uint8Array(event.target.result);
            const workbook = XLSX.read(data, { type: "array" });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const json = XLSX.utils.sheet_to_json(worksheet);
            resolve(json);
          } catch (err) {
            reject(err);
          }
        };

        reader.onerror = () => reject(new Error("Failed to read the Excel file"));
        reader.readAsArrayBuffer(file);
      });

      setConverting(false); // End conversion loading state

      // Send JSON data to the server
      const response = await fetch("http://localhost:9080/api/dashboard/createSession", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sessionTitle: formData.get("title"),
          courseType: formData.get("courseType"),
          students: jsonData // Ensure `jsonData` matches the expected structure
        })
        
      });

      if (!response.ok) {
        const errorData = await response.json();
        
        throw new Error(errorData.message );
      }

      
     
     
      
      setShowForm(false);
      setActiveSession(await response.json());

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setConverting(false); // Ensure conversion state is reset in case of error
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl text-gray-300">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <>
      <h1 className="text-4xl font-bold mb-4">Home</h1>

      {activeSession ? (
        <DashboardCard session={activeSession} />
      ) : (
        !showForm && (
          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-white">Counseling Session</h2>
            <p className="mt-2 text-gray-300">No Active Counseling Session</p>
            <div className="mt-4 flex space-x-4">
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                onClick={() => setShowForm(true)}
              >
                Create
              </button>
             
            </div>
          </div>
        )
      )}

      {showForm && (
        <div className="bg-gray-800 p-6 rounded-lg shadow-md mt-6">
          <form onSubmit={handleFormSubmit} className="space-y-4 text-gray-300">
            <div>
              <label className="block mb-2 text-sm font-semibold">Session Title</label>
              <input
                name="title"
                type="text"
                placeholder="Enter session title"
                className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-semibold">Select Course Type</label>
              <select
                name="courseType"
                className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              >
                <option value="ug">Under Graduate</option>
                <option value="pg">Post Graduate</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 text-sm font-semibold">Upload Excel Sheet</label>
              <input
                name="file"
                type="file"
                accept=".xlsx, .xls"
                className="w-full text-white px-4 py-2 bg-gray-700 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                required
              />
            </div>

            <div className="flex space-x-4 mt-6">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                disabled={loading || converting}
              >
                {loading || converting ? "Processing..." : "Create"}
              </button>
              <button
                type="button"
                className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                onClick={() => setShowForm(false)}
                disabled={loading || converting}
              >
                Cancel
              </button>
            </div>

            {error && (
              <div className="mt-4 text-red-500 text-sm">
                Failed to create session: {error}
              </div>
            )}
          </form>
        </div>
      )}
    </>
  );
};

export default Home;
