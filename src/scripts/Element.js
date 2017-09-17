import { createDiv, createEvent } from './dom';

export default class Element {
  constructor(className, html) {
    this.el = createDiv(className, html);
    this.addEventListener = this.el.addEventListener.bind(this.el);
    this.removeEventListener = this.el.removeEventListener.bind(this.el);
  }

  addEventListenerTo(selector, eventName, cb) {
    this.querySelector(selector).addEventListener(eventName, cb);
  }

  dispatchEvent(eventName, data) {
    this.el.dispatchEvent(createEvent(eventName, data));
  }

  appendChild(node) {
    this.el.appendChild(node);
  }

  appendChildList(nodeList) {
    nodeList.forEach(node => this.appendChild(node));
  }

  querySelector(selector) {
    return this.el.querySelector(selector);
  }
}
