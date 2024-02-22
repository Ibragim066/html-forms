export default class Product {
  constructor(data, container) {
    this.row = container;
    this.dataProduct = data;
    this.bindToDOM();
  }

  bindToDOM() {
    this.row.innerHTML = `
      <th class="product-name">${this.dataProduct.name}</th>
      <th class="product-cost">${+this.dataProduct.cost}</th>
      <th><span class="update">✎</span><span class="delete">✖</span></th>
      `;
  }

  events(container) {
    const updateBtn = container.querySelector('.update');
    const deleteBtn = container.querySelector('.delete');

    updateBtn.addEventListener('click', () => this.update(this.dataProduct));
    deleteBtn.addEventListener('click', () => this.delete());
  }

  /* eslint-disable */
    update(data) {
        const form = document.querySelector("#editor-form");
        form.setAttribute("data-id", data.id);

        form
            .closest(".editor-form-container")
            .classList.add("editor-form-container_visible");
        const nameInput = form.querySelector('[data-id="name"]');
        const costInput = form.querySelector('[data-id="cost"]');
        nameInput.value = data.name;
        costInput.value = data.cost;
    }

    delete() {
        this._deleteMessage = document.querySelector(".delete-message");
        this._deleteMessage.classList.add("delete-message_visible");
        this._deleteMessage.setAttribute("data-id", this.dataProduct.id);

        const tbodyRect = document.querySelector('tbody').getBoundingClientRect();
        this._deleteMessage.style.left = `${tbodyRect.left + window.scrollX + tbodyRect.width / 2 - this._deleteMessage.offsetWidth / 2}px`;
        this._deleteMessage.style.top = `${tbodyRect.top + window.scrollY}px`;
    }

    markUp() {
        return this.row.innerHTML;
    }
}