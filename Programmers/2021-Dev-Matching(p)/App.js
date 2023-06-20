import { fetchNodes } from "./api.js";
import Breadcrumb from "./components/Breadcrumb.js";
import Nodes from "./components/Nodes.js";

export default function App($app) {
  this.state = {
    nodes: [],
    depth: [],
  };
  this.setState = (nextState) => {
    this.state = {
      ...this.state,
      ...nextState,
    };
    breadcrumb.setState(this.state.depth);
    nodes.setState({
      nodes: this.state.nodes,
      depth: this.state.depth,
    });
  };

  this.init = async () => {
    this.setState({
      nodes: await fetchNodes(),
      depth: [],
    });
  };

  this.render = () => {};

  const breadcrumb = new Breadcrumb({ $app, initialState: "" });
  const nodes = new Nodes({
    $app,
    initialState: { nodes: this.state.nodes, depth: this.state.depth },
    onClickNode: async (node) => {
      if (!node) {
      }
      if (node.type === "DIRECTORY") {
        this.setState({
          nodes: await fetchNodes(node.id),
          depth: [...this.state.depth, node],
        });
      } else if (node.type === "FILE") {
      }
    },
  });

  this.init();
}
