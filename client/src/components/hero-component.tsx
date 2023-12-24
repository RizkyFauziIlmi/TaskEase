import { useNavigate } from "react-router-dom";
import { ParticleComponent } from "./particle-component";
import { TypeAnimation } from "react-type-animation";

export const HeroComponent = () => {
  const navigate = useNavigate();

  const scrollToElement = (elementId: string) => {
    const targetElement = document.getElementById(elementId);

    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex justify-center items-center flex-col text-center min-h-[80vh] md:h-screen">
      <ParticleComponent />
      <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
        TaskEase
      </h1>
      <h2 className="text-3xl mt-2 font-bold ">Simply Your Tasks!</h2>
      <TypeAnimation
        preRenderFirstString={true}
        sequence={[
          "Unleash Your Productivity",
          1000,
          "Unleash Your Productivity: Tailor Your Task,",
          500,
          "Unleash Your Productivity: Tailor Your",
          250,
          "Unleash Your Productivity: Tailor Your Tasks, Your Way!",
          1500,
        ]}
        speed={75}
        style={{
          fontSize: "14px",
          lineHeight: "20px",
          fontWeight: 600,
          opacity: 0.7,
          marginTop: "2px",
        }}
        repeat={Infinity}
      />
      <div className="flex gap-2 mt-4">
        <button className="btn btn-primary" onClick={() => navigate("/todo")}>
          Get Started
        </button>
        <button
          className="btn btn-neutral btn-outline"
          onClick={() => scrollToElement("feature")}
        >
          Learn More
        </button>
      </div>
    </div>
  );
};
