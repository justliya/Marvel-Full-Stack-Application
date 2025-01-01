   /* eslint-disable no-unused-vars */
   import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
   import { useState, useEffect } from 'react';
   import axios from 'axios'; // Import axios for backend requests
 import { Container } from 'react-bootstrap';
   
   function CollectionPage() {
       const { name } = useParams(); // Get collection name from URL
       const [characters, setCharacters] = useState([]);
       const [error, setError] = useState('');
       const [isLoading, setIsLoading] = useState(false); // Track loading state
       const [characterError, setCharacterError] = useState(''); // Handle individual errors
       const navigate = useNavigate(); // Hook for navigation
   
       // **Load Characters from Collection**
       useEffect(() => {
           try {
               const savedCharacters = localStorage.getItem('characters');
               const allCharacters = savedCharacters ? JSON.parse(savedCharacters) : [];
   
               // **Filter by Collection Name (case-insensitive)**
               const filtered = allCharacters.filter(
                   (char) => char.collectionName.toLowerCase() === name.trim().toLowerCase()
               );
   
               if (filtered.length === 0) {
                   setError(`No characters found in the "${name}" collection.`);
               } else {
                   setCharacters(filtered);
                   setError('');
               }
           } catch (err) {
               setError('Failed to load collection. Please try again.');
           }
       }, [name, setCharacters]); // Added setCharacters as dependency
   
       // **Handle Character Deletion**
       const deleteCharacter = async (characterName) => {
           setIsLoading(true); // Set loading state
           try {
               // **Send DELETE request to backend**
               const response = await axios.delete(
                   `http://127.0.0.1:5000/characters/${encodeURIComponent(characterName)}`
               );
   
               if (response.status === 200) {
                   // **Remove character locally from state**
                   const updatedCharacters = characters.filter(
                       (char) => char.name.toLowerCase() !== characterName.toLowerCase()
                   );
                   setCharacters(updatedCharacters);
   
                   // **Update localStorage**
                   const savedCharacters = localStorage.getItem('characters');
                   const allCharacters = savedCharacters ? JSON.parse(savedCharacters) : [];
                   const updatedAllCharacters = allCharacters.filter(
                       (char) => char.name.toLowerCase() !== characterName.toLowerCase()
                   );
                   localStorage.setItem('characters', JSON.stringify(updatedAllCharacters));
   
                   // **Clear errors and display success message**
                   setCharacterError('');
                  
               } else {
                   // **Handle errors from the response**
                   setCharacterError(response.data.error || 'Failed to delete character.');
               }
           } catch (error) {
               // **Catch and display any errors**
               console.error('Error deleting character:', error);
               setCharacterError('An error occurred while deleting the character. Please try again.');
           } finally {
               setIsLoading(false); // Reset loading state
           }
       };
   
      
       return (
         <Container fluid
             className="home-container text-white d-flex flex-column justify-content-center align-items-center">
           <div style={{ textAlign: 'center' }}>
               <h1>{name}</h1>
               {error && <p style={{ color: 'red' }}>{error}</p>}
               {characterError && <p style={{ color: 'red' }}>{characterError}</p>} {/* Show character error */}
               {isLoading && <p>Loading...</p>} {/* Loading indicator */}
   
              
               {/* Display Characters */}
               <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                   {characters.map((char) => (
                       <div
                           key={char.name} 
                           style={{
                               border: '1px solid gray',
                               padding: '10px',
                               margin: '10px',
                               borderRadius: '5px',
                               width: '200px',
                           }}
                       >
                           <img
                               src={char.image_url}
                               alt={char.name}
                               style={{ width: '150px', height: '150px', borderRadius: '5px' }}
                           />
                           <h3>{char.name}</h3>
                           <p>{char.alias}</p>
                           <p>{char.alignment}</p>
                           <p>{char.powers}</p>
   
                           {/* Delete Character Button */}
                           <button
                               onClick={() => deleteCharacter(char.name)} //  delete by name
                               style={{
                                   padding: '5px 10px',
                                   backgroundColor: '#ff4d4d',
                                   color: 'white',
                                   border: 'none',
                                   borderRadius: '5px',
                                   cursor: 'pointer',
                                   marginTop: '10px',
                               }}
                           >
                               Delete
                           </button>
                       </div>
                   ))}
               </div>
           </div>
           </Container>
       );
   }
   
   export default CollectionPage;
 