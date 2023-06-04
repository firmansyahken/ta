const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle("active", entry.isIntersecting);
        if (entry.isIntersecting) observer.unobserve(entry.target);
      });
    },
    {
      rootMargin: "100px",
      threshold: 1,
    }
  );
  
  const aos = document.querySelectorAll(".animate");
  aos.forEach((a) => {
    observer.observe(a);
  });