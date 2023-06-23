export default function CartPage($app) {
  this.$page = document.createElement("div");
  this.$page.className = "CartPage";

  this.$h1 = document.createElement("h1");
  this.$h1.textContent = "장바구니";
  this.$page.append(this.$h1);

  this.render = () => {
    $app.append(this.$page);
  };
}
