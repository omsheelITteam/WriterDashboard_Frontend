
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header'; // Import your Header component

const MainPage = () => {
  const { search } = useLocation();
  
  // Check if this is a shared view
  const urlParams = new URLSearchParams(search);
  const isSharedView = urlParams.get('shared') === 'true' || urlParams.get('share') === 'true';;

  if (isSharedView) {
    // Render only the content without sidebar and header for shared view
    return (
      <div className="min-w-screen min-h-screen bg-gray-50">
        <div className="w-full min-h-screen">
          <div className="p-4">
            <Outlet />
          </div>
        </div>
      </div>
    );
  }

  // Normal layout with sidebar and header
  return (
    <div className="  bg-gray-50">
      <Sidebar />

      {/* Main Content */}
      <div className="w-full md:ml-[250px] md:w-[calc(100vw-250px)] min-h-screen">
        <Header />
        <div className="p-4  pt-[85px]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainPage;