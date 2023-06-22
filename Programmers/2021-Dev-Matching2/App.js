import CartPage from "./pages/CartPage.js";
import ProductDetailPage from "./pages/ProductDetailPage.js";
import ProductListPage from "./pages/ProductListPage.js";
import { init } from "./router.js";

export default function App($app) {
  this.route = () => {
    const { pathname } = location;

    $app.innerHTML = "";

    if (pathname === "/") {
      new ProductListPage($app).render();
    } else if (pathname.includes("/products")) {
      const productId = pathname.split("/")[2];
      new ProductDetailPage({ $app, productId }).render();
    } else if (pathname === "/cart") {
      new CartPage($app).render();
    }
  };

  // ROUTE_CHANGE 이벤트 발생 시 마다 App의 this.route 함수가 호출되게 하는 효과
  init(this.route);
  this.route();

  // 뒤로 가기, 앞으로 가기 발생 시 popstate 이벤트가 발생한다.
  window.addEventListener("popstate", this.route);
}
