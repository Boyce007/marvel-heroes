import React from 'react'

const SummaryStats = ({value,desc}) => {
  return (
    <div>
      <h2>{desc}</h2>
      <h3>{value}</h3>

    </div>
  )
}

export default SummaryStats
