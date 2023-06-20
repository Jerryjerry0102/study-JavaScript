export default function Breadcrumb({ $app, initialState }) {
  this.state = initialState;
  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.$element = document.createElement("nav");
  this.$element.className = "Breadcrumb";
  $app.append(this.$element);

  this.render = () => {
    const rootHTML = "<div>root</div>";
    if (this.state.length === 0) this.$element.innerHTML = rootHTML;
    else {
      const directoryHTML = this.state
        .map((node) => `<div>${node.name}</div>`)
        .join("");
      this.$element.innerHTML = rootHTML + directoryHTML;
    }
  };
  this.render();

  /**
   * <nav class="Breadcrumb">
        <div>root</div>
        <div>노란고양이</div>
      </nav>
   */
}
