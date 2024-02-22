import EditorForm from './EditorForm/EditorForm';
import productsArray from './productsArray';

import './editor.css';

export default class Editor {
  constructor() {
    this._container = null;
    this.editorForm = null;
    this.deleteMessage = null;
    this.products = productsArray;
  }

  bindToDOM(container) {
    this._container = container;

    this.drawUi();
    this.events();
  }

  drawUi() {
    this.checkBinding();

    this._container.innerHTML = `
      <table class="table">
        <caption class="title-table">My editor</caption>
        <thead>
          <tr class="products">
            <th  colspan="2" style="text-align:left">Товары</th>
            <th style="text-align:right" data-id="add"><span class="add">✙</span></th>
          </tr>
          <tr class="product-table">
            <th>Название</th>
            <th>Стоимость</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
      <div class="delete-message">
        <h2>Вы действительно хотите удалить товар?</h2>
        <div class="editor-btn">
          <button type="button" class="btn btn-add" data-toggle="delete-product" title="Button for delete product">Да</button>
          <button type="button" class="btn btn-close" data-toggle="close-message" title="Close delete message">Нет</button>
        </div>
      </div>
      `;

    const editorForm = new EditorForm(this._container);
    editorForm.bindToDOM();

    this.editorForm = this._container.querySelector('.editor-form-container');
    this.deleteMessage = this._container.querySelector('.delete-message');
  }

  checkBinding() {
    if (this._container === null) {
      throw new Error('Form not bind to DOM');
    }
  }

  events() {
    const addEl = this._container.querySelector('[data-id="add"]');
    const deleteProduct = this._container.querySelector(
      '[data-toggle="delete-product"]',
    );
    const closeMessage = this._container.querySelector(
      '[data-toggle="close-message"]',
    );

    addEl.addEventListener('click', () => this.showForm());
    deleteProduct.addEventListener('click', (e) => this.deleteProduct(e));
    closeMessage.addEventListener('click', () => this.closeMessage());
  }

  showForm() {
    this.editorForm.classList.add('editor-form-container_visible');

    const coords = this._container.querySelector('tbody').getBoundingClientRect();
    this.editorForm.style.left = `${coords.left + window.scrollX + coords.width / 2 - this.editorForm.offsetWidth / 2}px`;
    this.editorForm.style.top = `${coords.top + window.scrollY}px`;
  }

  deleteProduct() {
    const index = productsArray.findIndex(
      (el) => el.id === +this.deleteMessage.dataset.id,
    );
    productsArray.splice(index, 1);

    const product = this._container.querySelector(
      `[data-row="${this.deleteMessage.dataset.id}"]`,
    );
    product.parentNode.removeChild(product);
    this.closeMessage();
  }

  closeMessage() {
    this.deleteMessage.classList.remove('delete-message_visible');
  }
}
