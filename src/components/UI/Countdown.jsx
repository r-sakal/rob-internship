import React, { useEffect, useState } from "react";

const Countdown = ({ expiryDate, className = "de_countdown" }) => {
  const [currentTime, setCurrentTime] = useState(Date.now());

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  if (!expiryDate) {
    return null;
  }

  const timeRemaining = Math.max(expiryDate - currentTime, 0);
  const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
  const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

  return <div className={className}>{`${hours}h ${minutes}m ${seconds}s`}</div>;
};

export default Countdown;
