//* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


function CreateCharacter() {
    // --- States ---
    const [formData, setFormData] = useState({
        name: '',
        alias: '',
        alignment: 'hero', // Default value
        powers: '',
        image_url: ''
    });

    const [characterName, setCharacterName] = useState(''); // For editing/searching
    const [editMode, setEditMode] = useState(false); // Toggle edit mode
    const [message, setMessage] = useState(''); // Success message
    const [error, setError] = useState(''); // Error message

    // Hardcoded Collection Name
    const collectionName = 'my collection';

    // **Retrieve Characters on Load**
    const [characters, setCharacters] = useState(() => {
        const savedCharacters = localStorage.getItem('characters');
        const allCharacters = savedCharacters ? JSON.parse(savedCharacters) : [];
        return allCharacters.filter((char) => char.collectionName === collectionName); // Filter by collection
    });

    // **Save characters to localStorage**
    useEffect(() => {
        localStorage.setItem('characters', JSON.stringify(characters)); // Update storage whenever state changes
    }, [characters]);

    // --- Handlers ---
    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const handleNameChange = (e) => setCharacterName(e.target.value);

    // --- Create Character ---
    const createCharacter = async () => {
        if (!formData.name.trim()) {
            setError('Please enter a valid character name.');
            setMessage('');
            return;
        }

        try {
            // **Send POST request to backend**
            const response = await axios.post('http://127.0.0.1:5000/characters', formData);
            setMessage(response.data.message); // Success message
            setError('');

            // **Add to Local Storage and Collection Automatically**
            const newCharacter = { ...formData, id: Date.now(),collectionName };
            setCharacters((prev) => [...prev, newCharacter]); // Update collection state

            resetForm(); // Reset the form
        } catch (err) {
            setMessage('');
            setError(err.response?.data?.error || 'Failed to create character. Try again!');
        }
    };

    // --- Edit Character ---
    const editCharacter = async () => {
        console.log('Editing character:', characterName);
        console.log('Form data:', formData);

        if (!formData.name.trim()) {
            setError('Please enter the name of the character to edit.');
            setMessage('');
            return;
        }
            try {
                // Construct data object with only the fields to update
                const dataToUpdate = {};

                if (formData.name) {
                    dataToUpdate.name = formData.name;
                }
        
                if (formData.alias) {
                    dataToUpdate.alias = formData.alias;
                }
                if (formData.alignment) {
                    dataToUpdate.alignment = formData.alignment;
                }
                if (formData.powers) {
                    dataToUpdate.powers = formData.powers;
                }
                if (formData.image_url) {
                    dataToUpdate.image_url = formData.image_url;
                }
        
                // Send PUT request with the correct data format
                const response = await axios.put(
                    `http://127.0.0.1:5000/characters/${encodeURIComponent(characterName)}`,
                    dataToUpdate // Send data as a single object
                );

            setMessage(response.data.message); // Success message
            setError('');

            // **Update Character in Local Storage**
            const updatedCharacters = characters.map((char) =>
                char.name.toLowerCase() === characterName.toLowerCase() ? { ...char, ...formData } : char
            );
            setCharacters(updatedCharacters); // Update local state
            localStorage.setItem('characters', JSON.stringify(updatedCharacters)); // Update storage

            resetForm();
            setEditMode(false); // Exit edit mode
        } catch (err) {
            setMessage('');
            setError(err.response?.data?.error || 'Failed to update character. Try again!');
        }
    };




    // --- Search Character in Collection ---
    const searchCharacter = () => {
        if (!characterName.trim()) {
            setError('Please enter a valid name to search.');
            setMessage('');  
            return;
        }

        // **Search within the stored collection (case-insensitive)**
        const foundCharacter = characters.find(
            (char) => char.name.toLowerCase().replace(/\s+/g, '') === characterName.toLowerCase().replace(/\s+/g, '')
        );

        if (foundCharacter) {
            setFormData(foundCharacter); // Fill form with character data
            setEditMode(true); // Switch to edit mode
            setMessage('Character found. Ready to edit!');
            setError('');
        } else {
            setMessage('');
            setError('Character not found in the collection.');
        }
    };

    // --- Reset Form ---
    const resetForm = () => {
        setFormData({ name: '', alias: '', alignment: 'hero', powers: '', image_url: '' });
        setCharacterName('');
        setEditMode(false);
    };

    // --- Return UI ---
    return (
        <Container
        fluid
        className="home-container text-white d-flex flex-column justify-content-center align-items-center py-5"
    >
        <div className="text-center mb-4">
            <h1 className="mb-4">
                {editMode ? 'Edit Character' : 'Create a New Character'}
            </h1>
            <p>Recreate your favorite character or make your own! They just end up in the Marvel Universe!</p>
        </div>

        {/* --- Search Section --- */}
        <Row className="justify-content-center mb-4">
            <Col xs={12} md={6} lg={4}>
                <div className="d-flex">
                    <input  
                
                        type="text"
                        value={characterName}
                        onChange={handleNameChange}
                        placeholder="Search collection to edit characters"
                        className="rounded-pill "
                        />
                    <Button variant="secondary" className="rounded-pill ms-2" onClick={searchCharacter}>
                        🔍
                    </Button>
               </div>
            </Col>
        </Row>

        {/* --- Character Form --- */}
        <Form
            onSubmit={(e) => {
                e.preventDefault();
                editMode ? editCharacter() : createCharacter();
            }}
            className="w-100"
        >
            <Row className="justify-content-center mb-3">
                <Col xs={12} md={6} lg={3} className="mb-3">
                    <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Name"
                        className="rounded-pill"
                        required
                    />
                </Col>
                <Col xs={12} md={6} lg={3} className="mb-3">
                    <Form.Control
                        type="text"
                        name="alias"
                        value={formData.alias}
                        onChange={handleChange}
                        placeholder="Alias"
                        className="rounded-pill"
                        required
                    />
                </Col>
                <Col xs={12} md={6} lg={3} className="mb-3">
                    <Form.Select
                        name="alignment"
                        value={formData.alignment}
                        onChange={handleChange}
                        className="rounded-pill"
                    >
                        <option value="hero">Hero</option>
                        <option value="villain">Villain</option>
                    </Form.Select>
                </Col>
                <Col xs={12} md={6} lg={3} className="mb-3">
                    <Form.Control
                        type="text"
                        name="powers"
                        value={formData.powers}
                        onChange={handleChange}
                        placeholder="Abilities"
                        className="rounded-pill"
                        required
                    />
                </Col>
            </Row>

            <Row className="justify-content-center mb-4">
                <Col xs={12} md={6} lg={4}>
                    <Form.Control
                        type="text"
                        name="image_url"
                        value={formData.image_url}
                        onChange={handleChange}
                        placeholder="Image URL"
                        className="rounded-pill"
                        required
                    />
                </Col>
            </Row>

            {/* --- Submit Button --- */}
            <Row className="justify-content-center mb-3">
                <Col xs="auto">
                    <Button
                        type="submit"
                        variant="primary"
                        className="rounded-pill px-4"
                    >
                        {editMode ? 'Update Character' : 'Create Character'}
                    </Button>
                </Col>
            </Row>
        </Form>

        {/* --- View Collection Button --- */}
        <Row className="justify-content-center mt-3">
            <Col xs="auto">
                <Link to={`/collection/${encodeURIComponent(collectionName)}`}>
                    <Button variant="secondary" className="rounded-pill px-4">
                        View Collection
                    </Button>
                </Link>
            </Col>
        </Row>

        {/* --- Messages --- */}
        <Row className="justify-content-center mt-3">
            {message && <p className="text-success">{message}</p>}
            {error && <p className="text-danger">{error}</p>}
        </Row>
    </Container>
    );
}

export default CreateCharacter; 
