export default function Info({ $target, initialState }) {
  this.$element = document.createElement("div");
  this.$element.className = "ProductDetail__info";
  $target.append(this.$element);

  this.state = initialState;
  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    if (!this.state) return;
    this.$element.innerHTML = `
      <h2>${this.state.name}</h2>
      <div class="ProductDetail__price">${this.state.price.toLocaleString()}원~</div>
      <select>
        <option>선택하세요.</option>
        ${this.state.productOptions
          .map(
            (option) =>
              `<option ${option.stock > 0 ? "" : "disabled"}>
              ${option.stock > 0 ? "" : "(품절)"}
              ${option.name} ${option.name} ${
                option.price > 0 ? `(+${option.price})` : ""
              }</option>`
          )
          .join("")}
      </select>
    `;
  };
}

/*
  <div class="ProductDetail__info">
    <h2>커피잔</h2>
    <div class="ProductDetail__price">10,000원~</div>
    <select>
      <option>선택하세요.</option>
      <option>100개 번들</option>
      <option>1000개 번들(+5,000)</option>
    </select>
    <div class="ProductDetail__selectedOptions">
    </div>
  </div>  
*/
