export default function Breadcrumb({ $app, initialState }) {
  this.state = initialState;
  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.$element = document.createElement("nav");
  this.$element.className = "Breadcrumb";
  this.$element.innerHTML = `<div>root</div>`;
  $app.append(this.$element);

  this.render = () => {
    if (this.state.length === 0) return;
    const html = this.state.map((node) => `<div>${node.name}</div>`).join("");
    this.$element.insertAdjacentHTML("afterbegin", html);
  };
  this.render();

  /**
   * <nav class="Breadcrumb">
        <div>root</div>
        <div>노란고양이</div>
      </nav>
   */
}
