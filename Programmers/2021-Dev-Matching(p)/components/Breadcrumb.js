export default function Breadcrumb({ $app, initialState }) {
  this.state = initialState;

  this.$element = document.createElement("nav");
  this.$element.className = "Breadcrumb";
  $app.append(this.$element);

  this.render = () => {};
  this.render();

  /**
   * <nav class="Breadcrumb">
        <div>root</div>
        <div>노란고양이</div>
      </nav>
   */
}
