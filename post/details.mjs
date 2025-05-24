import { DETAILS_POST } from "../src/access/api.mjs";
import {
  renderNavCreate,
  renderNavUser,
} from "../src/access/authentication.mjs";

const blogDetailsEL = document.getElementById("js-render-details-post");

async function renderPost() {
  try {
    if (!DETAILS_POST.includes("/null")) {
      const response = await fetch(DETAILS_POST);
      if (!response.ok) throw new Error("Post not found");

      const data = await response.json();
      const post = data.data;

      blogDetailsEL.innerHTML = `
        <article class="l-spesific-blog">
          <h1 class="c-spesific-h1">${post.title}</h1>
          <div class="c-spesific-img-cont">
            <img src="${post.media?.url || "../images/placeholder.jpg"}" 
                 alt="${post.media?.alt || "Post image"}" 
                 class="c-spesific-img"/>
          </div>
          <p class="c-spesific-body">${post.body}</p>

          <div class="c-spesific-auth-date">
            <p>Author: ${post.author?.name || "Unknown"}</p>
            <p>Post date: ${post.updated?.slice(0, 10) || "N/A"}</p>
          </div>
        </article>
      `;
    } else {
      blogDetailsEL.innerHTML = `<p class="error-message">Missing or invalid post ID in the URL.</p>`;
    }
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
