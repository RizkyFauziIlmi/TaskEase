import { TechStackDiagramComponent } from "../components/tech-stack-diagram-component";
import { ShowcaseComponent } from "../components/showcase-component";
import { FeatureComponent } from "../components/feature-component";

import { HeroComponent } from "../components/hero-component";
import { NavbarLandingComponent } from "../components/navbar-landing-component";
import { useDocumentTitle } from "usehooks-ts";

export default function LandingPage() {
  useDocumentTitle('TaskEase');


  return (
    <div
    >
      {/* Navbar */}
      <NavbarLandingComponent />
      {/* Hero */}
      <HeroComponent />
      {/* Features */}
      <FeatureComponent />
      {/* Showcase */}
      <ShowcaseComponent />
      {/* Tech Stack */}
      <TechStackDiagramComponent />
    </div>
  );
}
