import React from "react";

interface TimeSelectorProps {
  timeMinute: number;
  setTimeMinute: (value: number) => void;
}

const TimeSelector: React.FC<TimeSelectorProps> = ({
  timeMinute,
  setTimeMinute,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTimeMinute(Number(event.target.value));
  };

  return (
    <div>
      <label htmlFor="time-select">זמן משחק בדקות:  </label>
      <select id="time-select" value={timeMinute} onChange={handleChange}>
        {Array.from({ length: 30 }, (_, i) => (
          <option key={i + 1} value={i + 1}>
            {i + 1}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TimeSelector;
