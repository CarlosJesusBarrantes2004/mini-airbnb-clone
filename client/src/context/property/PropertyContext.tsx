import { createContext } from "react";
import { PropertyContextType } from "../../types/property.types";

const PropertyContext = createContext<PropertyContextType | null>(null);

export default PropertyContext;
