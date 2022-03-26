import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import EditorPage from "./pages/EditorPage";
import "./App.css";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <>
      <div>
        <Toaster position="top-right" reverseOrder={false}></Toaster>
      </div>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Home />}></Route>
          <Route path="/editor/:roomId" element={<EditorPage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
