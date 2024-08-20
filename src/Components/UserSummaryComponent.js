import React, { useEffect, useState } from "react";
import api from "../Services/api";

function UserSummaryComponent() {
  const [score, setScore] = useState(null);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    // Retrieve score and user details from localStorage
    const storedScore = localStorage.getItem("userScore");
    const storedDetails = localStorage.getItem("userDetails");

    if (storedScore && storedDetails) {
      setScore(storedScore);
      setUserDetails(JSON.parse(storedDetails));
    } else {
      // Fetch from API if not available in localStorage
      api
        .getSummary()
        .then((response) => {
          const data = response.data;
          setScore(data.score);
          setUserDetails(data.userDetails);
        })
        .catch((error) => console.error("Error fetching summary:", error));
    }
  }, []);

  return (
    <div>
      <h2>User Summary</h2>
      {userDetails && (
        <div>
          <h3>User Details:</h3>
          <p>
            <strong>Name:</strong> {userDetails.name}
          </p>
          <p>
            <strong>Email:</strong> {userDetails.email}
          </p>
          <p>
            <strong>Phone:</strong> {userDetails.phone}
          </p>
        </div>
      )}
      {score !== null ? (
        <div>
          <h3>Your Score: {score}</h3>
        </div>
      ) : (
        <p>No score available</p>
      )}
    </div>
  );
}

export default UserSummaryComponent;
