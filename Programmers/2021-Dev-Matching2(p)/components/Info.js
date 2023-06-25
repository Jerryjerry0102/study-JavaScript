import SelectedOptions from "./SelectedOptions.js";

export default function Info({ $target, initialState }) {
  this.$element = document.createElement("div");
  this.$element.className = "ProductDetail__info";
  this.$element.addEventListener("change", (e) => {
    const { product, selectedOptions } = this.state;
    if (e.target.tagName === "SELECT") {
      const selectedOption = product.productOptions.find(
        (option) => option.id === +e.target.value
      );
      if (selectedOptions.some((option) => option.id === +e.target.value))
        return;
      this.setState({
        selectedOptions: [
          ...selectedOptions,
          {
            productId: product.id,
            productName: product.name,
            productPrice: product.price,
            productImageUrl: product.imageUrl,
            id: selectedOption.id,
            name: selectedOption.name,
            price: selectedOption.price,
            stock: selectedOption.stock,
            quantity: 1,
          },
        ],
      });
    }
  });
  $target.append(this.$element);

  this.state = {
    product: initialState,
    selectedOptions: [],
  };
  this.setState = (nextState) => {
    this.state = {
      ...this.state,
      ...nextState,
    };
    this.render();

    selectedOptions.setState(this.state.selectedOptions);
  };

  let selectedOptions = null;

  this.render = () => {
    const { product } = this.state;
    if (!product) return;
    this.$element.innerHTML = `
      <h2>${product.name}</h2>
      <div class="ProductDetail__price">${product.price.toLocaleString()}원~</div>
      <select>
        <option>선택하세요.</option>
        ${product.productOptions
          .map(
            (option) =>
              `<option value=${option.id} ${option.stock > 0 ? "" : "disabled"}>
              ${option.stock > 0 ? "" : "(품절)"}
              ${product.name} ${option.name} ${
                option.price > 0 ? `(+${option.price})` : ""
              }</option>`
          )
          .join("")}
      </select>
    `;
  };

  if (selectedOptions) return;
  selectedOptions = new SelectedOptions({
    $target: this.$element,
    initialState: this.state.selectedOptions,
  });
}
