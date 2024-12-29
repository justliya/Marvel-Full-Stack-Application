import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function NavBar() {
    return (
        <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
            <Container>
                <Navbar.Brand as={Link} to="/" className="fs-3 fw-bold">
                    Marvel Studio
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar-nav" />
                <Navbar.Collapse id="navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link as={Link} to="/" className="fs-5">Home</Nav.Link>
                        <Nav.Link as={Link} to="/character" className="fs-5">Character</Nav.Link>
                        <Nav.Link as={Link} to="/createcharacter" className="fs-5">Create</Nav.Link>
                        <Nav.Link as={Link} to="/collection" className="fs-5">Collection</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;