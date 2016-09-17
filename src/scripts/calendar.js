import { createNode } from './util';
import {
    nextMonth,
    prevMonth,
    startMonth,
    datesInMonth,
    isSame
} from './date';

const MAXIMUM_NUMBER_OF_DAYS = 42;

export class Calendar {
    constructor() {
        this.decorators = [];
        this.listeners = [];
        this.container = createNode('div', 'calendar', null);
        this.nodes = new Array(MAXIMUM_NUMBER_OF_DAYS);
        this.render();
    }

    render() {
        let container = this.container;
        let nodes = this.nodes;
        let fragment = document.createDocumentFragment();
        // TODO: Evited assign and use immutability
        for (let i = 0; i < MAXIMUM_NUMBER_OF_DAYS; i++) {
            nodes[i] = this.createDateNode();
            fragment.appendChild(nodes[i]);
        }
        container.appendChild(fragment);
    }

    createDateNode() {
        let node = createNode('span', '');
        node.addEventListener('click', (event) => this.emit('clickDate', node));
        node.addEventListener('mouseover', (event) => this.emit('hoverDate', node));
        return node;
    }

    on(eventName, callback) {
        this.container.addEventListener(eventName, callback);
    }

    emit(eventName, node) {
        if (!node.classList.contains('disabled')) {
            const event = new CustomEvent(eventName, { detail: node.date });
            this.container.dispatchEvent(event);
        }
    }

    addDecorator(filter, className) {
        this.decorators.push({filter: filter, className: className});
    }

    applyDecorators() {
        this.nodes.forEach(node => {
            this.decorators.some(decorator => {
                if (decorator.filter(node.date)) {
                    node.classList.add(decorator.className);
                } else {
                    node.classList.remove(decorator.className);
                }
            });
        });
    }

    datesOfCalendar(date) {
        let month = datesInMonth(date);
        let leftPadding = startMonth(date).getDay() || 7;
        let paddingLeftItems = datesInMonth(prevMonth(date))
                                    .reverse()
                                    .slice(0, leftPadding)
                                    .reverse();
        let paddingRightItems = datesInMonth(nextMonth(date))
                                    .slice(0, 42 - leftPadding - month.length);
        return [...paddingLeftItems, ...month, ...paddingRightItems];
    }

    draw(date) {
        let dates = this.datesOfCalendar(date);
        // TODO: Evited assign and use immutability
        this.nodes.forEach((node, index) => {
            node.date = dates[index];
            node.innerText = dates[index].getDate();
        });
        this.applyDecorators();
        return this.container;
    }
}
