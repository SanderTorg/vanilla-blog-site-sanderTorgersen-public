import { EDIT_POST } from "../src/access/api.mjs";
import {
  getAccessToken,
  renderNavCreate,
  renderNavUser,
} from "../src/access/authentication.mjs";

const token = getAccessToken();

const formEdit = document.getElementById("js-edit-post-form");
const titleEdit = document.getElementById("js-edit-title");
const bodyEdit = document.getElementById("js-edit-body");
const mediaUrlEdit = document.getElementById("js-edit-media");
const mediaAltEdit = document.getElementById("js-edit-alt");
const deletePostBtn = document.getElementById("js-delete-btn");

async function loadPost() {
  try {
    const response = await fetch(`${EDIT_POST}`);
    const data = await response.json();
    const post = data.data;

    titleEdit.value = post.title;
    bodyEdit.value = post.body;
    mediaUrlEdit.value = post.media.url;
    mediaAltEdit.value = post.media.alt;
  } catch (error) {
    console.error("Error loading post:", error);
    alert("Failed to load the post.");
  }
}

formEdit.addEventListener("submit", async (event) => {
  event.preventDefault();

  const updateData = {
    title: titleEdit.value.trim(),
    body: bodyEdit.value.trim(),
    media: {
      url: mediaUrlEdit.value.trim(),
      alt: mediaAltEdit.value.trim(),
    },
  };

  const updateUrl = `${EDIT_POST}`;

  try {
    const response = await fetch(updateUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": "62bf6626-0dc1-4df4-9ea1-342537a2eeff",
      },
      body: JSON.stringify(updateData),
    });

    const result = await response.json();

    if (response.ok) {
      alert("Post updated successfully!");
      window.location.href = "../index.html";
    } else {
      alert("Failed to update post", result);
    }
  } catch (error) {
    console.error("Post update error:", error);
    alert("Post edit went wrong!");
  }
});

deletePostBtn.addEventListener("click", async () => {
  const confirmDelete = confirm("Are you sure you want to delete this post?");
  if (!confirmDelete) return;

  const deleteUrl = `${EDIT_POST}`;

  try {
    const response = await fetch(deleteUrl, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": "62bf6626-0dc1-4df4-9ea1-342537a2eeff",
      },
    });
    if (response.ok) {
      alert("Post deleted successfully!");
      window.location.href = "../index.html";
    } else {
      const result = await response.json();
      alert("Failed to delete post", result);
    }
  } catch (error) {
    console.error("Post deletion error:", error);
    alert("An error occurred while deleting the post.");
  }
});

async function main() {
  loadPost();
  renderNavCreate();
  renderNavUser();
}

main();
