import React, { useEffect, useState } from "react";
import axios from "axios";

const YogaCategories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/categories"
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen py-8 bg-gray-100">
      <div className="container px-6 mx-auto">
        <h1 className="mt-16 mb-10 text-4xl font-extrabold text-center text-blue-600">
          Explore Yoga Categories
        </h1>
        <div className="space-y-8">
          {categories.map((category, index) => (
            <div
              key={category._id}
              className={`p-6 transition-transform duration-300 bg-white rounded-lg shadow-lg hover:scale-105 ${
                index === 0 || index === 3 ? "w-full" : "lg:w-1/2"
              }`}
              style={
                index !== 0 && index !== 3
                  ? { display: "inline-block", verticalAlign: "top" }
                  : {}
              }
            >
              <h2 className="mb-4 text-2xl font-bold text-orange-500">
                {category.category_name}
              </h2>
              <p className="mb-4 text-gray-600">
                {category.category_description}
              </p>
              <h3 className="mb-4 text-xl font-semibold text-blue-500">
                Poses:
              </h3>
              <ul className="space-y-4">
                {category.poses.map((pose) => (
                  <li
                    key={pose.id}
                    className="p-4 transition-shadow duration-300 bg-gray-50 rounded-lg shadow-md hover:shadow-xl"
                  >
                    <h4 className="text-lg font-semibold text-gray-700">
                      {pose.english_name}{" "}
                      <span className="text-sm text-gray-500">
                        ({pose.sanskrit_name})
                      </span>
                    </h4>
                    <p className="mb-2 text-gray-600">
                      {pose.pose_description}
                    </p>
                    <p className="mb-2 text-gray-600">
                      <span className="font-semibold">Benefits:</span>{" "}
                      {pose.pose_benefits}
                    </p>
                    <div className="flex justify-center mt-4">
                      <img
                        className="object-cover w-64 h-64 rounded-lg shadow-lg"
                        src={pose.url_png}
                        alt={pose.english_name}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default YogaCategories;
