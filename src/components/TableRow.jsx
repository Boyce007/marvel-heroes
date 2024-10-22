import React from 'react'

const TableRow = ({ch}) => {
  return (
    <>
       <tr
                >
                  <td>
                  {ch.name}
                  </td>
                  <td>
                  {
                  ch.events.available > 0 ? ch.events.items[0].name : "no events"
                  
                  }
                  </td>
                  <td>
                  {ch.series.available > 0 ? ch.series.items[0].name : "no series"}
                  </td>

                </tr> 
    </>
  )
}

export default TableRow
