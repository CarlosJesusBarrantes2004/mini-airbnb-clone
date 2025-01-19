import { useState } from "react";
import PropertyContext from "./PropertyContext";
import { BACKEND_URL } from "../../config";

interface PropertyProviderProps {
  children: React.ReactNode;
}

const PropertyProvider = ({ children }: PropertyProviderProps) => {
  const [properties, setProperties] = useState([]);

  const fetchProperties = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/properties`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const json = await response.json();

      if (json.success) setProperties(json.properties);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPropertiesByOwner = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/properties/user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const json = await response.json();

      if (json.success) setProperties(json.properties);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPropertyById = async (id: string) => {
    try {
      const response = await fetch(`${BACKEND_URL}/properties/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const json = await response.json();

      return json;
    } catch (error) {
      console.log(error);
    }
  };

  const createProperty = async (property: any) => {
    try {
      const response = await fetch(`${BACKEND_URL}/properties`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          ...property,
          price: Number(property.price),
          maxGuests: Number(property.maxGuests),
        }),
      });

      const json = await response.json();

      return json;
    } catch (error) {
      console.log(error);
    }
  };

  const updateProperty = async (id: string, property: any) => {
    try {
      const response = await fetch(`${BACKEND_URL}/properties/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(property),
      });

      const json = await response.json();

      console.log(json);
    } catch (error) {
      console.log(error);
    }
  };

  const value = {
    properties,
    fetchProperties,
    fetchPropertiesByOwner,
    fetchPropertyById,
    createProperty,
    updateProperty,
  };

  return (
    <PropertyContext.Provider value={value}>
      {children}
    </PropertyContext.Provider>
  );
};

export default PropertyProvider;
