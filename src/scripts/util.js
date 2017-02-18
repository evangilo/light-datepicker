export function createNode(name, className, html) {
  let node = document.createElement(name);
  node.className = className;
  node.innerHTML = html;
  return node;
}
