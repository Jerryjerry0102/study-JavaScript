export default function Breadcrumb({ $app, initialState, onClick }) {
  this.state = initialState;
  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.$element = document.createElement("nav");
  this.$element.className = "Breadcrumb";
  this.$element.addEventListener("click", (e) => {
    const $navItem = e.target.closest(".nav-item");
    if ($navItem) {
      const { index } = $navItem.dataset;
      onClick(index ? +index : null);
    }
  });
  $app.appendChild(this.$element);

  this.render = () => {
    this.$element.innerHTML = `<div class="nav-item">root</div>
      ${this.state
        .map(
          (node, index) =>
            `<div class="nav-item" data-index=${index}>${node.name}</div>`
        )
        .join("")}
    `;
  };
}
