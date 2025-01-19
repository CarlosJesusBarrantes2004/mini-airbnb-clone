import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import useProperty from "../hooks/useProperty";
import { Property as PropertyType } from "../types/property.types";
import { ChevronLeft, ChevronRight, ArrowLeft, Users } from "lucide-react";

export const Property = () => {
  const { id } = useParams();
  const [property, setProperty] = useState<PropertyType | null>(null);
  const { fetchPropertyById } = useProperty();
  const [currentPhoto, setCurrentPhoto] = useState<number>(0);

  const fetchProperty = async () => {
    if (id) {
      const res = await fetchPropertyById(id);
      if (res.success) setProperty(res.property);
    }
  };

  useEffect(() => {
    fetchProperty();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <header className="p-4 border-b border-gray-200 shadow-sm">
        <Link
          to=".."
          className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Volver</span>
        </Link>
      </header>

      <main className="flex-grow p-4 md:p-6 lg:p-8">
        {property && (
          <article className="max-w-4xl mx-auto space-y-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              {property.title}
            </h1>

            <section className="relative rounded-xl overflow-hidden bg-gray-800">
              <div className="aspect-video relative">
                <img
                  src={property.photos[currentPhoto].url}
                  alt={`Foto ${currentPhoto + 1} de ${property.photos.length}`}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="absolute inset-0 flex items-center justify-between p-4">
                <button
                  disabled={currentPhoto === 0}
                  onClick={() => setCurrentPhoto(currentPhoto - 1)}
                  className="p-2 rounded-full bg-black/50 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-black/70 transition-colors"
                  aria-label="Foto anterior"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <button
                  disabled={currentPhoto === property.photos.length - 1}
                  onClick={() => setCurrentPhoto(currentPhoto + 1)}
                  className="p-2 rounded-full bg-black/50 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-black/70 transition-colors"
                  aria-label="Siguiente foto"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              <div className="absolute bottom-4 right-4 bg-black/50 px-3 py-1 rounded-full text-white text-sm">
                {currentPhoto + 1} / {property.photos.length}
              </div>
            </section>

            <section className="grid md:grid-cols-2 gap-8 text-gray-300">
              <div className="space-y-4">
                <p className="text-lg leading-relaxed">
                  {property.description}
                </p>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#ff07c1]" />
                  <p>Máximo de invitados: {property.maxGuests}</p>
                </div>
              </div>

              <div className="space-y-4 bg-white p-6 rounded-xl">
                <div className="border-b border-gray-700 pb-4">
                  <h2 className="text-xl font-semibold text-gray-600">
                    Anfitrión
                  </h2>
                  <p className="text-gray-500">{property.owner.username}</p>
                  <p className="text-gray-700">{property.owner.email}</p>
                </div>

                <div className="space-y-2">
                  <p className="text-2xl font-bold text-gray-600">
                    ${property.price}
                    <span className="text-sm font-normal"> /noche</span>
                  </p>
                  {property.extraInfo && (
                    <p className="text-sm text-gray-500">
                      {property.extraInfo}
                    </p>
                  )}
                </div>
              </div>
            </section>
          </article>
        )}
      </main>
    </div>
  );
};
