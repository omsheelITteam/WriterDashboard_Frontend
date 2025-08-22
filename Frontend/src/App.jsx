// import "./App.css";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// import MainPage from "./Layout/MainPage";
// import Login from "./Pages/Login/Login";
// import Rolebase from "./Pages/RoleBased/Rolebase";
// import Unable from "./Pages/Login/Unable";

// import News from "./Componets/News";
// import Profile from "./Componets/Profile";
// // import WriterIndex from "./Componets/WriterIndex";
// import CreateNews from "./Componets/CreateNews";
// import EditNews from "./Componets/EditNews";
// import UpdateProfileForm from "./Componets/UpdateProfile";
// import SettingsPage from "./Componets/SettingPage";
// import WriterDashboard from './Pages/WriterDashboard/WriterDashboard'
// import Category from "./Componets/Category";
// // import Preview from "./Componets/Preview";
// import Preview from './Componets/Preview'
// import WriterIndex from "./Componets/WriterIndex";
// // top-level app
// function App() {
//   return (
//     <BrowserRouter>
//       <ToastContainer position="top-right" autoClose={3000} />
//       <Routes>
//         <Route path="/" element={<Navigate to="/loginWriter" replace />} />

//         <Route path="/loginWriter" element={<Login />} />
//         {/* <Route path="/news/view/:news_id" element={<WriterIndex />} /> */}

//         {/* Dashboard parent route — MainPage must render <Outlet /> */}
//         <Route path="/dashboard" element={<MainPage />}>
//           {/* public/accessible dashboard pages */}
//           {/* <Route path="writer" element={<WriterIndex />} /> */}
//           <Route path="/dashboard/writer" element={<WriterDashboard/>}/>
//           <Route path="settingpage" element={<SettingsPage />} />
//           <Route path="news" element={<News />} />
//           <Route path="profile" element={<Profile />} />
//           <Route path="profile/update" element={<UpdateProfileForm />} />
//           <Route path="unable-access" element={<Unable />} />
//           <Route path="preview" element={<Preview />}/>
//           {/* writer-only protected nested routes */}
//           {/* <Route element={<Rolebase role="writer" />}> */}
//             <Route path="news/category" element={<Category />} />
//             <Route path="news/create" element={<CreateNews />} />
//             <Route path="news/view/:news_id" element={<WriterIndex />} />

//             <Route path="news/edit/:news_id" element={<EditNews />} />
//           </Route>
//         {/* </Route> */}

//         {/* fallback */}
//         <Route path="*" element={<Navigate to="/" replace />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import MainPage from "./Layout/MainPage";
import Login from "./Pages/Login/Login";
import Unable from "./Pages/Login/Unable";

import News from "./Componets/News";
import Profile from "./Componets/Profile";
import CreateNews from "./Componets/CreateNews";
import EditNews from "./Componets/EditNews";
import UpdateProfileForm from "./Componets/UpdateProfile";
import SettingsPage from "./Componets/SettingPage";
import WriterDashboard from "./Pages/WriterDashboard/WriterDashboard";
import Category from "./Componets/Category";
import Preview from "./Componets/Preview";
import WriterIndex from "./Componets/WriterIndex";
import RegsiterWriter from "./Pages/Login/RegisterWriter";
import EmailVerification from "./Pages/Login/EmailVerification";

function App() {
  return (
    // <BrowserRouter>
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        {/* <Route path="/" element={<Navigate to="/" replace />} /> */}
        {/* <Route path="/loginWriter" element={<Login />} /> */}
        <Route path="/" element={<RegsiterWriter />} />
        <Route path="/verify-email" element={<EmailVerification />} />
        <Route path="/login" element={<Login />} />

        <Route path="/dashboard" element={<MainPage />}>
          <Route path="writer" element={<WriterDashboard />} />
          <Route path="settingpage" element={<SettingsPage />} />
          <Route path="news" element={<News />} />
          <Route path="profile" element={<Profile />} />
          <Route path="profile/update" element={<UpdateProfileForm />} />
          <Route path="unable-access" element={<Unable />} />
          <Route path="preview" element={<Preview />} />
          <Route path="news/category" element={<Category />} />
          <Route path="news/create" element={<CreateNews />} />
          <Route path="news/view/:news_id" element={<WriterIndex />} />
          <Route path="news/edit/:news_id" element={<EditNews />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
    // </BrowserRouter>
  );
}

export default App;
