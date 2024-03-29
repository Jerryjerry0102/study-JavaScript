import ProductDetail from "../components/ProductDetail.js";
import { request } from "../utils/api.js";

export default function ProductDetailPage({ $app, productId }) {
  const $page = document.createElement("div");
  $page.className = "ProductDetailPage";
  $page.innerHTML = "<h1>상품 정보</h1>";

  this.state = {
    productId,
    product: null,
  };

  this.setState = (nextState) => {
    this.state = {
      ...this.state,
      ...nextState,
    };
    productDetail.setState({ product: this.state.product });
  };

  this.render = () => {
    $app.append($page);
  };

  const fetchProduct = async () => {
    const product = await request(this.state.productId);
    this.setState({ product });
  };
  fetchProduct();

  const productDetail = new ProductDetail({
    $page,
    initialState: this.state.product,
  });
}

/**
 * <div class="ProductDetailPage">
    <h1>커피잔 상품 정보</h1>
    <div class="ProductDetail">
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
      </div>
    </div>
  </div>
 */
