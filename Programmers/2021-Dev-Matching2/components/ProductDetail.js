import SelectedOptions from "./SelectedOptions.js";

export default function ProductDetail({ $page, initialState }) {
  this.$element = document.createElement("div");
  this.$element.className = "ProductDetail";
  this.$element.addEventListener("change", (e) => {
    if (e.target.tagName === "SELECT") {
      const selectedOptionId = +e.target.value;
      const isDuplicate = this.state.selectedOptions.some(
        (option) => option.id === selectedOptionId
      );
      const option = this.state.product.productOptions.find(
        (option) => option.id === selectedOptionId
      );
      if (option && !isDuplicate) {
        const nextSelectedOptions = [
          ...this.state.selectedOptions,
          {
            id: option.id,
            name: option.name,
            price: option.price,
            quantity: 1,
          },
        ];
        this.setState({ selectedOptions: nextSelectedOptions });
      }
    }
  });
  $page.append(this.$element);

  this.selectedOptions = null;

  this.state = {
    product: initialState,
    selectedOptions: [],
  };
  this.setState = (nextState) => {
    this.state = {
      ...this.state,
      ...nextState,
    };

    if (this.selectedOptions)
      this.selectedOptions.setState({
        selectedOptions: this.state.selectedOptions,
      });
    this.render();
  };

  this.render = () => {
    const { product } = this.state;
    this.$element.innerHTML = `
      <img src=${product.imageUrl} />
      <div class="ProductDetail__info">
        <h2>${product.name}</h2>
        <div class="ProductDetail__price">${product.price.toLocaleString()}원~</div>
        <select>
          <option>선택하세요.</option>
          ${product.productOptions
            .map(
              (option) =>
                `<option value=${option.id} ${
                  option.stock > 0 ? "" : "disabled"
                }>
                ${option.stock > 0 ? "" : "(품절)"}
                ${product.name} ${option.name}
                ${
                  option.price > 0
                    ? `(+${option.price.toLocaleString()}원)`
                    : ""
                }</option>`
            )
            .join("")}
        </select>
        <div class="ProductDetail__selectedOptions"></div>
      </div>
    `;

    this.selectedOptions = new SelectedOptions({
      $target: document.querySelector(".ProductDetail__selectedOptions"),
      initialState: {
        product: this.state.product,
        selectedOptions: this.state.selectedOptions,
      },
    });
  };
}

/**
 * <div class="ProductDetail">
    <img
      src="https://grepp-cloudfront.s3.ap-northeast-2.amazonaws.com/programmers_imgs/assignment_image/cafe_coffee_cup.png"
    />
    <div class="ProductDetail__info">
      <h2>커피잔</h2>
      <div class="ProductDetail__price">10,000원~</div>
      <select>
        <option>선택하세요.</option>
        <option>100개 번들</option>
        <option>1000개 번들(+5,000)</option>
      </select>
      <div class="ProductDetail__selectedOptions">
       <h3>선택된 상품</h3>
      </div>
    </div>
  </div>
 */
