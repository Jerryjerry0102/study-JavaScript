import SearchInput from "./components/SearchInput.js";

export default function App({ $target }) {
  this.state = {
    fetchedLanguages: [],
    selectedLanguages: [],
  };

  this.setState = (nextState) => {
    // TODO
  };

  new SearchInput({ $target, initialState: "" });
}
