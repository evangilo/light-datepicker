export function noop() {};

export function createNode(name, className, html, value) {
  let node = document.createElement(name);
  node.className = className;
  node.innerHTML = html || '';
  node.value = value;
  return node;
}

