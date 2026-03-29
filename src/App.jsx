import AddExpense from "./Components/AddExpense/AddExpense";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword";
import { AuthContextProvider } from "./Context/auth-context";
import SignUp from "./Pages/SignUp";
import UpdateProfilePage from "./Pages/UpdateProfilePage";
import Welcome from "./Pages/Welcome";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";




function App() {


  return (
    
    // <AuthContextProvider>
    //     <BrowserRouter>
    //       <Routes>
    //         <Route path="/" element={<SignUp />} />
    //         <Route path="/welcome" element={<Welcome />} />
    //         <Route path="/profile" element={<UpdateProfilePage />} />
    //         <Route path="/forgotpassword" element={<ForgotPassword />} />
    //         <Route path="*" element={<Navigate to="/" />} />
    //       </Routes>
    //   </BrowserRouter>
    // </AuthContextProvider>
    <>
    <AddExpense />
    </>
   
  )
}

export default App


