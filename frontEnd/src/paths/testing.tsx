import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Testing = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleButtonClick = () => {
    // Add parameters to the query string
    const newParams = { type: "first", category: "example" };
    navigate({
      pathname: location.pathname,
      search: new URLSearchParams(newParams).toString(),
    });
  };

  // Simulate API call when the component mounts or when parameters change
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    fetchData(params);
  }, [location.search]);

  const fetchData = (params: any) => {
    // Simulate an API call using the parameters
    console.log(`API Call with parameters:`, Object.fromEntries(params));
  };

  return (
    <div>
      <h1>Home Page</h1>
      <button onClick={handleButtonClick}>Add Parameters</button>
      {/* <Outlet /> */}
    </div>
  );
};

export default Testing;
