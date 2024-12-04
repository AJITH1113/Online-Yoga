import React, { useEffect, useState } from "react";
import axios from "axios";

const Notification = () => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/classes")
      .then((response) => setClasses(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Add time periods to the classes data
  const addTimePeriods = (classes) => {
    const timePeriodsList = [
      ["6 AM", "10 AM", "4 PM", "7 PM"],
      ["6 AM", "9 AM", "12 PM", "4 PM", "6 PM"],
      ["7 AM", "11 AM", "3 PM", "6 PM"],
      ["8 AM", "12 PM", "5 PM"],
      ["6 AM", "8 AM", "1 PM", "3 PM", "5 PM"],
      ["7 AM", "10 AM", "2 PM", "6 PM"],
      ["8 AM", "11 AM", "1 PM", "4 PM"],
    ];

    return classes.map((cls, index) => ({
      ...cls,
      timePeriods: timePeriodsList[index % timePeriodsList.length],
    }));
  };

  const classesWithTimePeriods = addTimePeriods(classes);

  return (
    <div className="container px-4 py-8 mx-auto">
      <h1 className="mb-8 text-3xl font-bold text-center">Classes</h1>
      <div className="space-y-8">
        {classesWithTimePeriods.map((cls) => (
          <div
            key={cls._id}
            className="flex flex-col overflow-hidden bg-white rounded-lg shadow-md md:flex-row"
          >
            <div className="flex items-center justify-center w-full md:w-1/3">
              <img
                src={cls.image}
                alt={cls.name}
                className="object-cover h-auto max-h-64"
              />
            </div>
            <div className="flex-1 p-4">
              <h2 className="mb-2 text-2xl font-bold">{cls.name}</h2>
              <p className="mb-2 text-gray-800">
                <strong>Instructor:</strong> {cls.instructorName}
              </p>
              <p className="mb-2 text-gray-800">
                <strong>Email:</strong> {cls.instructorEmail}
              </p>
              <p className="mb-2 text-gray-800">
                <strong>Price:</strong> ${cls.price}
              </p>
              <p className="mb-2 text-gray-800">
                <strong>Available Seats:</strong> {cls.availableSeats}
              </p>
              <p className="mb-2 text-gray-800">
                <strong>Total Enrolled:</strong> {cls.totalEnrolled}
              </p>
              <div className="p-4 mt-4 bg-gray-100 rounded shadow">
                <p className="mb-2 text-gray-800">
                  <strong>Time Periods:</strong>
                </p>
                <div className="flex flex-wrap gap-2">
                  {cls.timePeriods.map((time, idx) => (
                    <div
                      key={idx}
                      className="px-2 py-1 bg-white rounded shadow-sm"
                    >
                      {time}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notification;
