
import PrimaryBtn from "../../../components/RegisterPage/PrimaryBtn";

const Hero = () => {
  return (
    <section className="wrapper-section hero-banner-section">
      <div className="hero-banner-container">
        <h1>Manage Your Photography for Events </h1>

        <div className="hero-banner-contents" >
          <PrimaryBtn title="Book a Demo" />
          <p>
            From Quotation to Final Delivery - A seamless workflow for Quotation
            managing, Digital invitation, Signature album, AI-powered photo
            sorting, Client selection and more.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
