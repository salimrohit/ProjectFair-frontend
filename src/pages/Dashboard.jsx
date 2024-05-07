import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import MyProject from '../components/MyProject'
import Profile from '../components/Profile'

function Dashboard() {
  const [username, setUsername] = useState("")
  useEffect(()=>{
    setUsername(JSON.parse(sessionStorage.getItem("existingUser")).username)

  },[])
  return (
    <>
    <Header/>
    <h2 className='mt-3'>Welcome <span className='text-warning'>{username}</span></h2>
    <div className="row my-5 p-5" style={{height:'90vh'}}>
      <div className="col-md-8">
        <MyProject/>
      </div>
      <div className="col-md-4 mt-4 mt-md-0">
        <Profile/>
      </div>
    </div>
      
    </>
  )
}

export default Dashboard
 