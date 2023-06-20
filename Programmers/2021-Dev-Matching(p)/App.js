import { fetchNodes } from "./api.js";
import Breadcrumb from "./components/Breadcrumb.js";
import ImageViewer from "./components/ImageViewer.js";
import Loading from "./components/Loading.js";
import Nodes from "./components/Nodes.js";

export default function App($app) {
  this.state = {
    nodes: [],
    depth: [],
    filePath: null,
    isLoading: true,
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
    loading.setState(this.state.isLoading);
  };

  const breadcrumb = new Breadcrumb({
    $app,
    initialState: this.state.depth,
    onClickDiv: async (index) => {
      try {
        this.setState({ isLoading: true });
        if (isNaN(index)) {
          this.setState({
            nodes: await fetchNodes(),
            depth: [],
          });
        } else if (index === this.state.depth.length - 1) {
          return;
        } else {
          const nextDepth = this.state.depth.slice(0, index + 1);
          this.setState({
            nodes: await fetchNodes(nextDepth[nextDepth.length - 1].id),
            depth: nextDepth,
          });
        }
      } catch (err) {
        throw new Error(err.message);
      } finally {
        this.setState({ isLoading: false });
      }
    },
  });

  const nodes = new Nodes({
    $app,
    initialState: { nodes: this.state.nodes, depth: this.state.depth },
    onClickNode: async (node) => {
      try {
        this.setState({ isLoading: true });
        if (!node) {
          const nextDepth = this.state.depth;
          nextDepth.pop();
          if (nextDepth.length === 0) {
            this.setState({
              nodes: await fetchNodes(),
              depth: [],
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
          this.setState({ filePath: node.filePath });
        }
      } catch (err) {
        throw new Error(err.message);
      } finally {
        this.setState({ isLoading: false });
      }
    },
  });

  const loading = new Loading({ $app, initialState: this.state.isLoading });

  const imageViewer = new ImageViewer({
    $app,
    initialState: this.state.filePath,
    onClose: () => {
      this.setState({ filePath: null });
    },
  });

  const init = async () => {
    try {
      this.setState({ isLoading: true });
      this.setState({ nodes: await fetchNodes() });
    } catch (err) {
      throw new Error(err.message);
    } finally {
      this.setState({ isLoading: false });
    }
  };
  init();
}
