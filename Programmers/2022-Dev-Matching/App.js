import fetchLanguages from "./api.js";
import SearchInput from "./components/SearchInput.js";
import Suggestion from "./components/Suggestion.js";

export default function App({ $target }) {
  this.state = {
    fetchedLanguages: [],
    selectedLanguages: [],
  };

  this.setState = (nextState) => {
    this.state = {
      ...this.state,
      ...nextState,
    };
    suggestion.setState({
      selectedIndex: 0,
      languages: this.state.fetchedLanguages,
    });
  };

  new SearchInput({
    $target,
    initialState: "",
    onChange: async (keyword) => {
      if (keyword.length > 0) {
        const fetchedLanguages = await fetchLanguages(keyword);
        this.setState({ fetchedLanguages });
      } else {
        this.setState({ fetchedLanguages: [] });
      }
    },
  });

  const suggestion = new Suggestion({
    $target,
    initialState: { selectedIndex: 0, languages: [] },
    onSelect: (language) => {
      alert(language);
    },
  });
}
