import React, { useEffect, useState } from "react";
import api from "../Services/api";

function UserSummaryComponent() {
  const [score, setScore] = useState(null);

  useEffect(() => {
    api
      .getSummary()
      .then((response) => {
        const data = response.data;
        // Assuming the score is in the data and it is properly formatted
        setScore(data.score);
      })
      .catch((error) => console.error("Error fetching summary:", error));
  }, []);

  return (
    <div>
      <h2>User Summary</h2>
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
