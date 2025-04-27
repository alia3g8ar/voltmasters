import Hero from "../components/Hero";
import Services from "../components/Services";
import About from "../components/About";
import Contact from "../components/Contact";

const HomePage = () => {
  return (
    <div className="w-[100%] h-auto flex flex-col justify-center">
      <Hero />
      <Services />
      <About />
      <Contact />
    </div>
  );
};

export default HomePage;
