import React from 'react'
import { useContext } from 'react'
import { Outlet,Navigate } from 'react-router-dom'
// import StoreContext from '../../Context/StoreContext.js'

const ProtuctDashboard = () => {
  const {store}=useContext(StoreContext)


  if(store.userInfo){
    return <Outlet />

  }else{
    return <Navigate to="/loginWriter" />
  }

}

export default ProtuctDashboard