export default function Nodes({ $app, initialState, onClick, onBackClick }) {
  this.state = initialState;
  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.$element = document.createElement("div");
  this.$element.className = "Nodes";
  this.$element.addEventListener("click", (e) => {
    // dataset을 이용해 data-로 시작하는 attribute를 꺼내올 수 있음
    const $node = e.target.closest(".Node");
    if (!$node) return;
    const { nodeId } = $node.dataset;
    if (!nodeId) {
      onBackClick();
    }
    const selectedNode = this.state.nodes.find((node) => node.id === nodeId);
    if (selectedNode) {
      onClick(selectedNode);
    }
  });
  $app.appendChild(this.$element);

  this.render = () => {
    if (this.state.nodes) {
      const nodeTemplate = this.state.nodes
        .map((node) => {
          const iconPath =
            node.type === "FILE"
              ? "./assets/file.png"
              : "./assets/directory.png";

          return `
            <div class="Node" data-node-id="${node.id}">
              <img src=${iconPath} />
              <div>${node.name}</div>
            </div>
          `;
        })
        .join("");

      this.$element.innerHTML = this.state.isRoot
        ? nodeTemplate
        : `<div class="Node"><img src="./assets/prev.png" /></div>${nodeTemplate}`;
    }
  };

  this.render();
}
