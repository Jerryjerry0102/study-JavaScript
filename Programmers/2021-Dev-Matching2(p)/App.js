import ProductDetailPage from "./pages/ProductDetailPage.js";
import ProductListPage from "./pages/ProductListPage.js";
import CartPage from "./pages/CartPage.js";

export default function App($app) {
  const productListPage = new ProductListPage($app);
  const productDetailPage = new ProductDetailPage($app);
  const cartPage = new CartPage($app);

  this.checkRoute = () => {
    const { pathname } = window.location;
    if (pathname === "/") {
      productListPage.render();
    } else if (pathname.includes("/products")) {
      const productId = pathname.split("/")[2];
      productDetailPage.setState(productId);
    } else if (pathname === "/cart") {
      cartPage.render();
    }
  };

  this.checkRoute();
}
