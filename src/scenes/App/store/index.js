// @flow
import { initStore } from "react-waterfall";

const store = {
  initialState: {
    languages: [],
    studies: [],
    selectedStudy: null,
    words: [],
  },
  actions: {
    setLanguages: (state, languages) => ({
      languages,
    }),
    setStudies: (state, studies) => ({
      studies,
      selectedStudy: state.selectedStudy || studies[0],
    }),
    setSelectedStudy: (state, { selectedStudy, vocabularyRef, setWords }) => {
      if (state.selectedStudy) {
        vocabularyRef.child(state.selectedStudy).off();
      }
      vocabularyRef.child(selectedStudy).on("value", snapshot => {
        setWords(snapshot.val());
      });
      return {
        selectedStudy,
      };
    },
    setWords: (state, words) => ({
      words,
    }),
  },
};

export const { Provider, Consumer, actions, getState, connect, subscribe } = initStore(store);
