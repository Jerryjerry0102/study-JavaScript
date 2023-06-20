import Breadcrumb from "./components/Breadcrumb.js";
import Nodes from "./components/Nodes.js";

export default function App($app) {
  this.state = {};
  this.setState = (nextState) => {
    this.state = {
      ...this.state,
      ...nextState,
    };
  };
  const breadcrumb = new Breadcrumb({ $app, initialState: "" });
  const nodes = new Nodes({ $app, initialState: "" });
}
