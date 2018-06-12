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
} from "reactstrap";

import { FirebaseConsumer } from "../../../../../../services/FirebaseContext";
import { StoreConsumer } from "../../../../../../services/StoreContext";
import StudySelection from "./components/StudySelection";

type Props = {
  selectedStudy: ?string,
  setSelectedStudy: string => void,
  studies: string[],
  languages: string[],
};

class Navbar extends React.PureComponent<Props> {
  setSelectedStudy = (selectedStudy: string) => {
    cookies.set("study", selectedStudy);
    this.props.setSelectedStudy(selectedStudy);
  };

  logout = () => {
    // window.location = "/";
    this.props.logout();
  };

  render() {
    const { selectedStudy, studies, languages } = this.props;
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

export default () => (
  <FirebaseConsumer>
    {firebase => (
      <StoreConsumer>
        {store => (
          <Navbar
            selectedStudy={store.state.selectedStudy}
            studies={store.state.studies}
            languages={store.state.languages}
            setSelectedStudy={store.setSelectedStudy}
            logout={firebase.logout}
          />
        )}
      </StoreConsumer>
    )}
  </FirebaseConsumer>
);
