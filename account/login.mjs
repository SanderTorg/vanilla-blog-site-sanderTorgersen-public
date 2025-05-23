import { LOGIN_URL } from "../src/access/api.mjs";
import {
  renderNavCreate,
  renderNavUser,
} from "../src/access/authentication.mjs";

const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document
    .getElementById("email-input")
    .value.trim()
    .toLowerCase();
  const password = document.getElementById("password-input").value;

  const body = JSON.stringify({ email, password });

  try {
    const response = await fetch(LOGIN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Noroff-API-Key": "62bf6626-0dc1-4df4-9ea1-342537a2eeff",
      },
      body,
    });

    const result = await response.json();

    if (response.ok) {
      localStorage.setItem("accessToken", result.data.accessToken);
      localStorage.setItem("userName", result.data.name);
      localStorage.setItem("userEmail", result.data.email);

      alert("login successfull!");
      window.location.href = "../index.html";
    } else {
      alert("Login failed. Please try again.");
    }
  } catch (error) {
    console.error("login error", error);
    alert("Something went wrong. Please try again");
  }
});

function main() {
  renderNavCreate();
  renderNavUser();
}

main();
