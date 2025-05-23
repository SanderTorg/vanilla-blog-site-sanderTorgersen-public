import { createHTML } from "./utils.mjs";

function skeletonTemplate() {
  return `
    <article class="c-skeleton-container">
        <div class="c-skeleton-img"></div>
        <h3 class="c-skeleton-title"></h3>
        <div class="c-skeleton-link"></div>
    </article>
    `;
}

export function loadingSkeleton(containerNode, count = 12) {
  [...Array(count)].forEach(() => {
    const template = skeletonTemplate();
    const newEl = createHTML(template);
    containerNode.append(newEl);
  });
}
