import { changeRoute } from "../utils/router.js";

export default function ProductList({ $page, initialState }) {
  this.$component = document.createElement("ul");
  this.$component.className = "ProductList";
  this.$component.addEventListener("click", (e) => {
    const $Product = e.target.closest(".Product");
    if (!$Product) return;
    const { productId } = $Product.dataset;
    changeRoute(`/products/${productId}`);
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
