import { useState, useEffect } from 'react';
import { Container, Carousel, Spinner } from 'react-bootstrap';
import axios from 'axios';

function MarvelCharacters() {
    const [collectors, setCollectors] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [index, setIndex] = useState(0); // Controls the active index of the carousel

    // Fetch characters when the component loads
    useEffect(() => {
        axios.get('http://127.0.0.1:5000/characters')
            .then(response => {
                setCollectors(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(`Failed to fetch characters: ${error.message}`);
                setLoading(false);
            });
    }, []);

    // Handle manual control
    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    // Loading spinner
    if (loading) {
        return (
            <Container className="text-center mt-5">
                <Spinner animation="border" variant="info" role="status" />
                <h3 className="mt-3">Loading Characters...</h3>
            </Container>
        );
    }

    // Error handling
    if (error) {
        return <p className="text-danger text-center mt-4">{error}</p>;
    }

    // Render carousel
    return (
        <Container fluid
            className="home-container text-white d-flex flex-column justify-content-center align-items-center">

    
            <h1 className="display-1 fw-bold fade-in">Marvel Studio Characters</h1>
            <p className="fs-2 mt-3 fade-in">
            Did you create a character?!? If so...you may find them here or when you complete a search in the studio
            </p>
 <Container fluid className="carousel-container text-white d-flex flex-column justify-content-center align-items-center">
            <Carousel fade activeIndex={index} onSelect={handleSelect} interval={3000} 
            controls={true} 
            indicators={false} 
            slide= {false} 
        
            >
                {/* Auto-slide every 3 seconds */}
                {/* Show next/prev buttons */}
                {/* Hide slide indicators */}
                {collectors.map(collector => (
                    <Carousel.Item key={collector.id}>
                        <div className="carousel-card fade-in">
                            <img
                                className="carousel-image"
                                src={collector.image_url || 'https://via.placeholder.com/150'}
                                alt={collector.name}
                            />
                            <div className="carousel-overlay">
                                <h3>{collector.name}</h3>
                                <p>{collector.name}</p>
                            </div>
                        </div>
                    </Carousel.Item>
                ))}
            </Carousel>
        </Container>
        </Container>
    );

}

export default MarvelCharacters;

