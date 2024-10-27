import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import React from 'react'

const DataChart = ({chartData,chartTitle,dataValue}) => {
  return (
    <>
    <h3>{chartTitle}</h3>
          <BarChart width={500} height={300} data={chartData}>
            <XAxis dataKey="name"/>
            <YAxis/>
            <Tooltip/>
            <CartesianGrid strokeDasharray="3 3" />
            <Bar dataKey={dataValue} fill="#8884d8" />
          </BarChart>
    </>
  )
}

export default DataChart
