import React, { useState } from "react";

const Home: React.FC = () => {
  const [ballCount, setBallCount] = useState<number>(1);
  const [overCount, setOverCount] = useState<number>(0);
  const [counter, setCounter] = useState<number>(0);
  const changeOver = () => {
    setOverCount((prev) => prev + 1);
  };
  const handleButton = (curr: number) => {
    if (curr === 5) {
      changeOver();
    }
    if (curr < 6) {
      setBallCount(curr + 1);
    } else {
      setBallCount(1);
    }
  };

  const handleCounter = (type: string, count: number) => {
    if (type === "inc") {
      setCounter(count + 1);
    } else if (type === "dec") {
      setCounter(count - 1);
    }
  };

  return (
    <div>
      <p className="text-bold">
        Ball count is {ballCount} <span>TOTAL OVER {overCount}</span>
      </p>
      <button
        disabled={ballCount > 6}
        onClick={() => handleButton(ballCount)}
        className="bg-primary text-white rounded-1"
      >
        Ball inc
      </button>
      <p className="mt-2 fw-bold">Counter App</p>

      <div className="d-flex justify-content-between ">
        <button
          onClick={() => handleCounter("inc", counter)}
          className="bg-primary rounded-2 text-white "
        >
          inc +
        </button>
        <h3>{counter}</h3>
        <button
          onClick={() => handleCounter("dec", counter)}
          className="bg-danger rounded-2 text-white "
        >
          dec -
        </button>
      </div>
    </div>
  );
};

export default Home;
