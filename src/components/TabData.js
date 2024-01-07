import React, { useEffect } from 'react'
import { useSupabase } from '../context/SupabaseContext'
import {ArcElement, Chart as ChartJs, Legend, Tooltip} from 'chart.js'
import { Pie  } from 'react-chartjs-2';
ChartJs.register(

  ArcElement,
  Tooltip,
  Legend
)
function TabData({policeData}) {
  const {fetchStats,stats}=useSupabase();

 
  

  useEffect(()=>{
 
      fetchStats(policeData.name);
    
  },[policeData.name])
 
 

 if(!stats){
  return null

 }
 const customOptions = {
  responsive: false, // Set to false to use custom height and width
    maintainAspectRatio: false, // Set to false to allow custom height and width
    height: 300, // Set the desired height
    width: 800,  // Set the desired width
};

  const data={
    labels:['No Response','Resolved','Resolving'],
    datasets:[{
    data:[stats[0].Follow_No_Response,stats[0].Follow_Resolved,stats[0].Follow_Resolving],
    backgroundColor:['red','orange','purple']
    }
    ]
  }

  return (
    <div className='grid sm:grid-cols-2 w-[100%] py-5 justify-center'>
    <Pie data={data} options={customOptions} className='hello'></Pie>
    <Pie data={data} options={customOptions} className='hello'></Pie>
    <Pie data={data} options={customOptions} className='hello'></Pie>
    <Pie data={data} options={customOptions} className='hello'></Pie>
  </div>
  )
}//

export default TabData