export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

export const scrollToTopElement = (elementId: string) => {
  const targetElement = document.getElementById(elementId);

  if (targetElement) {
    targetElement.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
};

export const scrollToElement = (elementId: string) => {
  const targetElement = document.getElementById(elementId);

  if (targetElement) {
    targetElement.scrollIntoView({ behavior: "smooth" });
  }
};
