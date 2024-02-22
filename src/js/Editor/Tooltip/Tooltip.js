import './tooltip.css';

export default class Tooltip {
  constructor() {
    this._tooltips = [];
  }

  showTooltip(message, element) {
    const tooltipElement = document.createElement('DIV');

    tooltipElement.classList.add('form-error');
    tooltipElement.textContent = message;

    const id = performance.now();

    this._tooltips.push({
      id,
      element: tooltipElement,
    });

    document.body.appendChild(tooltipElement);

    const { left, bottom } = element.getBoundingClientRect();

    tooltipElement.style.left = `${window.scrollX + left}px`;
    tooltipElement.style.top = `${bottom + 5}px`;

    return id;
  }

  removeTooltip(id) {
    const tooltip = this._tooltips.find((t) => t.id === id);

    tooltip.element.remove();

    this._tooltips = this._tooltips.filter((t) => t.id !== id);
  }
}
