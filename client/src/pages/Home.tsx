import { Carousel } from "../components/Carousel";

export const Home = () => {
  return (
    <article className="container mx-auto px-4">
      <section className="text-center my-8">
        <h1 className="text-4xl font-bold mb-4">
          Vive y <span className="text-[#ff07c1]">goza!</span>
        </h1>
        <p className="font-normal text-sm max-w-2xl mx-auto">
          Vive la experiencia de la vida al máximo, conoce nuevos lugares y
          disfruta de la experiencia.
        </p>
      </section>
      <Carousel />
      <p className="text-center font-semibold">Vamos ya ingresa 😘❤️</p>
    </article>
  );
};
