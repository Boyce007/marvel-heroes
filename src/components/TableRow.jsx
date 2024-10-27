import React from 'react'
import { Link } from 'react-router-dom'
import '../index.css'
const TableRow = ({ch}) => {
  return (
    <>
       <tr
                >
                  <Link to={`/details/${ch}`} state={{character:ch}}>
                  <td>
                  {ch.name}
                  </td>
                  </Link>
                  <td>
                  {
                  ch.events.available
                  
                  }
                  </td>
                  <td>
                  {ch.series.available }
                  </td>

                </tr> 
    </>
  )
}

export default TableRow
