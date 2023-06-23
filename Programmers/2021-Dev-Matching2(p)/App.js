import ProductDetailPage from "./pages/ProductDetailPage.js";
import ProductListPage from "./pages/ProductListPage.js";
import CartPage from "./pages/CartPage.js";

export default function App($app) {
  this.checkRoute = () => {
    const { pathname } = window.location;
    if (pathname === "/") {
      new ProductListPage($app).render();
    } else if (pathname.includes("/products")) {
      const productId = pathname.split("/")[2];
      new ProductDetailPage({ $app, productId }).render();
      // productDetailPage.setState(productId);
    } else if (pathname === "/cart") {
      new CartPage($app).render();
    }
  };

  this.checkRoute();
}
