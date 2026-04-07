import { useState, useEffect } from "react";

/**
 * Custom hook to simulate a loading delay whenever specific dependencies change.
 * @param {Array} dependencies - Array of dependencies that trigger the simulation.
 * @param {number} delay - Duration of the simulation in milliseconds (default 500).
 * @returns {boolean} - The current simulation state.
 */
const useSimulatedLoading = (dependencies, delay = 500) => {
  const [isSimulating, setIsSimulating] = useState(false);

  useEffect(() => {
    setIsSimulating(true);
    const timer = setTimeout(() => setIsSimulating(false), delay);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return isSimulating;
};

export default useSimulatedLoading;
