export function createDiv(className, text) {
  const node = document.createElement('div');
  node.className = className;
  node.innerHTML = text;
  return node;
}

export const createEvent = (eventName, data) =>
  new CustomEvent(eventName, { detail: data });

export const appendChildList = (parent, childrens) =>
  childrens.forEach(children => parent.appendChild(children));

export const removeContent = (node) =>
  node.innerHTML = '';
