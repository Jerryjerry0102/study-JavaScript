import { request } from "../api.js";
import ProductList from "../components/ProductList.js";

export default function ProductListPage($app) {
  const $page = document.createElement("div");
  $page.className = "ProductListPage";
  $page.innerHTML = "<h1>상품 목록</h1>";

  this.render = () => {
    $app.append($page);
  };

  this.setState = (nextState) => {
    this.state = nextState;
    productList.setState(this.state);
  };

  const fetchProducts = async () => {
    const products = await request();
    this.setState(products);
  };
  fetchProducts();

  const productList = new ProductList({ $page, initialState: this.state });
}

/**
 * <div class="ProductListPage">
    <h1>상품목록</h1>
    <ProductList />
  </div>
 */
