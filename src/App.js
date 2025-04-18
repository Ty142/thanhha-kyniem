import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import MainPage from "./components/MainPage";
import Content from "./components/Content";
import Video from "./components/Video";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <HashRouter>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/iu" element={<Content />} />
            <Route path="/kyniem" element={<Video />} />
          </Routes>
        </HashRouter>
      </header>
    </div>
  );
}

export default App;
