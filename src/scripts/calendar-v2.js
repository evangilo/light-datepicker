const getCalendarDates = (year, month) => {
  return [];
};

const createNode = (tag) => {};

const createNodeListWithValues = (tag, values) => {
  return values.map(value => createNode(tag, value));
};

const createCustomEvent = (eventName, value) => new CustomEvent(eventName, { detail: value });

const getCalendar = (year, month) => {
  const dates = getCalendarDates(year, month);
  const container = createNode('div');
  const nodes = createNodeListWithValues('span', dates);
  const dispatchEvent = (eventName) => (event) => container.dispatchEvent(createCustomEvent(eventName, event.target.value));

  nodes.forEach(node => container.appendChild(node));
  container.addEventListener('click', dispatchEvent('OnClickDate'));
  container.addEventListenr('mouseover', dispatchEvent('OnMouseOverDate'));
  
  return container;
};

