const IMAGE_PATH_PREFIX =
  "https://fe-dev-matching-2021-03-serverlessdeploymentbuck-1ooef0cg8h3vq.s3.ap-northeast-2.amazonaws.com/public";

export default function ImageViewer({ $app, initialState }) {
  this.state = initialState;
  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.$element = document.createElement("div");
  this.$element.className = "Modal ImageViewer";
  this.$element.addEventListener("click", () => {
    this.$element.style.display = "none";
  });
  window.addEventListener("keyup", (e) => {
    if (e.key === "Escape") {
      this.$element.style.display = "none";
    }
  });

  $app.appendChild(this.$element);

  this.render = () => {
    if (this.state) {
      this.$element.innerHTML = `
      <div class="content">
      <img src=${IMAGE_PATH_PREFIX}${this.state}>
      </div>
      `;
      this.$element.querySelector("img").addEventListener("click", (e) => {
        e.stopPropagation();
      });
    }
    this.$element.style.display = this.state ? "block" : "none";
  };

  this.render();
}
