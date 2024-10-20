import { useState } from 'react'
import './App.css'
import CryptoJS from 'crypto-js';
import { useEffect } from 'react';
import SummaryStats from './components/SummaryStats';
const ts = new Date().getTime();
const publicKey = "6e0097515dc105a219d25ef94858bb63";
const privateKey = "123102cd959c55e2fa8771bea661b34427de08b0";
const hash = CryptoJS.MD5(ts + privateKey + publicKey).toString();
const url = "http://gateway.marvel.com/v1/public/"

function App() {
  const [characters, setCharacters] = useState([]);
  const [searchBarCharacterValue,setSearchBarCharacterValue]  = useState('');
  const [searchedCharacter,setSearchedCharacter] = useState('');
  const [searchBarEvent,setSearchBarEvent] = useState('');
  const [totalCharacters,setTotalCharacters] = useState(0)
  const [totalEvents,setTotalEvents] = useState(0);
  const [totalSeries,setTotalSeries] = useState(0);
  useEffect(()=> {
    const apiCall = async () => {
      const response = await fetch(`${url}characters?ts=${ts}&apikey=${publicKey}&hash=${hash}&limit=100`)
      if (!response.ok) {
        console.error("response was not received")
      }
      const json = await response.json()
      console.log(json)
      setCharacters(json.data.results);

    }

    apiCall();

  },[])

  useEffect(()=>{

    const getTotalChrAmount = async() => {
      const response = await fetch(`${url}characters?ts=${ts}&apikey=${publicKey}&hash=${hash}&limit=1`);
      const  json = await response.json()
      setTotalCharacters(json.data.total)
      
    }
    getTotalChrAmount();

  },[])

  useEffect(()=>{

    const getTotalEventAmount = async() => {
      const response = await fetch(`${url}events?ts=${ts}&apikey=${publicKey}&hash=${hash}&limit=1`);
      const  json = await response.json()
      setTotalEvents(json.data.total)
      
    }
    getTotalEventAmount();

  },[])

  useEffect(()=> {
    const getTotalSeriesAmount = async()=> {
      const response = await fetch(`${url}series?ts=${ts}&apikey=${publicKey}&hash=${hash}&limit=1`);
      const  json = await response.json()
      console.log(json);
      setTotalSeries(json.data.total)
    }
    getTotalSeriesAmount();
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
      <div className='summary-container'>
        <SummaryStats
        value={totalCharacters}
        desc={"Total Characters"}
        />

        <SummaryStats
        value={totalEvents}
        desc={"Total Events "}
        />

        <SummaryStats
        value={totalSeries}
        desc={"Total Series"}
        />
      </div>
      
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
      <table>

          <thead>
                <tr>
                    <th>
                        Name
                    </th>
                    <th>
                        events
                    </th>
                        <th>
                         series
                        </th>
                </tr>
            </thead>
          <tbody>
              {
              searchedCharacter == ''? 
              characters.map(character=>(
                <tr
                key={character.id}>
                  <td>
                  {character.name }
                  </td>
                  <td>
                  {
                    character.events.available > 0 ? character.events.items[0].name : "no events"
                  
                  }
                  </td>
                  <td>
                    {character.series.available > 0 ? character.series.items[0].name : "no series"}
                  </td>

                </tr>
              )) :
               <li>{searchedCharacter}</li>
              }
          </tbody>
      
      </table>
    </div>
  )
}

export default App
