export function createNode(name, className, html) {
  let node = document.createElement(name);
  node.className = className;
  node.innerHTML = html;
  return node;
}

export const reserve = (size) =>
  new Array(size).fill();

export const range = (start, end) =>
  reserve(end - start).map((_, idx) => idx + start);
