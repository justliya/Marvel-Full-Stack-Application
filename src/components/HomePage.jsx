import { Container, Row, Col, ListGroup } from 'react-bootstrap';

function HomePage() {
    return (
        <Container fluid className="text-white py-5">
            {/* Title */}
            <Row className="justify-content-center mb-4">
                <Col md={8}>
                    <h1>Welcome to Marvel Studio</h1>
                </Col>
            </Row>

            {/* Features */}
            <Row className="justify-content-center">
                <Col md={6}>
                    <ListGroup>
                        <ListGroup.Item className="text-start">
                            • Explore Legendary Characters 🦸‍♂️🦹‍♀️
                        </ListGroup.Item>
                        <ListGroup.Item className="text-start">
                            • Create Your Own Hero 🛠️
                        </ListGroup.Item>
                        <ListGroup.Item className="text-start">
                            • Edit and Evolve Characters 🔄
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    );
}

export default HomePage;