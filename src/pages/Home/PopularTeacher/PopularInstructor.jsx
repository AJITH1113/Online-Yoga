import React, { useEffect, useState } from "react";
import axios from "axios"; // Import axios if useAxiosFetch is not available
import img from "../../../assets/home/girl.jpg"; // Default image

const PopularInstructor = () => {
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/popular_instructors") // Make sure this URL is correct
      .then((response) => {
        console.log("Fetched instructors:", response.data); // Log fetched data
        setInstructors(response.data);
      })
      .catch((error) => {
        console.error("Error fetching instructors:", error);
      });
  }, []);

  return (
    <div className="my-28">
      <div className="mb-20 text-center">
        <h1 className="text-5xl font-bold text-secondary">
          Our <span className="text-black dark:text-white">Amazing</span>{" "}
          Teachers
        </h1>
        <div className="w-[40%] mx-auto my-4 text-gray-500">
          <p>
            Explore our Popular Classes. Here are some popular instructors based
            on student enrollments.
          </p>
        </div>
      </div>

      {instructors.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 w-[90%] gap-6 mx-auto">
          {instructors.map((instructor) => (
            <div
              key={instructor._id}
              className="flex flex-col items-center px-6 py-8 duration-200 rounded-md shadow-md hover:-translate-y-2 dark:text-white"
            >
              <img
                className="w-24 h-24 mb-4 border-4 border-gray-300 rounded-full"
                src={instructor.photoUrl || img}
                alt={instructor.name}
              />
              <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                {instructor.name}
              </h3>
              <p className="text-gray-500">{instructor.email}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">No Instructor Available</p>
      )}
    </div>
  );
};

export default PopularInstructor;
