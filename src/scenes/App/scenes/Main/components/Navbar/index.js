// @flow
import * as React from "react";
import cookies from "js-cookie";
import { Link } from "react-router-dom";
import {
  Navbar as NavbarBootstrap,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Collapse,
  UncontrolledDropdown,
  DropdownToggle,
} from "reactstrap";

import { actions, connect } from "../../../../store";

import StudySelection from "./components/StudySelection";

type Props = {
  selectedStudy: ?string,
  studies: string[],
  languages: string[],
};

class Navbar extends React.PureComponent<Props> {
  setSelectedStudy = (selectedStudy: string) => {
    cookies.set("study", selectedStudy);
    actions.setSelectedStudy({
      selectedStudy,
      vocabularyRef: this.props.rootRef.child("vocabulary"),
      setWords: actions.setWords,
    });
  };

  logout = () => {
    window.location = "/";
    this.props.logout();
  };

  render() {
    const { selectedStudy, studies, languages, logout } = this.props;
    return (
      <NavbarBootstrap color="light" light expand="md">
        <NavbarBrand>Vocaby</NavbarBrand>
        <Collapse isOpen navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink>
                <Link to={`/app/`}>Words</Link>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink>
                <Link to={`/app/quiz`}>Quiz</Link>
              </NavLink>
            </NavItem>
            <StudySelection
              studies={studies}
              languages={languages}
              selectedStudy={selectedStudy}
              createStudy={study => console.log("create study", study)}
              selectStudy={this.setSelectedStudy}
            />
            <NavItem>
              <NavLink onClick={this.logout}>Logout</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </NavbarBootstrap>
    );
  }
}
export default connect(state => ({
  selectedStudy: state.selectedStudy,
  studies: state.studies,
  languages: state.languages,
}))(Navbar);
