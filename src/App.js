import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./components/MainPage";
import Content from "./components/Content";
import Video from "./components/Video";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Routes>
            <Route path="/thanhha-kyniem" element={<MainPage />} />
            <Route path="/thanhha-kyniem/iu" element={<Content />} />
            <Route path="/thanhha-kyniem/kyniem" element={<Video />} />
          </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
