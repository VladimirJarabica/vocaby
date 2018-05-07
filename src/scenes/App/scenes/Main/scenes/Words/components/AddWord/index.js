// @flow
import * as React from "react";

type Props = {
  addWord: (original: string, translation: string) => void,
  selectedStudy: string,
};

type State = {
  original: string,
  translation: string,
};

class AddWord extends React.PureComponent<Props, State> {
  state = {
    original: "",
    translation: "",
  };

  handleChangeOriginal = ev => {
    this.setState({
      original: ev.target.value,
    });
  };
  handleChangeTranslation = ev => {
    this.setState({
      translation: ev.target.value,
    });
  };

  handleAddWord = () => {
    const { original, translation } = this.state;
    this.setState(
      {
        original: "",
        translation: "",
      },
      () => {
        this.props.addWord(original, translation);
      },
    );
  };

  render() {
    const { selectedStudy } = this.props;
    const { original, translation } = this.state;
    const [myLang, newLang] = selectedStudy.split("_");
    return (
      <div>
        <label htmlFor="original">{newLang}</label>
        <input type="text" name="original" value={original} onChange={this.handleChangeOriginal} />
        <label htmlFor="translation">{myLang}</label>
        <input
          type="text"
          name="translation"
          value={translation}
          onChange={this.handleChangeTranslation}
        />
        <button onClick={this.handleAddWord}>Add</button>
      </div>
    );
  }
}

export default AddWord;
