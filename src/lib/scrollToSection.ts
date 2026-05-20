const HEADER_OFFSET = 80;

export const scrollToSection = (sectionId: string): void => {
  const targetId = sectionId.startsWith("#") ? sectionId.slice(1) : sectionId;
  const element = document.getElementById(targetId);

  if (!element) return;

  const top =
    element.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;

  window.scrollTo({ top: Math.max(0, top), behavior: "auto" });
};

export const scrollToTop = (): void => {
  window.scrollTo({ top: 0, behavior: "auto" });
};
