import { changeRoute } from "../utils/router.js";
import { CART_STORAGE_KEY, removeItem } from "../utils/storage.js";

export default function Cart({ $page, initialState }) {
  this.$component = document.createElement("div");
  this.$component.className = "Cart";
  this.$component.addEventListener("click", (e) => {
    if (e.target.className === "OrderButton") {
      alert("주문되었습니다");
      removeItem(CART_STORAGE_KEY);
      changeRoute("/");
    }
  });
  $page.append(this.$component);

  this.state = initialState;

  this.totalPrice = () => {
    return this.state.reduce(
      (acc, option) =>
        acc + (option.productPrice + option.price) * option.quantity,
      0
    );
  };

  this.render = () => {
    this.$component.innerHTML = `
      <ul>
        ${this.state
          .map(
            (item) => `
              <li class="Cart__item">
                <img src=${item.productImageUrl} />
                <div class="Cart__itemDesription">
                  <div>${item.productName} ${item.name} 
                    ${item.price.toLocaleString()}원 ${item.quantity}개</div>
                  <div>${(
                    (item.productPrice + item.price) *
                    item.quantity
                  ).toLocaleString()}원
                  </div>
                </div>
              </li>`
          )
          .join("")}
      </ul>
      <div class="Cart__totalPrice">총 상품가격 ${this.totalPrice().toLocaleString()}원</div>
      <button class="OrderButton">주문하기</button>
    `;
  };

  this.render();
}

/*
  <div class="Cart">
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
      <li class="Cart__item">
        <img
          src="https://grepp-cloudfront.s3.ap-northeast-2.amazonaws.com/programmers_imgs/assignment_image/cafe_coffee_cup.png"
        />
        <div class="Cart__itemDesription">
          <div>커피잔 1000개 번들 15,000원 5개</div>
          <div>75,000원</div>
        </div>
      </li>
    </ul>
    <div class="Cart__totalPrice">총 상품가격 175,000원</div>
    <button class="OrderButton">주문하기</button>
  </div>
 */
