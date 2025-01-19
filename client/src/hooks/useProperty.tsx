import { useContext } from "react";
import PropertyContext from "../context/property/PropertyContext";

const useProperty = () => {
  const context = useContext(PropertyContext);
  if (!context) throw new Error("usePlace must be used within a PlaceProvider");
  return context;
};

export default useProperty;
