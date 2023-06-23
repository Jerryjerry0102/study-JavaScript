export default function ProductDetailPage($app) {
  this.$page = document.createElement("div");
  this.$page.className = "ProductDetailPage";

  this.$h1 = document.createElement("h1");
  this.$h1.textContent = "상품 정보";
  this.$page.append(this.$h1);

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $app.append(this.$page);
  };
}
