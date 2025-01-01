import { Container, Row, Col, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';


function HomePage() {
    return (
        <Container
            fluid
            className="home-container text-white d-flex flex-column justify-content-center align-items-center"
        >
            {/* Title */}
            <Row className="text-center mb-4">
                <Col>
                    <h1 className="display-1 fw-bold fade-in">Welcome to Marvel Studio</h1>
                    <p className="fs-2 mt-3 fade-in">Unleash Your Inner Superhero</p>
                </Col>
            </Row>

            {/* Features */}
            <Row className="justify-content-center w-100">
                <Col md={8} lg={6}>
                    <ListGroup className="text-center fade-in">
                        <ListGroup.Item className="fs-3 py-4">
                            <Link to="/character">
                            • Explore Legendary Characters Profiles 🦸‍♂️🦹‍♀️
                            </Link>
                        </ListGroup.Item>
                        <ListGroup.Item className="fs-3 py-4">
                            <Link to="/createcharacter">
                            • Create and Edit Your Own Hero 🛠️
                            </Link>
                        </ListGroup.Item>
                        <ListGroup.Item className="fs-3 py-4">
                            <Link to="/marvelcharacters">
                            • Explore Marvel the Universe 🔄
                            </Link>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    );
}

export default HomePage;
