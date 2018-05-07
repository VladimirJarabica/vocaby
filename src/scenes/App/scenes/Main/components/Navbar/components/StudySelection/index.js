// @flow
import * as React from "react";
import * as R from "ramda";
import { NavItem, NavLink, Input } from "reactstrap";

type Props = {
  studies: string[],
  languages: string[],
  selectedStudy: ?string,
  createStudy: string => void,
  selectStudy: string => void,
};

type State = {
  myLanguage: string,
  newLanguage: string,
};

class StudySelection extends React.PureComponent<Props, State> {
  state = {
    myLanguage: "",
    newLanguage: "",
    selectedStudy: "",
  };

  // TODO: prevent selecting same language
  handleChangeMyLanguage = ev => {
    this.setState({
      myLanguage: ev.target.value,
    });
  };

  handleChangeNewLanguage = ev => {
    this.setState({
      newLanguage: ev.target.value,
    });
  };

  handleCreateStudy = () => {
    const newStudy = `${this.state.myLanguage}_${this.state.newLanguage}`;

    this.props.createStudy(newStudy);
    this.props.selectStudy(newStudy);
  };

  handleSelectStudy = ev => {
    this.props.selectStudy(ev.target.value);
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const newStateCandidate = {
      myLanguage:
        !prevState.myLanguage && nextProps.languages.length > 0 ? nextProps.languages[0] : null,
      newLanguage:
        !prevState.newLanguage && nextProps.languages.length > 0 ? nextProps.languages[1] : null,
    };

    const newState = R.pickBy(Boolean, newStateCandidate);
    return R.keys(newState).length > 0 ? newState : null;
  }

  render() {
    const { studies, languages, selectedStudy } = this.props;
    const { myLanguage, newLanguage } = this.state;
    return (
      <React.Fragment>
        {studies.length > 0 && (
          <React.Fragment>
            <NavItem>
              <NavLink style={{whiteSpace: "nowrap"}}>Select study:</NavLink>
            </NavItem>
            <Input
              type="select"
              name="selectedStudy"
              id="selectedStudy"
              value={selectedStudy}
              onChange={this.handleSelectStudy}
            >
              {studies.map(study => (
                <option key={study} value={study}>
                  {study}
                </option>
              ))}
            </Input>
          </React.Fragment>
        )}
        {/*<NavItem>*/}
          {/*<NavLink>Create new study</NavLink>*/}
        {/*</NavItem>*/}
        {/*<select*/}
          {/*name="myLanguage"*/}
          {/*id="myLanguage"*/}
          {/*value={myLanguage}*/}
          {/*onChange={this.handleChangeMyLanguage}*/}
        {/*>*/}
          {/*{languages.map(lang => (*/}
            {/*<option key={lang} value={lang}>*/}
              {/*{lang}*/}
            {/*</option>*/}
          {/*))}*/}
        {/*</select>*/}
        {/*<select*/}
          {/*name="newLanguage"*/}
          {/*id="newLanguage"*/}
          {/*value={newLanguage}*/}
          {/*onChange={this.handleChangeNewLanguage}*/}
        {/*>*/}
          {/*{languages.map(lang => (*/}
            {/*<option key={lang} value={lang}>*/}
              {/*{lang}*/}
            {/*</option>*/}
          {/*))}*/}
        {/*</select>*/}
        {/*<button onClick={this.handleCreateStudy}>Create</button>*/}
      </React.Fragment>
    );
  }
}

export default StudySelection;
