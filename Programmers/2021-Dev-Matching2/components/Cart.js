import { routeChange } from "../utils/router.js";
import { removeItem } from "../utils/storage.js";

export default function Cart({ $target, initialState }) {
  this.$element = document.createElement("div");
  this.$element.className = "Cart";
  this.$element.addEventListener("click", (e) => {
    if (e.target.className === "OrderButton") {
      alert("주문 되었습니다!");
      removeItem("products_cart");
      routeChange("/");
    }
  });
  $target.append(this.$element);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.getTotalPrice = () =>
    this.state.reduce(
      (acc, option) =>
        acc + (option.productPrice + option.optionPrice) * option.quantity,
      0
    );

  this.render = () => {
    this.$element.innerHTML = `
      <ul>
        ${this.state
          .map(
            (cartProduct) => `
            <li class="Cart__item">
              <img src=${cartProduct.imageUrl} />
              <div class="Cart__itemDesription">
                <div>${cartProduct.productName} ${cartProduct.optionName} ${
              cartProduct.quantity
            }</div>
                <div>${(
                  cartProduct.productPrice + cartProduct.optionPrice
                ).toLocaleString()}원</div>
              </div>
            </li>`
          )
          .join("")}
      </ul>
      <div class="Cart__totalPrice">총 상품가격 ${this.getTotalPrice().toLocaleString()}원</div>
      <button class="OrderButton">주문하기</button>
    `;
  };

  this.render();
}

/**
 * <div class="Cart">
      <ul>
        <li class="Cart__item">
          <img
            src="https://grepp-cloudfront.s3.ap-northeast-2.amazonaws.com/programmers_imgs/assignment_image/cafe_coffee_cup.png"
          />
          <div class="Cart__itemDesription">
            <div>커피잔 100개 번들 10,000원 10개</div>
            <div>100,000원</div>
          </div>
        </li>
      </ul>
      <div class="Cart__totalPrice">총 상품가격 175,000원</div>
      <button class="OrderButton">주문하기</button>
    </div>
 */
