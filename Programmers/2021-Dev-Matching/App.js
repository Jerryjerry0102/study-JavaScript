import { fetchNodes } from "./api.js";
import Breadcrumb from "./components/Breadcrumb.js";
import ImageViewer from "./components/ImageViewer.js";
import Loading from "./components/Loading.js";
import Nodes from "./components/Nodes.js";

const cache = {};

export default function App({ $app }) {
  this.state = {
    isLoading: false,
    isRoot: false,
    nodes: [],
    depth: [],
    selectedFilePath: null,
  };
  this.setState = (nextState) => {
    this.state = {
      ...this.state,
      ...nextState,
    };
    breadcrumb.setState(this.state.depth);
    nodes.setState({
      isRoot: this.state.isRoot,
      nodes: this.state.nodes,
    });
    imageViewer.setState(this.state.selectedFilePath);
    loading.setState(this.state.isLoading);
  };

  const breadcrumb = new Breadcrumb({
    $app,
    initialState: this.state.depth,
    onClick: (index) => {
      if (index === null) {
        this.setState({
          isRoot: true,
          depth: [],
          nodes: cache.root,
        });
        return;
      }

      // breadcrumb에서 현재 위치를 누른 경우는 무시
      if (index === this.state.depth.length - 1) {
        return;
      }

      const nextDepth = this.state.depth.slice(0, index + 1);

      this.setState({
        depth: nextDepth,
        nodes: cache[nextDepth[nextDepth.length - 1].id],
      });
    },
  });

  const nodes = new Nodes({
    $app,
    initialState: {
      isRoot: this.state.isRoot,
      nodes: this.state.nodes,
    },
    onClick: async (node) => {
      try {
        if (node.type === "DIRECTORY") {
          if (cache[node.id]) {
            const nextNodes = cache[node.id];
            this.setState({
              isRoot: false,
              depth: [...this.state.depth, node],
              nodes: nextNodes,
            });
          } else {
            this.setState({ isLoading: true });
            const nextNodes = await fetchNodes(node.id);
            this.setState({
              isRoot: false,
              depth: [...this.state.depth, node],
              nodes: nextNodes,
            });
            cache[node.id] = nextNodes;
          }
        } else if (node.type === "FILE") {
          this.setState({
            selectedFilePath: node.filePath,
          });
        }
      } catch (err) {
        throw new Error(err.message);
      } finally {
        this.setState({ isLoading: false });
      }
    },
    onBackClick: async () => {
      try {
        const nextState = { ...this.state };
        nextState.depth.pop();

        const prevNodeId =
          nextState.depth.length === 0
            ? null
            : nextState.depth[nextState.depth.length - 1].id;

        if (prevNodeId === null) {
          this.setState({
            isRoot: true,
            nodes: cache.root,
          });
        } else {
          this.setState({
            isRoot: false,
            nodes: cache[prevNodeId],
          });
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  });

  const imageViewer = new ImageViewer({
    $app,
    initialState: this.state.selectedFilePath,
  });

  const loading = new Loading({ $app, initialState: this.state.isLoading });

  const init = async () => {
    try {
      this.setState({ isLoading: true });
      const rootNodes = await fetchNodes();
      this.setState({
        isRoot: true,
        nodes: rootNodes,
      });
      cache.root = rootNodes;
    } catch (err) {
      throw new Error(err.message);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  init();
}
