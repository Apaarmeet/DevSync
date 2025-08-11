import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";

import Home from "./pages/Home";
import CodeEditor from "./pages/CodeEditor";


function App() {
  return <>
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<Navigate to={"/home"}/>} />
    <Route path="/home" element={<Home/>} />
    <Route path="/editor" element={<CodeEditor/>} />
  </Routes>
  </BrowserRouter>
  </>
}

export default App;