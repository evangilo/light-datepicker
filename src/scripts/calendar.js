import { createNode } from './util';
import {
    nextMonth,
    prevMonth,
    startMonth,
    datesInMonth,
    isSame
} from './date';

export class Calendar {
    constructor(weekdays) {
        this.decorators = [];
        this.listeners = [];
        this.container = createNode('div', 'calendar', null);
        this.nodes = new Array(42);

        for (var weekday of weekdays) {
            let node = createNode('span', 'weekday', weekday);
            this.container.appendChild(node);
        }
        for (var i = 0; i < 42; i++) {
            this.nodes[i] = this.createDateNode();
            this.container.appendChild(this.nodes[i]);
        }
    }

    createDateNode() {
        let node = createNode('span', '');
        node.addEventListener('click', (event) => this.emit('click', node));
        node.addEventListener('mouseover', (event) => this.emit('mouseover', node));
        return node;
    }

    on(event, callback) {
        if (typeof event === 'string' && typeof callback === 'function') {
            this.listeners.push({ event: event, callback: callback });
        }
    }

    emit(event, node) {
        if (!node.classList.contains('disabled')) {
            this.listeners.filter((listener) => listener.event === event)
                      .some((listener) => listener.callback(node.date));
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
        this.nodes.some((node, index) => {
            node.date = dates[index];
            node.innerText = dates[index].getDate();
        });
        this.applyDecorators();
        return this.container;
    }
}
