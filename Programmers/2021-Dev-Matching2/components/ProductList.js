import { routeChange } from "../router.js";

export default function ProductList({ $page, initialState }) {
  const $element = document.createElement("ul");
  $page.append($element);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    if (!this.state) return;
    $element.innerHTML = this.state
      .map(
        (product) =>
          `<li class="Product" data-product-id=${product.id}>
            <img src=${product.imageUrl} />
            <div class="Product__info">
              <div>${product.name}</div>
              <div>${product.price.toLocaleString()}원~</div>
            </div>
          </li>`
      )
      .join("");
  };
  this.render();

  $element.addEventListener("click", (e) => {
    const $li = e.target.closest("li");
    if (!$li) return;
    const { productId } = $li.dataset;

    if (productId) routeChange(`/products/${productId}`);
  });
}

/**
 * <ul>
      <li class="Product">
        <img
          src="https://grepp-cloudfront.s3.ap-northeast-2.amazonaws.com/programmers_imgs/assignment_image/cafe_coffee_cup.png"
        />
        <div class="Product__info">
          <div>커피잔</div>
          <div>10,000원~</div>
        </div>
      </li>
    </ul>
 */
