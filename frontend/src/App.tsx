import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import CodeEditor from "./pages/CodeEditor";


function App() {
  return <>
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<Navigate to={"/login"}/>} />
    <Route path="/signup" element={<Signup/>} />
    <Route path="/login" element={<Login/>} />
    <Route path="/home" element={<Home/>} />
    <Route path="/editor" element={<CodeEditor/>} />
  </Routes>
  </BrowserRouter>
  </>
}

export default App;