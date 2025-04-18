import "../css/Mainpage.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import Popup from "./Popup"; // nhớ import Popup vô nha
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [isHiding, setIsHiding] = useState(false);
  const Navigate = useNavigate();
  const handleNoClick = () => {
    setShowPopup(true);
    setTimeout(() => {
      setIsHiding(true);
      setTimeout(() => {
        setShowPopup(false);
        setIsHiding(false);
        Navigate(0);
      }, 500); // đúng bằng thời gian animation fadeOutUp
    }, 2000);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="Container">
      <h1 className="Title">
        {"Hi bé iuuu của anh! Em có nhớ hôm nay là ngày gì hemmm nhỉ <33"
          .split(" ")
          .map((word, index) => (
            <span
              key={index}
              style={{
                animationDelay: `${index * 0.08}s`,
                display: "inline-block",
              }}
            >
              {word}&nbsp;
            </span>
          ))}
      </h1>

      <div className="button mt-5">
        <Link to={"/iu"}>
          <button className="yes m-4 btn-animate">Nhớ nè {"<3"}</button>
        </Link>
        <button className="no m-4 btn-animate" onClick={handleNoClick}>
          Ngày gì nhỉ??
        </button>
      </div>

      {showPopup && (
        <div className={`popup ${isHiding ? "hide" : "show"}`}>
          <div className="popup-content">
            <span className="popup-icon">😢</span>
            <h3>Ơ kìa bé hông nhớ à?</h3>
            <p>Huhu nhớ lại đi mà!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainPage;
