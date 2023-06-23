import { request } from "../utils/api.js";
import Cart from "../components/Cart.js";
import { routeChange } from "../utils/router.js";
import { getItem } from "../utils/storage.js";

export default function CartPage($app) {
  const $page = document.createElement("div");
  $page.className = "CartPage";
  $page.innerHTML = "<h1>장바구니</h1>";

  const cartData = getItem("products_cart", []);
  this.state = {
    products: null,
  };

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.fetchProducts = async () => {
    const products = await Promise.all(
      cartData.map(async (cartProduct) => {
        const product = await request(cartProduct.productId);
        const selectedOption = product.productOptions.find(
          (option) => option.id === cartProduct.optionId
        );
        return {
          imageUrl: product.imageUrl,
          productName: product.name,
          quantity: cartProduct.quantity,
          productPrice: product.price,
          optionName: selectedOption.name,
          optionPrice: selectedOption.price,
        };
      })
    );
    if (products.length > 0) this.setState({ products });
  };
  this.fetchProducts();

  let cartComponent = null;
  this.render = () => {
    if (cartData.length === 0) {
      routeChange("/");
      alert("장바구니가 비었습니다.");
    } else {
      $app.append($page);
      if (this.state.products && !cartComponent) {
        cartComponent = new Cart({
          $target: $page,
          initialState: this.state.products,
        });
      }
    }
  };
}
/**
 *  <div class="CartPage">
      <h1>장바구니</h1>
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
        </ul>
        <div class="Cart__totalPrice">총 상품가격 175,000원</div>
        <button class="OrderButton">주문하기</button>
      </div>
    </div>
 */
