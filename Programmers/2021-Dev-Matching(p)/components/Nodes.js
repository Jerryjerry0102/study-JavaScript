export default function Nodes({ $app, initialState }) {
  this.state = initialState;

  this.$element = document.createElement("div");
  this.$element.className = "Nodes";
  $app.append(this.$element);

  this.render = () => {};
  this.render();

  /**
   * <div class="Nodes">
        <div class="Node">
          <img src="./assets/prev.png" />
        </div>
        <div class="Node">
          <img src="./assets/directory.png" />
          <div>2021/04</div>
        </div>
        <div class="Node">
          <img src="./assets/file.png" />
          <div>하품하는 사진</div>
        </div>
      </div>
   */
}
