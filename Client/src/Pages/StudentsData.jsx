import  { useEffect, useState } from "react";
import StudentCard from "./StudentCard";

const StudentsData = () => {
    const [students, setStudents] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await fetch(
                    `http://localhost:9080/api/dashboard/activeSession/students?page=${currentPage}&limit=50`
                );

                if (!response.ok) {
                    throw new Error("No Active Session Found");
                }

                const data = await response.json();

                setStudents((prev) => [...prev, ...data.students]); // Append to existing data
                setTotalPages(data.totalPages);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchStudents();
    }, [currentPage]);

    const loadMore = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    return (
      <div className="bg-gray-800 p-6 rounded-lg shadow-md">
    
      <h1 className="text-4xl font-bold mb-4 text-white">Student Data</h1>
  
      {error && <p className="text-red-500">{error}</p>}
  
      <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto"
          style={{ maxHeight: '500px' }}  // Set a max height for scrolling
      >
          {students.map((student) => (
              <StudentCard key={student.studentId} student={student} />
          ))}
      </div>
  
      {loading && <p className="text-gray-300 mt-4">Loading...</p>}
  
      {currentPage < totalPages && (
          <button
              onClick={loadMore}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              disabled={loading}
          >
              Load More
          </button>
      )}
  </div>
  
    );
};

export default StudentsData;
