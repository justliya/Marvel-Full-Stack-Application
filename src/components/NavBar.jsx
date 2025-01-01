import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function NavBar() {
    return (
        <Navbar expand="lg" sticky="top" className="navbar shadow-sm py-3">
            <Container fluid className="justify-content-center">
                <Navbar.Brand as={Link} to="/" className="fs-3 text-white fw-bold">
                    Marvel Studio
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar-nav" />
                <Navbar.Collapse id="navbar-nav" className="justify-content-center">
                    <Nav className="gap-4">
                        <Nav.Link as={Link} to="/" className="nav-link fs-4">
                            Home
                        </Nav.Link>
                        <Nav.Link as={Link} to="/character" className="nav-link fs-4">
                            Character
                        </Nav.Link>
                        <Nav.Link as={Link} to="/createcharacter" className="nav-link fs-4">
                            Create
                        </Nav.Link>
                        <Nav.Link as={Link} to="/marvelcharacters" className="nav-link fs-4">
                            Marvel Characters
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;