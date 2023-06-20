export default function Nodes({ $app, initialState, onClickNode }) {
  this.state = initialState;
  this.setState = (nextState) => {
    this.state = {
      ...this.state,
      ...nextState,
    };
    this.render();
  };

  this.$element = document.createElement("div");
  this.$element.className = "Nodes";
  this.$element.addEventListener("click", (e) => {
    const $node = e.target.closest(".Node");
    if (!$node) return;
    const { nodeId } = $node.dataset;
    const node = this.state.nodes.find((node) => node.id === nodeId);
    onClickNode(node);
  });
  $app.append(this.$element);

  this.render = () => {
    const basicHTML = this.state.nodes
      .map((node) => {
        if (node.type === "DIRECTORY") {
          return `
        <div class="Node" data-node-id=${node.id}>
          <img src="./assets/directory.png" />
          <div>${node.name}</div>
        </div>`;
        } else if (node.type === "FILE") {
          return `
        <div class="Node" data-node-id=${node.id}>
          <img src="./assets/file.png" />
          <div>${node.name}</div>
        </div>`;
        }
      })
      .join("");
    const prevHTML = `<div class="Node"><img src="./assets/prev.png" /></div>`;
    this.$element.innerHTML =
      this.state.depth.length === 0 ? basicHTML : prevHTML + basicHTML;
  };

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
