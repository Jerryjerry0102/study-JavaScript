import ProductList from "../components/ProductList.js";
import { request } from "../utils/api.js";

export default function ProductListPage($app) {
  this.$page = document.createElement("div");
  this.$page.className = "ProductListPage";

  this.$h1 = document.createElement("h1");
  this.$h1.textContent = "상품 목록";
  this.$page.append(this.$h1);

  this.state = [];
  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
    productList.setState(nextState);
  };

  this.fetchProducts = async () => {
    const products = await request();
    this.setState(products);
  };
  this.fetchProducts();

  const productList = new ProductList({
    $page: this.$page,
    initialState: this.state,
  });

  this.render = () => {
    $app.append(this.$page);
    if (this.state.length === 0) return;
  };
}
