const hamburgerContainerEl = document.querySelector("#js-hamburger");
const navMenuEl = document.querySelector("#js-nav-menu");

hamburgerContainerEl.addEventListener("click", () => {
  hamburgerContainerEl.classList.toggle("active");
  navMenuEl.classList.toggle("active");
});

document.querySelectorAll(".c-nav-link").forEach((n) =>
  n.addEventListener("click", () => {
    hamburgerContainerEl.classList.remove("active");
    navMenuEl.classList.remove("active");
  })
);
