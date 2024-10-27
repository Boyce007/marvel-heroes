import React from 'react'

const DetailsList = ({title,list}) => {
  return (
    <div>
      <ul>
          <p>
            {title}
          </p>
         {
          
          list.map((item,index)=>
            <li key={index}>
              {item.name}
            </li>
          ) 
         }
        </ul>
    </div>
  )
}

export default DetailsList
