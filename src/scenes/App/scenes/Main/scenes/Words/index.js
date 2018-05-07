// @flow
import * as React from "react";
import * as R from "ramda";
import { Table, Button } from "reactstrap";

import AddWord from "./components/AddWord";

// TODO: move to some type definition
type Word = {
  original: string,
  translation: string,
  score: ?number, // TODO: rethink
};

type Props = {
  words: { [string]: Word },
  selectedStudyRef: Object,
  selectedStudy: string,
};

class Words extends React.PureComponent<Props> {
  addWord = (original: string, translation: string) => {
    const { selectedStudyRef } = this.props;

    const key = selectedStudyRef.push().key;

    selectedStudyRef.update({ [key]: { original, translation, score: 0 } });
  };

  updateWord = (id: string, original: string, translation: string) => {
    this.props.selectedStudyRef.child(id).update({
      [id]: {
        original,
        translation,
      }
    })
  };

  deleteWord = (id: string) => {
    this.props.selectedStudyRef.child(id).remove();
  };

  render() {
    const { words, selectedStudy } = this.props;
    return (
      <React.Fragment>
        <AddWord selectedStudy={selectedStudy} addWord={this.addWord} />
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
                  <td><Button onClick={() => this.deleteWord(id)}>X</Button></td>
                </tr>
              )),
            )(words)}
          </tbody>
        </Table>
      </React.Fragment>
    );
  }
}

export default Words;
