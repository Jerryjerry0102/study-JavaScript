import Info from "./Info.js";
import SelectedOptions from "./SelectedOptions.js";

export default function ProductDetail({ $page, initialState }) {
  this.$component = document.createElement("div");
  this.$component.className = "ProductDetail";
  $page.append(this.$component);

  this.state = initialState;
  this.setState = (nextState) => {
    this.state = nextState;
    this.render();

    info.setState(this.state);
  };

  let info = null;
  this.render = () => {
    if (!this.state) return;
    this.$component.innerHTML = `<img src=${this.state.imageUrl} />`;

    if (info) return;
    info = new Info({
      $target: this.$component,
      initialState: this.state,
    });
  };
}
