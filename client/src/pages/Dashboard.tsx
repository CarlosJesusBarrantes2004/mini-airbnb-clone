import { useEffect } from "react";
import useProperty from "../hooks/useProperty";
import { PropertyCard } from "../components/property/PropertyCard";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
  const { properties, fetchProperties } = useProperty();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProperties();
  }, []);

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {properties.map((property) => (
        <PropertyCard
          key={property._id}
          property={property}
          children={
            <>
              <button
                className="w-full bg-[#ff07c1] text-white py-2 px-4 rounded-lg hover:bg-[#d606a1] transition-colors"
                onClick={() => navigate(`/booking/${property._id}`)}
              >
                Alquilar
              </button>
              <button
                className="w-full bg-[#ff07c1] text-white py-2 px-4 rounded-lg hover:bg-[#d606a1] transition-colors"
                onClick={() => navigate(`/properties/${property._id}`)}
              >
                Ver detalles
              </button>
            </>
          }
        ></PropertyCard>
      ))}
    </section>
  );
};
