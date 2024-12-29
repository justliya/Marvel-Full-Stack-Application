
import { useState } from 'react';
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
        <div style={{ 
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px',
            fontFamily: 'Inter, sans-serif',
            textAlign: 'center'
        }}>
            <h1>Marvel Studio Character</h1>
            <p>Please type in the box what character card you would like to see:</p>

            {/* Search Bar */}
            <form 
                id="characterForm"
                onSubmit={handleSubmit}
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginBottom: '20px',
                }}
            >
                <input
                    type="text"
                    id="character"
                    name="character"
                    value={input}
                    onChange={handleChange}
                    required
                    placeholder="Name of a Marvel Character"
                    style={{
                        padding: '10px',
                        borderRadius: '20px 0 0 20px',
                        border: '1px solid #ccc',
                        outline: 'none',
                        width: '250px',
                        fontSize: '16px',
                    }}
                />
                <button
                    type="submit"
                    className="btn"
                    style={{
                        padding: '10px 15px',
                        borderRadius: '0 20px 20px 0',
                        backgroundColor: '#6c63ff',
                        color: 'white',
                        border: 'none',
                        fontSize: '16px',
                    }}
                >
                    🔍
                </button>
            </form>

            {/* Character Display */}
            <div id="characterInfo">
                {isLoading && <p>Loading...</p>}
                {characterError && <p style={{ color: "red" }}>{characterError}</p>}
                {!isLoading && !characterError && character && (
                    <div
                        style={{
                            width: '300px',
                            borderRadius: '10px',
                            overflow: 'hidden',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                            backgroundColor: 'white',
                            color: 'black',
                        }}
                    >
                        <img
                            src={character.image_url || 'https://via.placeholder.com/300'}
                            alt={character.name}
                            style={{
                                width: '100%',
                                height: '300px', // Adjust height dynamically
                                objectFit: 'cover',
                            }}
                        />
                        <div style={{ padding: '15px' }}>
                            <h5 style={{ fontWeight: 'bold' }}>{character.name}</h5>
                            <p><strong>Alias:</strong> {character.alias}</p>
                            <p><strong>Alignment:</strong> {character.alignment}</p>
                            <p><strong>Powers:</strong> {character.powers}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Character;