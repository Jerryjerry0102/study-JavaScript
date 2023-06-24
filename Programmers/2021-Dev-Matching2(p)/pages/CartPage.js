import Cart from "../components/Cart.js";
import { changeRoute } from "../utils/router.js";
import { CART_STORAGE_KEY, getItem } from "../utils/storage.js";

export default function CartPage($app) {
  this.$page = document.createElement("div");
  this.$page.className = "CartPage";

  this.$h1 = document.createElement("h1");
  this.$h1.textContent = "장바구니";
  this.$page.append(this.$h1);

  this.state = getItem(CART_STORAGE_KEY);

  this.render = () => {
    if (!this.state) {
      alert("장바구니가 비어 있습니다.");
      changeRoute("/");
    } else {
      $app.append(this.$page);
      new Cart({ $page: this.$page, initialState: this.state }).render();
    }
  };
}
