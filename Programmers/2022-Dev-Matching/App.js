import fetchLanguages from "./api.js";
import SearchInput from "./components/SearchInput.js";

export default function App({ $target }) {
  this.state = {
    fetchedLanguages: [],
    selectedLanguages: [],
  };

  this.setState = (nextState) => {
    // TODO
  };

  new SearchInput({
    $target,
    initialState: "",
    onChange: async (keyword) => {
      const fetchedLanguages = await fetchLanguages(keyword);
      console.log(fetchedLanguages);
    },
  });
}
