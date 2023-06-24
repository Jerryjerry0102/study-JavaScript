import { CART_STORAGE_KEY, getItem, setItem } from "../utils/storage.js";
import { changeRoute } from "../utils/router.js";

export default function SelectedOpticonsoleons({ $target, initialState }) {
  this.$element = document.createElement("div");
  this.$element.className = "ProductDetail__selectedOptions";
  this.$element.addEventListener("change", (e) => {
    if (e.target.tagName === "INPUT") {
      const { optionId } = e.target.dataset;
      const nextState = [...this.state];
      nextState.find((option) => option.id === +optionId).quantity =
        +e.target.value;
      this.setState(nextState);
    }
  });
  this.$element.addEventListener("click", (e) => {
    if (e.target.className === "OrderButton") {
      const cartItems = getItem(CART_STORAGE_KEY);
      const nextCartItems = cartItems
        ? [...cartItems, ...this.state]
        : this.state;
      setItem(CART_STORAGE_KEY, nextCartItems);
      changeRoute("/cart");
    }
  });

  this.state = initialState;
  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.totalPrice = () => {
    return this.state.reduce(
      (acc, option) =>
        acc + (option.productPrice + option.price) * option.quantity,
      0
    );
  };

  this.render = () => {
    $target.append(this.$element);
    this.$element.innerHTML = "<h3>선택된 상품</h3>";

    if (this.state.length === 0) return;
    this.$element.innerHTML = `
      <h3>선택된 상품</h3>
      <ul>
        ${this.state
          .map(
            (option) =>
              `<li>
                ${option.productName} ${option.name} 
                ${option.price.toLocaleString()}원
              <div>
                <input type="number" data-option-id=${option.id} 
                      value=${option.quantity} min="1" max=${option.stock} />개
              </div>
            </li>`
          )
          .join("")}
      </ul>
      <div class="ProductDetail__totalPrice">${this.totalPrice().toLocaleString()}원</div>
      <button class="OrderButton">주문하기</button>`;
  };
}

/*
  <div class="ProductDetail__selectedOptions">
      <h3>선택된 상품</h3>
      <ul>
        <li>
          커피잔 100개 번들 10,000원
          <div><input type="number" value="10" />개</div>
        </li>
        <li>
          커피잔 1000개 번들 15,000원
          <div><input type="number" value="5" />개</div>
        </li>
      </ul>
      <div class="ProductDetail__totalPrice">175,000원</div>
      <button class="OrderButton">주문하기</button>
    </div>
 */
