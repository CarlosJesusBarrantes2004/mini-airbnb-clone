export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="p-4 border-t border-gray-200 shadow-sm mt-auto">
      <div className="container mx-auto text-center text-gray-600 text-sm">
        <p>© {currentYear} Desarrollado por Carlos Barrantes</p>
      </div>
    </footer>
  );
};
