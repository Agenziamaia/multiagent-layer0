import { useState } from 'react';

interface CounterProps {
  initialValue?: number;
  step?: number;
}

export const Counter: React.FC<CounterProps> = ({ initialValue = 0, step = 1 }) => {
  const [value, setValue] = useState(initialValue);

  const handleIncrement = () => setValue((v) => v + step);
  const handleDecrement = () => setValue((v) => v - step);
  const handleReset = () => setValue(initialValue);

  return (
    <div className="counter-container">
      <div className="counter-display">
        <span>Value: {value}</span>
      </div>
      <div className="button-group">
        <button type="button" onClick={handleDecrement} aria-label="Decrease value">
          Decrement
        </button>
        <button type="button" onClick={handleReset} aria-label="Reset value">
          Reset
        </button>
        <button type="button" onClick={handleIncrement} aria-label="Increase value">
          Increment
        </button>
      </div>
    </div>
  );
};
