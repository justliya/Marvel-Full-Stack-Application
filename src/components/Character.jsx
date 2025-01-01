
import { useState } from 'react';
import { Container, Form, InputGroup, Button, Spinner, Card, Row, Col } from 'react-bootstrap';
import axios from 'axios';

function Character() {
    const [character, setCharacter] = useState(null); // Single character data
    const [input, setInput] = useState(""); // Input field value
    const [characterError, setCharacterError] = useState(''); // Error message
    const [isLoading, setIsLoading] = useState(false); // Loading state

    const handleChange = (e) => {
        setInput(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setCharacterError("");
        setCharacter(null);
        getCharacter(); // Fetch character
    };

    const getCharacter = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(
                `http://127.0.0.1:5000/characters/${encodeURIComponent(input)}`
            );
            if (response.data && !response.data.error) {
                setCharacter(response.data); // Store character data
                setCharacterError("");
            } else {
                setCharacterError(response.data.error || "Character not found");
            }
        } catch (error) {
            console.error("Error fetching character:", error);
            setCharacterError("An error occurred during the search. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container fluid className="home-container text-white d-flex flex-column justify-content-center align-items-center">
               {/* Title */}
               <Row className="text-center mb-6">
                <Col>
                    <h1 className="display-1 fw-bold fade-in">Marvel Studio Character</h1>
                    <p className="fs-2 mt-3 fade-in">Please type in the box what character card you would like to see *don&apos;t forget any spaces or (-):</p>
                </Col>
            </Row>
        
            {/* Search Bar */}
            
            <Form onSubmit={handleSubmit} className="justify-content-center w-100" style={{ maxWidth: '400px' }}>
                <InputGroup>
                    <Form.Control
                        type="text"
                        placeholder="Name of a Marvel Character"
                        value={input}
                        onChange={handleChange}
                        required
                    />
                    <Button type="submit" variant="primary">
                        🔍
                    </Button>
                </InputGroup>
            </Form>
           
            {/* Loading Spinner */}
            {isLoading && <Spinner animation="border" variant="info" />}

            {/* Error Message */}
            {characterError && <p className="text-danger mt-3">{characterError}</p>}

            {/* Character Display */}
            {!isLoading && !characterError && character && (
             <Container 
             fluid 
             className="character-container text-light d-flex flex-column justify-content-center align-items-center py-0.5"
         >
             {/* Character Display */}
             <Row className="justify-content-center w-100">
                 <Col xs={12} md={6} lg={4}>
                     <Card className="character-card shadow-lg text-center fade-in" 
                           style={{ borderRadius: '15px', backgroundColor: 'white' }}>
                         
                         {/* Character Image */}
                         <Card.Img 
                             variant="top"
                             src={character?.image_url || 'https://via.placeholder.com/300'}
                             alt={character?.name || 'Character'}
                             className="character-img mx-auto d-block"
                             style={{ height: '400px', objectFit: 'cover', borderTopLeftRadius: '15px', borderTopRightRadius: '15px' }}
                         />
         
                         {/* Card Body */}
                         <Card.Body className="p-4">
                             <Card.Title className="fw-bold text-dark fs-4 mb-3">
                                 {character?.name || 'Character'}
                             </Card.Title>
                             <Card.Subtitle className="text-muted mb-3 fs-6">
                                 <strong>Alias:</strong> {character?.alias || 'Unknown'}
                             </Card.Subtitle>
                             <Card.Text className="mb-2 fs-6">
                                 <strong className="text-primary">Alignment:</strong> {character?.alignment || 'Unknown'}
                             </Card.Text>
                             <Card.Text className="fs-6">
                                 <strong className="text-success">Powers:</strong> {character?.powers || 'Not Available'}
                             </Card.Text>
                         </Card.Body>
                     </Card>
                 </Col>
             </Row>
         </Container>
            )}
</Container>
    );
}

export default Character;



