export function createDiv(className, html) {
  const node = document.createElement('div');
  node.className = className || '';
  node.innerHTML = html || '';
  return node;
}

export const createDivList = (className, size) =>
  new Array(size).fill().map(() => createDiv(className))

export const listToNodeList = (className, list) =>
  list.map(item => createDiv(className, item));

export const createEvent = (eventName, detail, bubbles, cancelable) => {
	const evt = document.createEvent('CustomEvent');
	evt.initCustomEvent(eventName, bubbles, cancelable, detail);
	return evt;
}

export const appendChildList = (parent, childrens) =>
  childrens.forEach(children => parent.appendChild(children));

export const removeContent = (node) =>
  node.innerHTML = '';
