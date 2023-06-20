const API_END_POINT =
  "https://fe-dev-matching-2021-03-serverlessdeploymentbuck-1ooef0cg8h3vq.s3.ap-northeast-2.amazonaws.com/public";

export default function ImageViewer({ $app, initialState, onClose }) {
  this.state = initialState;
  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.$element = document.createElement("div");
  this.$element.className = "Modal ImageViewer";
  this.$element.addEventListener("click", (e) => {
    if (e.target.tagName === "DIV") onClose();
  });
  window.addEventListener("keyup", (e) => {
    if (e.key === "Escape") onClose();
  });
  $app.append(this.$element);

  this.render = () => {
    if (this.state) {
      this.$element.innerHTML = `
        <div class="content">
          <img src=${API_END_POINT}${this.state} style="max-width: 700px; max-height: 700px" >
        </div>
      `;
      this.$element.style.display = "block";
    } else {
      this.$element.style.display = "none";
    }
  };

  /**
  * <div class="Modal ImageViewer">
      <div class="content">
        <img style="max-width: 700px; max-height: 700px" src="./assets/sample_image.jpg">
      </div>
    </div> 
  */
}
