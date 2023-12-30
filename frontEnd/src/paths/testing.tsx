import { useEffect, useMemo, useState } from "react";

export default function Testing() {
  const [first, setFirst] = useState(0);
  const [second, setSecond] = useState(0);
  //   const [isEven, setIsEven] = useState(false);
  const handleFirst = () => {
    setFirst((prev) => prev + 1);
  };

  const handleSEcond = () => {
    setSecond((prev) => prev + 1);
  };

  //   useEffect(() => {
  //     console.log("I AM USEEFECT");
  //     if (second % 2 == 0) {
  //       setIsEven(true);
  //     } else {
  //       setIsEven(false);
  //     }
  //   }, [[second]]);

  //example of useMEMO
  const isEven = useMemo(() => {
    console.log("i am ------");

    return second % 2 === 0;
  }, [second]);

  return (
    <>
      I am for testing purpuse
      <div className="d-flex gap-4 justify-content-center ">
        <h3 className="d-flex justify-content-center ">First -{first}</h3>
        <h3 className="d-flex justify-content-center ">
          Second - {second} & - {isEven ? "EVEN" : "ODD"}
        </h3>
      </div>
      <div className="d-flex justify-content-center ">
        <div className="d-flex gap-4 ">
          <button
            onClick={handleFirst}
            className="bg-warning border-0 rounded-1 p-2 "
          >
            first inc
          </button>

          <button
            onClick={handleSEcond}
            className="bg-info   fw-bold  border-0 rounded-1 p-2 "
          >
            sec inc
          </button>
        </div>
      </div>
    </>
  );
}
