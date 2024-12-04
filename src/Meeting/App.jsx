import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth"; // Import useAuth to access user email
import axios from "axios"; // Import axios for API requests

const App = () => {
  const { email } = useAuth(); // Get user email from useAuth
  const { classId } = useParams(); // Get the class ID from URL parameters
  const [roomId, setRoomId] = useState("");
  const [randomNumber, setRandomNumber] = useState(
    Math.floor(100000 + Math.random() * 900000)
  ); // Store generated random number
  const navigate = useNavigate();
  const [hasAccess, setHasAccess] = useState(false); // State to check access

  useEffect(() => {
    const checkPaymentStatus = async () => {
      try {
        const response = await axios.get("http://localhost:5000/data-payment");
        const payments = response.data;

        // Check for a matching payment record
        const paymentRecord = payments.find(
          (payment) =>
            payment.userEmail === email &&
            payment.classesId.includes(classId) &&
            payment.paymentStatus === "succeeded"
        );

        if (paymentRecord) {
          setHasAccess(true); // Allow access if conditions are met
        } else {
          alert("Your payment has not been confirmed for this class."); // Alert for failed payment
          navigate("/meet"); // Navigate to home if conditions are not met
        }
      } catch (error) {
        console.error("Error fetching payment data:", error);
        alert("An error occurred while checking your payment status."); // Alert for error
        navigate("/"); // Navigate to home on error
      }
    };

    checkPaymentStatus();
  }, [email, classId, navigate]);

  const handleJoin = () => {
    // Navigate to the specified room only if the roomId matches the randomNumber
    if (roomId && parseInt(roomId) === randomNumber) {
      // Pass both roomId and classId to the Room component
      navigate(`/room/${roomId}?classId=${classId}`);
    } else {
      alert("Please enter the correct Room ID."); // Alert user for incorrect Room ID
    }
  };

  // Prevent rendering if access is not granted
  if (!hasAccess) {
    return null; // You can return a loading spinner or message if needed
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="w-full max-w-md p-8 text-center bg-white rounded-lg shadow-lg">
        <h1 className="mb-4 text-3xl font-bold text-gray-800">
          Welcome to the Class!
        </h1>

        {/* Display User Email, Class ID, and Room ID */}
        <div className="mb-4 text-lg text-gray-600">
          <div>
            <strong>Room ID:</strong> {randomNumber}{" "}
            {/* Display generated number as Room ID */}
          </div>
          <div>
            <strong>Email:</strong>{" "}
            <span className="font-semibold text-blue-500">{email}</span>
          </div>
        </div>

        {/* Input Box for Room ID */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter Room ID"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Button to Join Video Stream */}
        <button
          onClick={handleJoin}
          className="w-full px-4 py-2 text-lg font-bold text-white transition duration-200 bg-blue-500 rounded-lg hover:bg-blue-600"
        >
          Join Class
        </button>

        <p className="mt-4 text-gray-500">
          Enjoy your yoga session and feel free to explore!
        </p>
      </div>
    </div>
  );
};

export default App;
