export default function SelectedOptions({ $target, initialState }) {
  this.$temp = document.createElement("div");
  // 상품 수량 변경할 수 있게 만들기
  this.$temp.addEventListener("change", (e) => {
    if (e.target.tagName === "INPUT") {
      try {
      } catch (err) {
        console.error(err.message);
      }
    }
  });
  $target.append(this.$temp);

  this.state = initialState;

  this.getTotalPrice = () => {
    const { product, selectedOptions } = this.state;

    return selectedOptions.reduce((acc, option) => {
      console.log(product.price + option.price, option.quantity);
      return acc + (product.price + option.price) * option.quantity;
    }, 0);
  };

  this.setState = (nextState) => {
    this.state = {
      ...this.state,
      ...nextState,
    };
    this.render();
  };

  this.render = () => {
    const { product, selectedOptions } = this.state;
    this.$temp.innerHTML = `
    <h3>선택된 상품</h3>
    <ul>
      ${selectedOptions
        .map(
          (option) => `
        <li>
          ${product.name} ${option.name} ${option.price}
          <div><input type="number" data-option-id=${option.id} value=${option.quantity} /></div>
        </li>`
        )
        .join("")}
    </ul>
    <div class="ProductDetail__totalPrice">${this.getTotalPrice()}원</div>
    <button class="OrderButton">주문하기</button>
    `;
  };
  this.render();
}

/**
 * 
    <h3>선택된 상품</h3>
    <ul>
      <li>
        커피잔 100개 번들 10,000원
        <div><input type="number" value="10" />개</div>
      </li>
      <li>
        커피잔 1000개 번들 15,000원
        <div><input type="number" value="5" /></div>
      </li>
    </ul>
    <div class="ProductDetail__totalPrice">175,000원</div>
    <button class="OrderButton">주문하기</button>
 */
