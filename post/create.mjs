import {
  getAccessToken,
  getUserName,
  renderNavCreate,
  renderNavUser,
} from "../src/access/authentication.mjs";

import { ALL_BLOG_POSTS, CREATE_POST } from "../src/access/api.mjs";
import { loadingSkeleton } from "../src/posts-skeleton.mjs";

const form = document.getElementById("js-create-post-form");
const myPosts = document.getElementById("js-my-posts");
const token = getAccessToken();

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const title = document.getElementById("post-title").value.trim();
  const body = document.getElementById("post-body").value.trim();
  const media = document.getElementById("post-media").value.trim();
  const alt = document.getElementById("post-alt").value.trim();

  const token = getAccessToken();

  if (!token) {
    alert("You're not authorized to create posts!");
    return;
  }

  const postData = {
    title,
    body,
    media: {
      url: media,
      alt: alt,
    },
  };

  try {
    const response = await fetch(CREATE_POST, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": "62bf6626-0dc1-4df4-9ea1-342537a2eeff",
      },
      body: JSON.stringify(postData),
    });

    const result = await response.json();

    if (response.ok) {
      alert("Post created successfully!");
      window.location.href = "../index.html";
    } else {
      alert("Failed to create post.", result);
    }
  } catch (error) {
    console.error("Post creation error:", error);
    alert("Something went wrong.");
  }
});

async function renderMyPosts() {
  if (!token) {
    alert("Please log in to view posts!");
    return;
  }

  const username = getUserName();

  try {
    const response = await fetch(ALL_BLOG_POSTS, {
      headers: {
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": "62bf6626-0dc1-4df4-9ea1-342537a2eeff",
      },
    });

    const data = await response.json();

    if (response.ok) {
      const myUserPosts = data.data.filter(
        (post) => post.author.name === username
      );

      myPosts.innerHTML = myUserPosts
        .map(
          (post) => `
            <div class="c-post-create">
               <img class="c-post-img" src="${post.media.url}" alt="${post.media.alt}">
            <div class="c-carusel-text">
               <h3 class="c-post-header">${post.title}</h3>             
               <a href="./index.html?id=${post.id}" class="c-carusel-link">Read More</a>
               </p>
               <div class="c-post-edit-btn">
               <a href="./edit.html?id=${post.id}">Edit</a>
               </div>
               </div>
            </div>
          `
        )
        .join("");

      if (myUserPosts.length === 0) {
        myPosts.innerHTML = `<p>You have not created any posts yet.</p>`;
      }
    } else {
      alert("Failed to render your posts");
    }
  } catch (error) {
    console.error("failed to load posts", error);
    alert("Error loading posts");
  }
}

async function main() {
  loadingSkeleton(myPosts, 12);
  renderMyPosts();
  renderNavCreate();
  renderNavUser();
}

main();
