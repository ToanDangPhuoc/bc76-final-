import React, { useEffect } from "react";

const UseViewport = () => {
  const [width, setWidth] = React.useState(window.innerWidth);

  useEffect(() => {
    const handleWindownResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindownResize);
    return () => window.removeEventListener("resize", handleWindownResize);
  }, []);
  return { width };
};

export default UseViewport;
