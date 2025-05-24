const navUser = document.getElementById("js-navUser");
const navCreate = document.getElementById("js-navCreate");

export function renderNavUser() {
  const userName = getUserName();
  const token = getAccessToken();

  if (token && userName) {
    navUser.innerHTML = `
    <li class="c-nav-item" >
      <span>Hi, ${userName}</span>
    </li>

    <li class="c-nav-item" aria-label="Sign you out" >
      <button id="sign-out-btn" class="c-sign-out">Sign Out</button>
    </li>
    `;

    document.getElementById("sign-out-btn").addEventListener("click", () => {
      logout();
      location.reload();
    });
  } else {
    navUser.innerHTML = `
    <li class="c-nav-item" aria-label="Links to login page" >
      <a href="../account/login.html" class="c-nav-link" aria-label="Links to login page">LogIn</a>
    </li>

    <li class="c-nav-item"  aria-label="Links to register page">
      <a href="../account/register.html" class="c-nav-link" aria-label="Links to register page">Register</a>
    </li>
    `;
  }
}

export function renderNavCreate() {
  const userName = getUserName();
  const token = getAccessToken();

  if (token && userName) {
    navCreate.innerHTML = `
    <li  aria-label="Links to create page" class="c-nav-item c-uppercase">
      <a href="../post/create.html" class="c-nav-link" aria-label="Links to create page">Your Page</a>
    </li>
    `;
  } else {
    navCreate.innerHTML = `
    
    `;
  }
}

export function getAccessToken() {
  return localStorage.getItem("accessToken");
}

export function getUserName() {
  return localStorage.getItem("userName");
}

export function isLoggedIn() {
  return Boolean(getAccessToken());
}

export function logout() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("userName");
}

export function getAuthOptions() {
  const token = getAccessToken();
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      "X-Noroff-API-Key": "62bf6626-0dc1-4df4-9ea1-342537a2eeff",
      "Content-Type": "application/json",
    },
  };
}
