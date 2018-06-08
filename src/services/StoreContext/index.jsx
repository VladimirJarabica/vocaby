// @flow
import * as React from "react";

const StoreContext = React.createContext();

export class StoreProvider extends React.PureComponent {
  state = {
    languages: [],
    studies: [],
    selectedStudy: null,
    words: [],
  };

  setLanguages = languages => {
    this.setState({
      languages,
    });
  };
  setStudies = studies => {
    this.setState(state => ({
      studies,
      selectedStudy: state.selectedStudy || studies[0],
    }));
  };
  setWords = (words: []) => {
    this.setState({
      words,
    });
  };
  setSelectedStudy = (selectedStudy, vocabularyRef) => {
    if (this.state.selectedStudy) {
      vocabularyRef.child(this.state.selectedStudy).off();
    }
    vocabularyRef.child(selectedStudy).on("value", snapshot => {
      this.setState({
        words: snapshot.val(),
        selectedStudy,
      });
    });
  };

  render() {
    return <StoreContext.Provider value={{
      state: this.state,
      setLanguages: this.setLanguages,
      setStudies: this.setStudies,
      setWords: this.setWords,
      setSelectedStudy: this.setSelectedStudy,
    }}>{this.props.children}</StoreContext.Provider>;
  }
}

export const StoreConsumer = StoreContext.Consumer;
