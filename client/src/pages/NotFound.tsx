import { useNavigate } from "react-router-dom";
import { Button } from "../components/common/Button";
import useAuth from "../hooks/useAuth";

export const NotFound = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleNavigation = () =>
    isAuthenticated ? navigate("/dashboard") : navigate("/");

  return (
    <main
      className="min-h-screen flex justify-center items-center bg-red-50 px-6 sm:px-0"
      role="main"
    >
      <section className="text-center space-y-4" aria-labelledby="error-title">
        <header>
          <h1
            id="error-title"
            className="text-6xl font-bold text-pink-500 mb-2"
          >
            404
          </h1>
          <h2 className="text-xl font-semibold text-pink-500">
            Página no encontrada
          </h2>
        </header>

        <div className="space-y-6">
          <p className="text-gray-600">
            Lo sentimos, la página que buscas no existe...😂
          </p>

          <Button
            type="button"
            name="Volver al inicio"
            className="px-6 py-2 text-white font-semibold bg-pink-500 hover:bg-pink-600 rounded-md transition-colors duration-300"
            onClick={handleNavigation}
          />
        </div>
      </section>
    </main>
  );
};
