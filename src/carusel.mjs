import { OWNER_POST_URL, OWNER_TOKEN } from "./access/api.mjs";

import { createHTML } from "./utils.mjs";

const POSTS_LIMIT = 3;
let currentIndex = 0;
let posts = [];

const caruselContainerEl = document.getElementById("js-carusel-container");
const prevControlsEl = document.getElementById("js-pagnation-controls-prev");
const nextControlsEl = document.getElementById("js-pagnation-controls-next");

async function fetchCarusel() {
  loadingCaruselSkeleton(caruselContainerEl, 1);

  try {
    const response = await fetch(`${OWNER_POST_URL}?limit=${POSTS_LIMIT}`, {
      headers: {
        Authorization: `Bearer ${OWNER_TOKEN}`,
        "X-Noroff-API-Key": "62bf6626-0dc1-4df4-9ea1-342537a2eeff",
      },
    });
    const data = await response.json();
    posts = data.data;

    currentIndex = 0;
    renderCarusel();
    renderPagnation();
  } catch (error) {
    console.error("Failed to fetch posts", error);
  }
}

function renderCarusel() {
  caruselContainerEl.innerHTML = "";

  const post = posts[currentIndex];
  if (!post) return;

  const card = document.createElement("div");
  card.className = "c-carusel-card";

  card.innerHTML = `
    <img  src="${post.media.url}" alt="${post.media.alt}" class="c-carusel-img"/>
    <div class="c-carusel-text">
      <h3 class="c-carusel-title">${post.title}</h3>
      <a href="../post/index.html?id=${post.id}" class="c-carusel-link">Read More</a>
    </div>
  `;

  caruselContainerEl.appendChild(card);
}

function renderPagnation() {
  prevControlsEl.innerHTML = "";
  nextControlsEl.innerHTML = "";

  const prev = document.createElement("button");
  prev.className = "c-pagnation-btn";
  prev.textContent = "<<";
  prev.disabled = currentIndex === 0;
  prev.onclick = () => {
    if (currentIndex > 0) {
      currentIndex--;
      renderCarusel();
      renderPagnation();
    }
  };
  prevControlsEl.appendChild(prev);

  const next = document.createElement("button");
  next.className = "c-pagnation-btn";
  next.textContent = ">>";
  next.disabled = currentIndex === posts.length - 1;
  next.onclick = () => {
    if (currentIndex < posts.length - 1) {
      currentIndex++;
      renderCarusel();
      renderPagnation();
    }
  };
  nextControlsEl.appendChild(next);
}

document.addEventListener("DOMContentLoaded", () => {
  fetchCarusel();
});

function caruselSkeletonTemplate() {
  return `
    <article class="c-caruselSkeleton-container">
        <div class="c-caruselSkeleton-img"></div>
    </article>
    `;
}

function loadingCaruselSkeleton(containerNode, count = 1) {
  [...Array(count)].forEach(() => {
    const template = caruselSkeletonTemplate();
    const newEl = createHTML(template);
    containerNode.append(newEl);
  });
}
