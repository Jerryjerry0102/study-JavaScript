export default function ProductListPage($app) {
  this.$page = document.createElement("div");
  this.$page.className = "ProductListPage";

  this.$h1 = document.createElement("h1");
  this.$h1.textContent = "상품 목록";
  this.$page.append(this.$h1);

  this.render = () => {
    $app.append(this.$page);
  };
}
