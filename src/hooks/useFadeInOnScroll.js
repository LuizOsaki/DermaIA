import { useEffect } from "react";

export default function useFadeInOnScroll() {
  useEffect(() => {
    const elementos = document.querySelectorAll(".fade-in, .fade-left");

    const observer = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {
          if (entrada.isIntersecting) {
            entrada.target.classList.add("aparecer");
          }
        });
      },
      { threshold: 0.2 }
    );

    elementos.forEach((el) => observer.observe(el));

    return () => {
      elementos.forEach((el) => observer.unobserve(el));
    };
  }, []);
}
