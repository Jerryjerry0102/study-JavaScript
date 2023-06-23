import { routeChange } from "../utils/router.js";
import { getItem, setItem } from "../utils/storage.js";

export default function SelectedOptions({ $target, initialState }) {
  this.$temp = document.createElement("div");
  this.$temp.addEventListener("change", (e) => {
    if (e.target.tagName === "INPUT") {
      try {
        const nextQuantity = +e.target.value;
        const nextSelectedOptions = [...this.state.selectedOptions];
        const optionId = +e.target.dataset.optionId;
        const option = this.state.product.productOptions.find(
          (option) => option.id === optionId
        );
        const selectedOptionIndex = nextSelectedOptions.findIndex(
          (option) => option.id === optionId
        );
        nextSelectedOptions[selectedOptionIndex].quantity =
          option.stock >= nextQuantity ? nextQuantity : option.stock;

        this.setState({ selectedOptions: nextSelectedOptions });
      } catch (err) {
        console.error(err.message);
      }
    }
  });
  this.$temp.addEventListener("click", (e) => {
    if (e.target.className === "OrderButton") {
      const cartData = getItem("products_cart", []);
      // 장바구니 데이터 만들기
      setItem(
        "products_cart",
        cartData.concat(
          this.state.selectedOptions.map((option) => ({
            productId: this.state.product.id,
            optionId: option.id,
            quantity: option.quantity,
          }))
        )
      );
      routeChange("/cart");
    }
  });
  $target.append(this.$temp);

  this.state = initialState;

  this.getTotalPrice = () => {
    const { product, selectedOptions } = this.state;

    return selectedOptions.reduce(
      (acc, option) => acc + (product.price + option.price) * option.quantity,
      0
    );
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
          <div><input type="number" min=1 data-option-id=${option.id} value=${option.quantity} /></div>
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
