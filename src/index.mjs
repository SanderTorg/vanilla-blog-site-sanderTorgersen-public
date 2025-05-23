import { OWNER_POST_URL, OWNER_TOKEN } from "./access/api.mjs";
import { renderNavCreate, renderNavUser } from "./access/authentication.mjs";
import { loadingSkeleton } from "./posts-skeleton.mjs";

const postContainerEl = document.getElementById("js-blog-posts");
const pagnationContainerEl = document.getElementById("js-blog-pagination");
const searchInputEl = document.getElementById("js-searchbar");
const sortFilteredEl = document.getElementById("js-sort-filter");

let filteredPosts = [];

const POSTS_PER_PAGE = 12;
let allposts = [];
let currentPage = 1;

async function fetchingPosts() {
  try {
    const response = await fetch(OWNER_POST_URL, {
      headers: {
        Authorization: `Bearer ${OWNER_TOKEN}`,
        "X-Noroff-API-Key": "62bf6626-0dc1-4df4-9ea1-342537a2eeff",
      },
    });

    if (!response.ok) {
      throw new Error("Error fetching all blog posts");
    }
    const json = await response.json();
    return json.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

function renderPosts(posts) {
  postContainerEl.innerHTML = "";

  posts.forEach((post) => {
    const postHTML = `
      <div class="c-post">
        <img class="c-post-img" src="${post.media.url}" alt="${post.media.alt}">
        <div class="c-carusel-text">
          <h3 class="c-post-header">${post.title}</h3>
          <a href="../post/index.html?id=${post.id}" class="c-carusel-link">Read More</a>
        </div>
      </div>
    `;
    postContainerEl.innerHTML += postHTML;
  });
}

export function renderPaginationControls() {
  pagnationContainerEl.innerHTML = "";

  const totalPages = Math.ceil(allposts.length / POSTS_PER_PAGE);

  const prevBtn = document.createElement("button");
  prevBtn.className = "c-main-pagnation-btn";
  prevBtn.textContent = "Previous";
  prevBtn.disabled = currentPage === 1;
  prevBtn.onclick = () => {
    currentPage--;
    updatePagination();
  };

  pagnationContainerEl.appendChild(prevBtn);

  for (let i = 1; i <= totalPages; i++) {
    const pageBtn = document.createElement("button");
    pageBtn.className = "c-pagnation-btn";
    pageBtn.textContent = i;
    if (i === currentPage) pageBtn.disabled = true;
    pageBtn.onclick = () => {
      currentPage = i;
      updatePagination();
    };
    pagnationContainerEl.appendChild(pageBtn);
  }

  const nextBtn = document.createElement("button");
  nextBtn.className = "c-main-pagnation-btn";
  nextBtn.textContent = "Next";
  nextBtn.disabled = currentPage === totalPages;
  nextBtn.onclick = () => {
    currentPage++;
    updatePagination();
  };

  pagnationContainerEl.appendChild(nextBtn);
}

function updatePagination() {
  const sorted = sortPosts(filteredPosts, sortFilteredEl.value);
  const start = (currentPage - 1) * POSTS_PER_PAGE;
  const end = start + POSTS_PER_PAGE;
  renderPosts(sorted.slice(start, end));
  renderPaginationControls();
}

function sortPosts(posts, sortOption) {
  switch (sortOption) {
    case "NameAsc":
      return [...posts].sort((a, b) => a.title.localeCompare(b.title));
    case "NameDsc":
      return [...posts].sort((a, b) => b.title.localeCompare(a.title));
    case "Oldest":
      return [...posts].sort(
        (a, b) => new Date(a.created) - new Date(b.created)
      );
    case "Latest":
    default:
      return [...posts].sort(
        (a, b) => new Date(b.created) - new Date(a.created)
      );
  }
}

sortFilteredEl.addEventListener("change", () => {
  currentPage = 1;
  updatePagination();
});

function searchPosts(posts, search) {
  return posts.filter((posts) =>
    posts.title.toLowerCase().includes(search.toLowerCase())
  );
}

searchInputEl.addEventListener("input", () => {
  const search = searchInputEl.value.trim();
  if (search) {
    filteredPosts = searchPosts(allposts, search);
  } else {
    filteredPosts = [...allposts];
  }
  currentPage = 1;
  updatePagination();
});

async function main() {
  loadingSkeleton(postContainerEl, 12);
  allposts = await fetchingPosts();
  filteredPosts = [...allposts];
  updatePagination();
  renderNavCreate();
  renderNavUser();
}

main();
