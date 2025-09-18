import "./Home.css";
import Header from "./_components/Header";
import Features from "./_sections/Features";
import Hero from "./_sections/Hero";
import Pricing from "./_sections/Pricing";

const Home = () => {
  return (
    <>
      <Header />
      <Hero/>
      <Features />
      {/* <Pricing /> */}
      {/* <Contact />  */}
    </>
  );
};

export default Home;
