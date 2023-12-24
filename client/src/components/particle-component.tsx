import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import type { Container, Engine } from "tsparticles-engine";
import { useCallback } from "react";
import useTheme from "../hooks/use-theme";

interface ParticleComponentProps {
  hoverGesture?: boolean;
  clickGesture?: boolean;
}

export const ParticleComponent = ({
  hoverGesture = false,
  clickGesture = false,
}: ParticleComponentProps) => {
  const { isDarkVariant } = useTheme();
  const particlesInit = useCallback(async (engine: Engine) => {
    // you can initialize the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    //await loadFull(engine);
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async (container: Container | undefined) => {},
    []
  );

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        background: {
          color: {
            value: "transparent",
          },
        },
        style: {
          height: "100vh",
          width: "100vw",
          position: "absolute",
          opacity: isDarkVariant ? "0.15" : "0.25",
        },
        fpsLimit: 120,
        interactivity: {
          events: {
            onClick: {
              enable: clickGesture,
              mode: "push",
            },
            onHover: {
              enable: hoverGesture,
              mode: "repulse",
            },
            resize: true,
          },
          modes: {
            push: {
              quantity: 4,
            },
            repulse: {
              distance: 200,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: {
            value: isDarkVariant ? "#ffffff" : "#000000",
          },
          links: {
            color: isDarkVariant ? "#ffffff" : "#000000",
            distance: 150,
            enable: true,
            opacity: 0.5,
            width: 1,
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "bounce",
            },
            random: true,
            speed: 5,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 80,
          },
          opacity: {
            value: 0.5,
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 1, max: 5 },
          },
        },
        detectRetina: true,
      }}
    />
  );
};
