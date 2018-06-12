// @flow
import * as React from "react";

const StoreContext = React.createContext();

type Props = {
  rootRef: Object,
};

type State = {};

export class StoreProvider extends React.PureComponent<Props, State> {
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
  addWord = (original: string, translation: string) => {
    const selectedStudyRef = this.props.rootRef.child("vocabulary").child(this.state.selectedStudy);

    const key = selectedStudyRef.push().key;

    selectedStudyRef.update({ [key]: { original, translation, score: 0 } });
  };
  updateWord = (id: string, original: string, translation: string) => {
    this.props.rootRef
      .child("vocabulary")
      .child(this.state.selectedStudy)
      .child(id)
      .update({
        [id]: {
          original,
          translation,
        },
      });
  };
  deleteWord = (id: string) => {
    this.props.rootRef
      .child("vocabulary")
      .child(this.state.selectedStudy)
      .child(id)
      .remove();
  };
  setSelectedStudy = selectedStudy => {
    const vocabularyRef = this.props.rootRef.child("vocabulary");
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
    console.log(this.state);
    return (
      <StoreContext.Provider
        value={{
          state: this.state,
          setLanguages: this.setLanguages,
          setStudies: this.setStudies,
          setWords: this.setWords,
          addWord: this.addWord,
          updateWord: this.updateWord,
          deleteWord: this.deleteWord,
          setSelectedStudy: this.setSelectedStudy,
        }}
      >
        {this.props.children}
      </StoreContext.Provider>
    );
  }
}

export const StoreConsumer = StoreContext.Consumer;
