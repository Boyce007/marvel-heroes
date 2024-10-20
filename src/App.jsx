import { useState } from 'react'
import './App.css'
import CryptoJS from 'crypto-js';
import { useEffect } from 'react';

const ts = new Date().getTime();
const publicKey = "6e0097515dc105a219d25ef94858bb63";
const privateKey = "123102cd959c55e2fa8771bea661b34427de08b0";
const hash = CryptoJS.MD5(ts + privateKey + publicKey).toString();
const url = "http://gateway.marvel.com/v1/public/characters?"
function App() {
  const [characters, setCharacters] = useState([]);
  const [searchBarCharacterValue,setSearchBarCharacterValue]  = useState('');
  const [searchedCharacter,setSearchedCharacter] = useState('');
  const [searchBarEvent,setSearchBarEvent] = useState('');
  useEffect(()=> {
    const apiCall = async () => {
      const response = await fetch(`${url}ts=${ts}&apikey=${publicKey}&hash=${hash}&limit=100`)
      if (!response.ok) {
        console.error("response was not received")
      }
      

      const json = await response.json()
      
      setCharacters(json.data.results);
      console.log(json.data.results)
    }

    apiCall();

  },[])

  const handleCharacterChange = (e) => {
    setSearchBarCharacterValue(e.target.value)

  }
  const handleEventChange = (e) => {
    setSearchBarEvent(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const searched = characters.filter((character) =>
    character.name.toLowerCase().includes(searchBarCharacterValue.toLowerCase()));
    setSearchedCharacter(searched[0].name);
  
  }
  
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
         type="text"
         placeholder='Search for a hero'
         value= {searchBarCharacterValue}
         onChange={handleCharacterChange}
          />
          <input
          type="text"
          placeholder='Enter a Comic Event'
          value = {searchBarEvent}
          onChange={handleEventChange}
          />
        <button type="submit">Submit</button>
      </form>
      <ul>
        {
        searchedCharacter == ''? 
        characters.map(character=>(
          // <p>{console.log(character)}</p>
          <li key={character.id}>{character.name}</li>
        )) : <li>{searchedCharacter}</li>
        }
      
      </ul>
    </div>
  )
}

export default App
