import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import NewsContent from "./NewsContent"
// import StoreContext from '../Context/StoreContext.js'
import { AppContext } from '../Context/AppContext'

const News = () => {

  const {store} = useContext(AppContext)

  return (
    <div className='bg-white rounded-md max-w-7xl mx-auto p-4 sm:p-6'>
      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4'>
        <h2 className='text-xl sm:text-2xl font-medium mb-2 sm:mb-0'>News</h2>
        {/* {
          store && store.role !== "admin" &&
          <Link
            className='px-3 py-2 bg-purple-500 rounded-sm text-white hover:bg-purple-600 hover:text-white text-center w-full sm:w-auto'
            to="/dashboard/news/create"
          >
            Create News
          </Link>
        } */}
      </div>
      <NewsContent />
    </div>
  )
}

export default News

