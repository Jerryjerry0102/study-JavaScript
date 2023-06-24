import { changeRoute } from "../utils/router.js";

export default function ProductList({ $page, initialState }) {
  this.$component = document.createElement("ul");
  this.$component.className = "ProductList";
  this.$component.addEventListener("click", (e) => {
    const { productId } = e.target.closest(".Product").dataset;
    if (productId) changeRoute(`/products/${productId}`);
  });
  $page.append(this.$component);

  this.state = initialState;
  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    this.$component.innerHTML = this.state
      .map(
        (product) => `
          <li class="Product" data-product-id=${product.id}>
            <img src= ${product.imageUrl} />
            <div class="Product__info">
              <div>${product.name}</div>
              <div>${product.price.toLocaleString()}원~</div>
            </div>
          </li>
        `
      )
      .join("");
  };
}

/*
  <ul>
    <li class="Product">
      <img
        src="https://grepp-cloudfront.s3.ap-northeast-2.amazonaws.com/programmers_imgs/assignment_image/cafe_coffee_cup.png"
      />
      <div class="Product__info">
        <div>커피잔</div>
        <div>10,000원~</div>
      </div>
    </li>
    <li class="Product">
      <img
        src="https://grepp-cloudfront.s3.ap-northeast-2.amazonaws.com/programmers_imgs/assignment_image/cafe_coffee_cup.png"
      />
      <div class="Product__info">
        <div>커피잔</div>
        <div>10,000원~</div>
      </div>
    </li>
    <li class="Product">
      <img
        src="https://grepp-cloudfront.s3.ap-northeast-2.amazonaws.com/programmers_imgs/assignment_image/cafe_coffee_cup.png"
      />
      <div class="Product__info">
        <div>커피잔</div>
        <div>10,000원~</div>
      </div>
    </li>
    <li class="Product">
      <img
        src="https://grepp-cloudfront.s3.ap-northeast-2.amazonaws.com/programmers_imgs/assignment_image/cafe_coffee_cup.png"
      />
      <div class="Product__info">
        <div>커피잔</div>
        <div>10,000원~</div>
      </div>
    </li>
    <li class="Product">
      <img
        src="https://grepp-cloudfront.s3.ap-northeast-2.amazonaws.com/programmers_imgs/assignment_image/cafe_coffee_cup.png"
      />
      <div class="Product__info">
        <div>커피잔</div>
        <div>10,000원~</div>
      </div>
    </li>
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
