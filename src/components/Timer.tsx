import React, { useEffect, useState } from "react";

type TimerProps = {
  initialMinutes?: number;
  initialSeconds?: number;
};

const Timer: React.FC<TimerProps> = ({ initialMinutes = 15, initialSeconds = 0 }) => {
  const [minutes, setMinutes] = useState<number>(initialMinutes);
  const [seconds, setSeconds] = useState<number>(initialSeconds);

  useEffect(() => {
    const countdown = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(countdown);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    
    return () => clearInterval(countdown);
  }, [seconds, minutes]);

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold">Countdown Timer</h1>
      <div className="text-4xl font-mono">
        {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </div>
    </div>
  );
};

export default Timer;
