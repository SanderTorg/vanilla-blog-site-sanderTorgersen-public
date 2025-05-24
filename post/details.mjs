import { DETAILS_POST } from "../src/access/api.mjs";
import {
  renderNavCreate,
  renderNavUser,
} from "../src/access/authentication.mjs";

const blogDetailsEL = document.getElementById("js-render-details-post");

async function renderPost() {
  try {
    const response = await fetch(`${DETAILS_POST}`);
    const data = await response.json();

    const post = data.data;

    blogDetailsEL.innerHTML = `
    <article class="l-spesific-blog">
      <h1 class="c-spesific-h1">${post.title}</h1>
      <div class="c-spesific-img-cont">
        <img src="${post.media?.url}" alt="${
      post.media?.alt
    }" class="c-spesific-img"/>
      </div>
      <p class="c-spesific-body">${post.body}</p>

      <div class="c-spesific-auth-date">
        <p>Author: ${post.author?.name}</p>
        <p>Post date: ${post.updated?.slice(0, 10)}
      </div>
    </article>
    `;
  } catch (error) {
    console.error("Error loading post:", error);
  }
}

async function main() {
  renderPost();
  renderNavCreate();
  renderNavUser();
}

main();
