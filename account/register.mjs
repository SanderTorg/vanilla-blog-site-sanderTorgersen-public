import { REGISTER_URL } from "../src/access/api.mjs";
import {
  renderNavCreate,
  renderNavUser,
} from "../src/access/authentication.mjs";

const registerForm = document.querySelector("#js-register-form");

registerForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const name = document.getElementById("name-input").value.trim();
  const email = document
    .getElementById("email-input")
    .value.trim()
    .toLowerCase();
  const password = document.getElementById("password-input").value;

  if (!email.endsWith("@stud.noroff.no")) {
    alert("Please use a valid @stud.noroff.no email");
    return;
  }

  const body = JSON.stringify({ name, email, password });

  try {
    const response = await fetch(REGISTER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Noroff-API-Key": "62bf6626-0dc1-4df4-9ea1-342537a2eeff",
      },
      body,
    });

    const result = await response.json();

    if (result.ok) {
      alert("Registration successful! Redirecting to login...");
      window.location.href = "./login.html";
    } else {
      alert("Registration failed");
    }
  } catch (error) {
    console.error("Registration error:", error);
    alert("Something went wrong. Please try again.");
  }
});

function main() {
  renderNavCreate();
  renderNavUser();
}

main();
