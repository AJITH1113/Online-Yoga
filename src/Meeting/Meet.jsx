import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Meet = () => {
  const { email } = useAuth();
  const [classes, setClasses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!email) {
      navigate("/");
      return;
    }

    const fetchClasses = async () => {
      try {
        const response = await axios.get("http://localhost:5000/classes");
        setClasses(response.data);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };

    fetchClasses();
  }, [email, navigate]);

  const handleJoinClass = (classId) => {
    navigate(`/app/${classId}`);
  };

  return (
    <div className="p-4">
      <h1 className="mb-4 text-3xl font-bold text-center">Yoga Classes</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {classes.map((classItem) => (
          <div
            key={classItem._id}
            className="relative p-4 overflow-hidden bg-white rounded-lg shadow-md group"
          >
            <img
              src={classItem.image}
              alt={classItem.name}
              className="object-cover w-full h-40 mb-4 transition-transform duration-300 transform rounded group-hover:scale-110"
            />
            <h2 className="text-lg font-semibold text-gray-800">
              {classItem.name}
            </h2>
            <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 ease-in-out bg-black opacity-0 bg-opacity-40 backdrop-blur-sm group-hover:opacity-100">
              <button
                className="px-4 py-2 text-lg font-bold text-white bg-blue-500 rounded-lg"
                onClick={() => handleJoinClass(classItem._id)} // Navigate to the specific class
              >
                Join Class
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Meet;
