import { getUserName } from "./authentication.mjs";

export const BASE_API_URL = "https://v2.api.noroff.dev";

export const REG_NAME = getUserName();

const POST_ID = getIdFromUrl();

// AUTHENTICATION ENDPOINTS
export const REGISTER_URL = `${BASE_API_URL}/auth/register`;
export const LOGIN_URL = `${BASE_API_URL}/auth/login`;

// BLOG POST ENDPOINTS
export const BLOG_BASE = `${BASE_API_URL}/blog/posts`;

export const ALL_BLOG_POSTS = `${BLOG_BASE}/${REG_NAME}`;

export const CREATE_POST = `${BLOG_BASE}/${REG_NAME}`;

export const EDIT_POST = `${BLOG_BASE}/${REG_NAME}/${POST_ID}`;

export const DETAILS_POST = `${BLOG_BASE}/${POST_ID}`;

export const OWNER_POST_URL = `${BLOG_BASE}/kobe`;
export const OWNER_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoia29iZSIsImVtYWlsIjoia29iZUBzdHVkLm5vcm9mZi5ubyIsImlhdCI6MTc0NDgzMTg1OH0.MJtPYbZd9iXgvruIu0y4JEORNWshibz5n-SDwU2awcY";

function getIdFromUrl() {
  const getPostId = window.location.search;

  const UrlParams = new URLSearchParams(getPostId);

  const id = UrlParams.get("id");

  return id;
}
