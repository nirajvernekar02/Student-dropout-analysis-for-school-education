import React, { useState, useEffect } from "react";

const NumberCard = ({ data }) => {
  const [currentCount, setCurrentCount] = useState(0);
  const finalNumber = data.count;
  const [delay, setDelay] = useState(40); // Initial delay in milliseconds

  useEffect(() => {
    let intervalId;

    const updateCount = () => {
      if (currentCount < finalNumber) {
        setCurrentCount((prev) => prev + 1);

        // Calculate the remaining count
        const remaining = finalNumber - currentCount;

        // If the remaining count is less than 10% of the final number
        if (remaining <= finalNumber * 0.1) {
          // Increase the delay for slower counting
          setDelay(200); // Adjust this value as needed
        }
      } else {
        clearInterval(intervalId);
      }
    };

    intervalId = setInterval(updateCount, delay);

    return () => clearInterval(intervalId);
  }, [currentCount, finalNumber, delay]);

  return (
    <div className="card border border-gray-300 rounded-lg p-4 w-80 mx-auto">
      <div className="flex items-center mb-4"></div>
      <div className="text-4xl font-bold">{currentCount}</div>
    </div>
  );
};

export default NumberCard;
