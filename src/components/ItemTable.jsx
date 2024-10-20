import React from 'react'

const ItemTable = ({items}) => {
  return (
    <div>
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
                    items.map((item) =>(
                    <tr key={item.id}>
                    <td>
                        {
                        item.name
                        }
                    </td>
                    <td>
                        {
                        item.events.available > 0 ? item.events.items[0].name : "no events"
                        }
                    </td>
                    <td>
                        {
                        item.events.available > 0 ? item.events.items[0].name : "no series"
                        }
                    </td>

                    </tr>
                ))}
                

            </tbody>
        </table>
      
    </div>
  )
}

export default ItemTable
