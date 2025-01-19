import { Outlet } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Toaster } from "react-hot-toast";

export const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header></Header>
      <main className="flex-grow flex flex-col bg-[#fff] p-5 lg:p-10">
        <Outlet></Outlet>
      </main>
      <Footer></Footer>
      <Toaster></Toaster>
    </div>
  );
};
