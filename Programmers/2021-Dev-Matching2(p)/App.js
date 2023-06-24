import ProductDetailPage from "./pages/ProductDetailPage.js";
import ProductListPage from "./pages/ProductListPage.js";
import CartPage from "./pages/CartPage.js";
import { changeRoute, initRoute } from "./utils/router.js";

export default function App($app) {
  this.checkRoute = () => {
    const { pathname } = window.location;

    $app.innerHTML = "";

    if (pathname === "/") {
      new ProductListPage($app).render();
    } else if (pathname.includes("/products")) {
      const productId = pathname.split("/")[2];
      new ProductDetailPage({ $app, productId }).render();
    } else if (pathname === "/cart") {
      new CartPage($app).render();
    } else {
      changeRoute("/");
    }
  };

  initRoute(this.checkRoute);
  this.checkRoute();

  window.addEventListener("popstate", this.checkRoute);
}
