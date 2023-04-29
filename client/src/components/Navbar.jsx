import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { LinkContainer } from "react-router-bootstrap";
import { useAuth, logout } from "../auth";

function NavBar() {
  const [logged] = useAuth();
  return (
    <Navbar bg="light" expand="md">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>Secret Recipes</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>{" "}
            {logged && (
              <>
                <LinkContainer to="/create_recipe">
                  <Nav.Link>Create Recipes</Nav.Link>
                </LinkContainer>

                <Nav.Link onClick={logout}>Logout</Nav.Link>
              </>
            )}
            {!logged && (
              <>
                <LinkContainer to="/signup">
                  <Nav.Link>SignUp</Nav.Link>
                </LinkContainer>

                <LinkContainer to="/login">
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
