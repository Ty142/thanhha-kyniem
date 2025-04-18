import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import "../css/Video.css";
import p2 from "../image/phim.mp3";
import { Row } from "react-bootstrap";
import video from "../image/Video.MOV";

const Video = () => {
  const [step, setStep] = useState(0);
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [showVideo, setShowVideo] = useState(false);
  const audioRef = useRef(null);

  const fullText1 =
    "Cùng xem lại 4 năm qua chúng ta đã bên nhau những sự kiện gì nhé hihi";
  const fullText2 = "Đừng chê tuiiii nhaa cô bé";

  useEffect(() => {
    audioRef.current.play();
  }, []);

  useEffect(() => {
    if (step === 0) {
      let i = 0;
      const interval = setInterval(() => {
        setText1(fullText1.slice(0, i + 1));
        i++;
        if (i >= fullText1.length) {
          clearInterval(interval);
          setTimeout(() => setStep(1), 300);
        }
      }, 60);
    }

    if (step === 1) {
      let i = 0;
      const interval = setInterval(() => {
        setText2(fullText2.slice(0, i + 1));
        i++;
        if (i >= fullText2.length) {
          clearInterval(interval);
          setTimeout(() => setStep(2), 800);
        }
      }, 70);
    }

    if (step === 2) {
      // Hiện bảng "Đang phát video…" trước khi show video
      setTimeout(() => setShowVideo(true), 1500);
    }
  }, [step]);

  return (
    <div className="video-container" style={{ width: "85%" }}>
      <Row>
        {step === 0 && (
          <motion.h1
            key="text1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {text1}
          </motion.h1>
        )}

        {step === 1 && (
          <motion.h1
            key="text2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {text2}
          </motion.h1>
        )}

        {step === 2 && !showVideo && (
          <motion.div
            key="loading"
            className="playing-message"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h2>🎥 Đang phát video…</h2>
          </motion.div>
        )}

        {showVideo && (
          <motion.div
            key="video"
            className="video-wrapper mt-4"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <video controls autoPlay>
              <source src={video} type="video/mp4" />
              Trình duyệt của bạn không hỗ trợ video.
            </video>
          </motion.div>
        )}

        <audio ref={audioRef} src={p2} />
      </Row>
    </div>
  );
};

export default Video;
