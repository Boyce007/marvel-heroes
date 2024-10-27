import React from 'react'
import { useParams,useLocation } from 'react-router-dom'
import DetailsList from '../components/DetailsList';
const HeroDetails = () => {
  let {id}= useParams();
  const location = useLocation();
  const character = location.state?.character;
  const image = `${character.thumbnail.path}.${character.thumbnail.extension}` 
  console.log(character.events.items)
  return (
    <div>
      <h1>{character.name}</h1>
      <p>{character.description}</p>
      <img src={image} alt="Character Image" />
       {character.events.available >0? <DetailsList title={"Events"} list={character.events.items}/>:<p>No events</p>}
        {character.series.available>0? <DetailsList title={"Series"} list={character.series.items}/>:<p>No Series=</p>}
    </div>
  )
}

export default HeroDetails
