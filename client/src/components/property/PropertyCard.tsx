import { Property } from "../../types/property.types";

interface PropertyCardProps {
  property: Property;
  children: React.ReactNode;
}

export const PropertyCard = ({ property, children }: PropertyCardProps) => {
  return (
    <article className="flex flex-col h-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="relative aspect-video overflow-hidden">
        <img
          src={property.photos[0].url}
          alt={`Vista principal de ${property.title}`}
          className="h-full w-full object-cover"
        />
        <div className="absolute bottom-2 right-2 bg-white px-2 py-1 rounded-full text-sm font-medium text-gray-700">
          ${property.price}/noche
        </div>
      </div>
      <div className="flex flex-col flex-1 p-4">
        <header>
          <h2 className="text-lg font-semibold text-gray-700 line-clamp-1">
            {property.title}
          </h2>
          <p className="text-sm text-gray-600 mt-1">{property.location}</p>
        </header>
        <div className="mt-2">
          <p className="text-sm text-gray-700 line-clamp-2">
            {property.description}
          </p>
        </div>
        <div className="mt-4 flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
            </svg>
            <span>Hasta {property.maxGuests} huéspedes</span>
          </div>
        </div>
        {property.extraInfo && (
          <div className="mt-2">
            <p className="text-sm text-gray-500 line-clamp-1">
              <span className="font-medium">Extra: </span>
              {property.extraInfo}
            </p>
          </div>
        )}
      </div>
      <div className="border-t border-gray-200 p-4 flex flex-col sm:flex-row gap-2">
        {children}
      </div>
    </article>
  );
};
