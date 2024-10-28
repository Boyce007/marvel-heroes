import { useState } from 'react'
import '../App.css'
import CryptoJS from 'crypto-js';
import { useEffect } from 'react';
import SummaryStats from "../components/SummaryStats"
import TableRow from '../components/TableRow';
import DataChart from '../components/DataChart';
const ts = new Date().getTime();
const publicKey = "6e0097515dc105a219d25ef94858bb63";
const privateKey = "123102cd959c55e2fa8771bea661b34427de08b0";
const hash = CryptoJS.MD5(ts + privateKey + publicKey).toString();
const url = "http://gateway.marvel.com/v1/public/"


function DashBoard() {
  const [characters, setCharacters] = useState([]);
  const [searchBarCharacterValue,setSearchBarCharacterValue]  = useState('');
  const [searchedCharacter,setSearchedCharacter] = useState("");
  const [searchBarEvent,setSearchBarEvent] = useState('');
  const [totalCharacters,setTotalCharacters] = useState(0)
  const [totalEvents,setTotalEvents] = useState(null);
  const [totalSeries ,setTotalSeries] = useState(null);

  useEffect(()=> {
    const apiCall = async () => {
      const response = await fetch(`${url}characters?ts=${ts}&apikey=${publicKey}&hash=${hash}&limit=50`);
        if (!response.ok) {
          console.error("response was not received");
        }
        const json = await response.json();
        setCharacters(json.data.results);
    }

    apiCall();

  },[characters])

  


  const getTotal= async(path) => {
    const response = await fetch(`${url}${path}?ts=${ts}&apikey=${publicKey}&hash=${hash}&limit=1`);
    const  json = await response.json()
    return json.data.total
  }
useEffect(()=>{
  const fetchTotals = async()=> {
    const tc = await getTotal('characters');
    const te = await getTotal('events')
    const tse = await getTotal('series')
    setTotalCharacters(tc)
    setTotalEvents(te)
    setTotalSeries(tse)
  }
  fetchTotals();

  
  


},[])
  
  

 


  const handleCharacterChange = (e) => {
    setSearchBarCharacterValue(e.target.value)

  }
  const handleEventChange = (e) => {
    setSearchBarEvent(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchBarCharacterValue != "") {
      const searchedCh = characters.filter((character) =>
        character.name.toLowerCase().includes(searchBarCharacterValue.toLowerCase()
        ));
    
        setSearchedCharacter(searchedCh);

    } else if (searchBarEvent != "") {
      const searchedCh = characters.filter((character) => 
        character.events.available > 0 &&
        // Check if any event in the character's event list matches the search query
        character.events.items.some((event) => 
          event.name.toLowerCase().includes(searchBarEvent.toLowerCase())
        )
      );
    
      setSearchedCharacter(searchedCh);
      // console.log(searchedCh);  // Log the filtered characters
    }
        
    }
    const seriesChartData = characters.map(character => ({
      name: character.name,
      series: character.series.available, // Number of series available for each character
    }));

    const eventChartData = characters.map(character => ({
      name: character.name,
      events: character.events.available, // Number of series available for each character
    }));
    
  
  
  
  
  return (
    <div className='page-container'>
      <h1>Lets See What Marvel Has To Offer</h1>
      <div className='summary-container'>
        <SummaryStats
        value={totalCharacters}
        desc={"Total Characters"}
        />

        <SummaryStats
        value={totalEvents}
        desc={"Number of events"}
        />

        <SummaryStats
        value={totalSeries}
        desc="Total number of Series"
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
      <div className='dashboard-data-container'>
        <div className='table-container'>
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
                  <TableRow key={character.id} ch={character}/>
                )) :
                <TableRow  ch={searchedCharacter[0]}/>
                }
            </tbody>
        
        </table>

        </div>
        <div className='chart-container'>
          <DataChart
            chartData={seriesChartData}
            chartTitle={'Series per Character'}
            dataValue={'series'}
          ></DataChart>
          <DataChart
            chartData={eventChartData}
            chartTitle={'Events Per Character'}
            dataValue={'events'}
          />


        </div>
      </div>
    </div>
  )
}

export default DashBoard
