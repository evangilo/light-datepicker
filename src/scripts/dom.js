export function createNode(name, className, text) {
  const node = document.createElement(name);
  node.className = className;
  node.innerHTML = text;
  return node;
}

export const createDiv = (className, text) =>
  createNode('div', className, text)

export const createEmptyDiv = (className) =>
  createDiv(className, '');

export const createEvent = (eventName, data) =>
  new CustomEvent(eventName, { detail: data });


export const appendChildList = (parent, childrens) =>
  childrens.forEach(children => parent.appendChild(children));

export const removeContent = (node) =>
  node.innerHTML = '';