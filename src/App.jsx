import {Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import Character from './components/Character';
import CreateCharacter from './components/CreateCharacter';
import Collection from './components/Collection';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';



function App() {
  return (
    <>
      <NavBar />
      <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/character" element={<Character />} />
              <Route path="/createcharacter" element={<CreateCharacter />} />
              <Route path="/collection" element={<Collection />} />
      </Routes>
    </>
      
  );
}

export default App; 
