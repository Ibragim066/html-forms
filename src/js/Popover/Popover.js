/* eslint-disable linebreak-style */
import './popover.css';

export default class Popover {
  constructor() {
    this._container = null;
  }

  bindToDOM(container) {
    this._container = container;
    this.drawUi();
    this.setEventListeners();
  }

  drawUi() {
    if (!this.isBound()) return;

    this._container.innerHTML = Popover.markUp;
  }

  isBound() {
    if (this._container === null) {
      return false;
    }
    return true;
  }

  setEventListeners() {
    if (!this.isBound()) return;

    const popoverButton = this._container.querySelector('.btn');
    popoverButton.addEventListener('click', (e) => this.onClick(e));
  }

  static get markUp() {
    return `
      <div class="wrapper-btn">
        <a tabindex="0" role="button" class="btn" data-toggle="popover" title="Popover title" data-content="And here's some amazing content?">Click to toggle popover</a>
      </div>
      <div class="popover-message">
        <h3 class="popover-title">Popover title</h3>
        <p class="popover-text">And here's some amazing content. It's very engaging. Right?"</p>
      </div>
    `;
  }

  onClick(e) {
    this.popoverMessage = this._container.querySelector('.popover-message');
    this.popoverMessage.classList.toggle('popover-message_visible');
    this.positionPopoverMessage(e);
  }

  positionPopoverMessage(e) {
    const coords = e.currentTarget.getBoundingClientRect();
    const popoverMessageRect = this.popoverMessage.getBoundingClientRect();

    const left = coords.left + coords.width / 2 - popoverMessageRect.width / 2 + window.scrollX;
    const top = coords.top - popoverMessageRect.height - 20 + window.scrollY;

    this.popoverMessage.style.left = `${left}px`;
    this.popoverMessage.style.top = `${top}px`;
  }
}
