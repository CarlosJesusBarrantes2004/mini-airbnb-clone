import { useEffect } from "react";
import { PropertyCard } from "../components/property/PropertyCard";
import PropertyForm from "../components/property/PropertyForm";
import useProperty from "../hooks/useProperty";
import { useNavigate } from "react-router-dom";

export const Properties = () => {
  const { properties, fetchPropertiesByOwner } = useProperty();
  const navigate = useNavigate();

  useEffect(() => {
    fetchPropertiesByOwner();
  }, [fetchPropertiesByOwner]);

  return (
    <article className="flex flex-col flex-1 gap-8">
      <section aria-labelledby="properties-heading">
        <header className="mb-6">
          <h1 className="text-2xl text-[#ff07c1] font-semibold underline underline-offset-4">
            Tus propiedades
          </h1>
          <p className="text-sm mt-1 text-gray-600">
            Estas son las propiedades que ya haz agregado
          </p>
        </header>
        {properties.length > 0 ? (
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {properties.map((item) => (
              <li key={item._id}>
                <PropertyCard
                  property={item}
                  children={
                    <button
                      className="w-full bg-[#ff07c1] text-white py-2 px-4 rounded-lg hover:bg-[#d606a1] transition-colors"
                      onClick={() => navigate(`/properties/${item._id}`)}
                    >
                      Ver detalles
                    </button>
                  }
                ></PropertyCard>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600 text-center py-8 text-sm">
            No tienes propiedades agregadas aún
          </p>
        )}
      </section>
      <section aria-labelledby="add-property-heading">
        <header className="mb-6">
          <h1 className="text-xl text-[#ff07c1] font-semibold underline underline-offset-4">
            Agregar nueva propiedad
          </h1>
          <p className="text-sm mt-1 text-gray-600">
            Agrega una nueva propiedad para que los demás puedan alquilarla
          </p>
        </header>
        <PropertyForm></PropertyForm>
      </section>
    </article>
  );
};
