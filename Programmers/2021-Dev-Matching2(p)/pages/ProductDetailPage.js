import ProductDetail from "../components/ProductDetail.js";
import { request } from "../utils/api.js";

export default function ProductDetailPage({ $app, productId }) {
  this.$page = document.createElement("div");
  this.$page.className = "ProductDetailPage";

  this.$h1 = document.createElement("h1");
  this.$page.append(this.$h1);

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
    productDetail.setState(this.state);
  };

  const fetchProduct = async () => {
    const product = await request(productId);
    this.setState(product);
  };
  fetchProduct();

  const productDetail = new ProductDetail({
    $page: this.$page,
    initialState: this.state,
  });

  this.render = () => {
    if (!this.state) return;
    this.$h1.textContent = `${this.state.name} 상품 정보`;
    $app.append(this.$page);
  };
}
