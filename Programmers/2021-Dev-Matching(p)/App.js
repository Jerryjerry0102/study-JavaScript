import { fetchNodes } from "./api.js";
import Breadcrumb from "./components/Breadcrumb.js";
import ImageViewer from "./components/ImageViewer.js";
import Nodes from "./components/Nodes.js";

export default function App($app) {
  this.state = {
    nodes: [],
    depth: [],
    filePath: null,
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
    imageViewer.setState(this.state.filePath);
  };

  const breadcrumb = new Breadcrumb({ $app, initialState: this.state.depth });

  const nodes = new Nodes({
    $app,
    initialState: { nodes: this.state.nodes, depth: this.state.depth },
    onClickNode: async (node) => {
      if (!node) {
        const nextDepth = this.state.depth;
        nextDepth.pop();
        if (nextDepth.length === 0) {
          this.setState({
            nodes: await fetchNodes(),
            depth: nextDepth,
          });
        } else {
          this.setState({
            nodes: await fetchNodes(nextDepth[nextDepth.length - 1].id),
            depth: nextDepth,
          });
        }
      } else if (node.type === "DIRECTORY") {
        this.setState({
          nodes: await fetchNodes(node.id),
          depth: [...this.state.depth, node],
        });
      } else if (node.type === "FILE") {
        this.setState({
          filePath: node.filePath,
        });
      }
    },
  });

  const imageViewer = new ImageViewer({
    $app,
    initialState: this.state.filePath,
    onClose: () => {
      this.setState({ filePath: null });
    },
  });

  const init = async () => {
    this.setState({
      nodes: await fetchNodes(),
      depth: [],
    });
  };

  init();
}
