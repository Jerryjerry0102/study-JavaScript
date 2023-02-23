const React = require("react");
const ReactDom = require("react-dom/client");

const WordRelay = require("./WordRelayHooks");

ReactDom.createRoot(document.querySelector("#root")).render(<WordRelay />);
