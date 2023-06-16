import fetchLanguages from "./api.js";
import SearchInput from "./components/SearchInput.js";
import SelectedLanguage from "./components/SelectedLanguage.js";
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
    selectedLanguage.setState({
      selectedLanguages: this.state.selectedLanguages,
    });
  };

  const selectedLanguage = new SelectedLanguage({ $target, initialState: [] });

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
      // alert(language);

      // 이미 선택된 언어의 경우, 맨 뒤로 보내는 처리
      const nextSelectedLanguages = [...this.state.selectedLanguages];
      const index = nextSelectedLanguages.findIndex(
        (selectedLanguage) => selectedLanguage === language
      );
      if (index > -1) nextSelectedLanguages.splice(index, 1);
      nextSelectedLanguages.push(language);

      this.setState({ selectedLanguages: nextSelectedLanguages });
    },
  });
}
