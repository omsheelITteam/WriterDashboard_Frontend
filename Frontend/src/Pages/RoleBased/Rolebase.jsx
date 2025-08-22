import React from 'react'
import { Outlet,Navigate } from 'react-router-dom'

import { useContext } from 'react'
// import StoreContext from '../../Context/StoreContext.js'
import { AppContext } from '../../Context/AppContext'
const Rolebase = () => {

  const {store}=useContext(AppContext)

  if(store.role === role){
    return <Outlet />

  }else{
    return <Navigate to="/dashboard/unable-access" />
  }
}

export default Rolebase