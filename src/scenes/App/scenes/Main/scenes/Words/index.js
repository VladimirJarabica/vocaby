// @flow
import * as React from "react";
import * as R from "ramda";
import { Table, Button } from "reactstrap";

import { StoreConsumer } from "../../../../../../services/StoreContext";
import AddWord from "./components/AddWord";

// TODO: move to some type definition
type Word = {
  original: string,
  translation: string,
  score: ?number, // TODO: rethink
};

type Props = {
  selectedStudy: string,
  words: { [string]: Word },
  addWord: (string, string) => void,
  updateWord: (string, string, string) => void,
  deleteWord: string => void,
};

const Words = (props: Props) => {
  const { words, selectedStudy, addWord, updateWord, deleteWord } = props;
  return (
    <React.Fragment>
      <AddWord selectedStudy={selectedStudy} addWord={addWord} />
      <Table>
        <thead>
          <tr>
            <th>Original</th>
            <th>Translation</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {R.compose(
            R.values,
            R.mapObjIndexed((word, id) => (
              <tr key={word.original}>
                <td>{word.original}</td>
                <td>{word.translation}</td>
                <td>
                  <Button onClick={() => deleteWord(id)}>X</Button>
                </td>
              </tr>
            )),
          )(words)}
        </tbody>
      </Table>
    </React.Fragment>
  );
};

export default () => (
  <StoreConsumer>
    {store => (
      <Words
        selectedStudy={store.state.selectedStudy}
        words={store.state.words}
        addWord={store.addWord}
        updateWord={store.updateWord}
        deleteWord={store.deleteWord}
      />
    )}
  </StoreConsumer>
);
