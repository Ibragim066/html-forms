import messages from './messages';
import createData from '../createData';
import Product from '../Product';
import productsArray from '../productsArray';

import './editor-form.css';
import Tooltip from '../Tooltip/Tooltip';
import getError from '../Tooltip/getError';

export default class EditorForm {
  constructor(container) {
    this._container = container;
    this._formContainer = null;
    this._errorElement = null;
    this._form = null;
    this._tooltipFactory = new Tooltip();

    this.productsArray = [];
    this.actualMessages = [];
  }

  bindToDOM(data) {
    this.createFormContainer(data || { name: '', cost: '' });
    this.setEvents();
  }

  createFormContainer(data) {
    this._formContainer = document.createElement('div');
    this._formContainer.classList.add('editor-form-container');
    this.setFormData(data);
    this._formContainer.innerHTML = EditorForm.formMarkup(this.formData);
    this._container.append(this._formContainer);
    this._form = this._container.querySelector('#editor-form');
    this._errorElement = this._container.querySelector('.editor-form-error');
  }

  setFormData(data) {
    this.formData = data;
  }

  setEvents() {
    const closeBtn = this._form.querySelector('[data-toggle="editor-close"]');

    closeBtn.addEventListener('click', () => this.closeForm());
    this._form.addEventListener('submit', (e) => this.onSubmit(e));
    this._form.addEventListener('focus', () => { }, true);
    this._form.addEventListener('blur', (e) => this.elementOnBlur(e), true);
  }

  elementOnBlur(e) {
    const el = e.target;
    const error = getError(el, messages);

    const messageIndex = this.actualMessages.findIndex(
      (item) => item.name === el.name,
    );

    if (error) {
      if (messageIndex === -1) {
        this.showTooltip(error, el);
      }
    } else if (messageIndex !== -1) {
      this._tooltipFactory.removeTooltip(
        this.actualMessages[messageIndex].id,
      );
      this.actualMessages.splice(messageIndex, 1);
    }
  }

  closeForm() {
    if (this._form.dataset.id) this._form.removeAttribute('data-id');

    this._form.reset();
    this._formContainer.classList.remove('editor-form-container_visible');
  }

  onSubmit(e) {
    e.preventDefault();
    this.handleValidation();
  }

  handleValidation() {
    this.formElements = [...this._form.elements];

    this.actualMessages.forEach((message) => this._tooltipFactory.removeTooltip(message.id));

    this.actualMessages = [];

    if (!this._form.checkValidity()) {
      this.showErrors();
    } else {
      this.processFormData();
    }
  }

  showErrors() {
    this.formElements.forEach((elem) => {
      const error = getError(elem, messages);
      if (error) {
        this.showTooltip(error, elem);
      }
    });
  }

  processFormData() {
    if (this._form.dataset.id) {
      this.updateProduct();
    } else {
      this.createProduct();
    }
    this.closeForm();
  }

  updateProduct() {
    const id = +this._form.dataset.id;
    const index = productsArray.findIndex((el) => el.id === id);
    const productData = productsArray[index];

    createData(this.formElements, productData);

    const product = this._container.querySelector(`[data-row="${id}"]`);
    product.querySelector('.product-name').innerText = productData.name;
    product.querySelector('.product-cost').innerText = productData.cost;
  }

  createProduct() {
    const formData = {};
    createData(this.formElements, formData);

    formData.id = Date.now();

    const tableBody = this._container.querySelector('tbody');
    const tableRow = document.createElement('tr');
    const product = new Product(formData, tableRow);

    productsArray.push(product.dataProduct);

    tableRow.classList.add('product-row');
    tableRow.innerHTML = product.markUp();
    tableRow.setAttribute('data-row', formData.id);
    product.events(tableRow);
    tableBody.append(tableRow);
  }

  showTooltip(message, el) {
    this.actualMessages.push({
      name: el.name,
      id: this._tooltipFactory.showTooltip(message, el),
    });
  }

  static formMarkup(formData) {
    return `
            <form id="editor-form" novalidate>
                <div class="form-control form-editor">
                  <label class="label-editor" for="name">Название</label>
                  <input name="name" data-id="name" class="input input-editor" type="text" placeholder="product name" autocomplete="off" value="${formData.name}" required> 
                </div>
                <div class="form-control form-editor">
                  <label for="cost" class="label-editor">Стоимость</label>
                  <input name="cost" data-id="cost" class="input input-editor" type="number" min="1" placeholder="product cost" autocomplete="off" value="${formData.cost}" required>
                </div>

                <div class="editor-btn">
                  <button type="submit" class="btn btn-add" data-toggle="editor-add" title="Submit editor form">Сохранить</button>
                  <button type="button" class="btn btn-close" data-toggle="editor-close" title="Close editor form">Закрыть</button>
                </div>
              </form>
          `;
  }
}
