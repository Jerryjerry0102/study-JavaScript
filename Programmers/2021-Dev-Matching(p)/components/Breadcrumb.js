export default function Breadcrumb({ $app, initialState, onClickDiv }) {
  this.state = initialState;
  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.$element = document.createElement("nav");
  this.$element.className = "Breadcrumb";
  this.$element.addEventListener("click", (e) => {
    if (e.target.tagName === "DIV") {
      const { index } = e.target.dataset;
      onClickDiv(+index);
    }
  });
  $app.append(this.$element);

  this.render = () => {
    const rootHTML = "<div>root</div>";
    if (this.state.length === 0) this.$element.innerHTML = rootHTML;
    else {
      const directoryHTML = this.state
        .map((node, index) => `<div data-index=${index}>${node.name}</div>`)
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
