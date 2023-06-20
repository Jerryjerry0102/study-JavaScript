export default function Loading({ $app, initialState }) {
  this.state = initialState;
  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.$element = document.createElement("div");
  this.$element.className = "Modal Loading";
  $app.append(this.$element);

  this.render = () => {
    this.$element.innerHTML = `
      <div class="content">
        <img src="./assets/nyan-cat.gif">
      </div>`;
    this.$element.style.display = this.state ? "block" : "none";
  };

  /**
   * <div class="Modal Loading">
      <div class="content">
        <img src="./assets/nyan-cat.gif">
      </div>
    </div>
   */
}
