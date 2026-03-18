import SignUp from "./Pages/SignUp";
import UpdateProfilePage from "./Pages/UpdateProfilePage";
import Welcome from "./Pages/Welcome";
import { BrowserRouter, Routes, Route } from "react-router-dom";




function App() {


  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/profile" element={<UpdateProfilePage />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App


