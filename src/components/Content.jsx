import "../css/Content.css";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, Row, Col, Form, Button } from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";
import p1 from "../image/colen.mp3";

const Content = () => {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [answers, setAnswers] = useState({
    question1: "",
    question2: "",
    song: "",
  });

  const [hearts, setHearts] = useState([]);
  const audioRef = useRef(null);

  const handleAnswer = (question, answer) => {
    setAnswers((prev) => ({
      ...prev,
      [question]: answer,
    }));
    setCurrentQuestion((prev) => prev + 1);
  };

  const handleSongSubmit = (e) => {
    e.preventDefault();
    if (answers.song.trim() !== "") {
      setCurrentQuestion((prev) => prev + 1);
      triggerHearts();
    }
  };

  const triggerHearts = () => {
    const newHearts = Array.from({ length: 30 }).map((_, index) => {
      // Random khoảng bay theo trục x và y (px)
      const angle = Math.random() * 2 * Math.PI;
      const distance = 300 + Math.random() * 200; // 300-500px
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;

      return {
        id: Date.now() + index,
        x,
        y,
      };
    });

    setHearts((prev) => [...prev, ...newHearts]);

    // Xóa tim sau 2.5 giây
    setTimeout(() => {
      setHearts([]);
    }, 2500);
  };

  const fadeSlide = {
    hiddenLeft: { opacity: 0, x: -100 },
    hiddenRight: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
    exitLeft: { opacity: 0, x: -100, transition: { duration: 0.5 } },
    exitRight: { opacity: 0, x: 100, transition: { duration: 0.5 } },
  };

  // 👉 Phát nhạc từ câu 3
  useEffect(() => {
    if (currentQuestion === 3 && audioRef.current) {
      audioRef.current.play();
    }
  }, [currentQuestion]);

  return (
    <div className="content">
      <motion.h1
        className="content__inner text-center fs-1 mb-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: { delay: 0.5, duration: 0.6 },
        }}
      >
        {"Trước khi vào phần chính anh có vài câu hỏi dành cho em nè"
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
      </motion.h1>

      <Row className="mt-5 d-flex justify-content-center">
        <Col xs={11} md={10} lg={8}>
          <AnimatePresence mode="wait">
            {currentQuestion === 1 && (
              <motion.div
                key="q1"
                variants={fadeSlide}
                initial="hiddenLeft"
                animate="visible"
                exit="exitRight"
              >
                <Card className="Q1 mb-4">
                  <Card.Body>
                    <h2 className="content__inner text-center mb-3">
                      Trong hai đứa ai là “trùm” nhõng nhẽo hơn?
                    </h2>
                    <div className="d-flex flex-wrap justify-content-center gap-3">
                      <Button
                        className="be"
                        variant="pink"
                        onClick={() =>
                          handleAnswer("question1", "Em bé Của anh")
                        }
                      >
                        Em bé Của anh
                      </Button>
                      <Button
                        className="anh"
                        variant="orange"
                        onClick={() =>
                          handleAnswer("question1", "Anh iu của bé")
                        }
                      >
                        Anh iu của bé
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </motion.div>
            )}

            {currentQuestion === 2 && (
              <motion.div
                key="q2"
                variants={fadeSlide}
                initial="hiddenRight"
                animate="visible"
                exit="exitLeft"
              >
                <Card className="Q2 mb-4">
                  <Card.Body>
                    <h2 className="content__inner text-center mb-3">
                      Ai là người hay bị chọc và được dỗ dành nhiều nhất nè hihi
                    </h2>
                    <div className="d-flex flex-wrap justify-content-center gap-3">
                      <Button
                        className="be"
                        variant="pink"
                        onClick={() =>
                          handleAnswer("question2", "Em bé Của anh")
                        }
                      >
                        Em bé Của anh
                      </Button>
                      <Button
                        className="anh"
                        variant="orange"
                        onClick={() =>
                          handleAnswer("question2", "Anh iu của bé")
                        }
                      >
                        Anh iu của bé
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </motion.div>
            )}

            {currentQuestion === 3 && (
              <motion.div
                key="q3"
                variants={fadeSlide}
                initial="hiddenLeft"
                animate="visible"
                exit="exitRight"
              >
                <Card className="Q3 mb-4">
                  <Card.Body>
                    <h2 className="content__inner text-center mb-3">
                      Nếu phải chọn một bài hát đại diện cho tình yêu của hai
                      đứa mình, em/anh sẽ chọn bài nào?
                    </h2>
                    <Form onSubmit={handleSongSubmit}>
                      <Form.Text className="text-input d-flex flex-wrap justify-content-center gap-3">
                        <input
                          type="text"
                          value={answers.song}
                          onChange={(e) =>
                            setAnswers((prev) => ({
                              ...prev,
                              song: e.target.value,
                            }))
                          }
                          placeholder="Em nghĩ cuộc tình ta sẽ là bài hát gì <333"
                          className="w-100"
                          required
                        />
                      </Form.Text>
                      <div className="text-center mt-3">
                        <Button type="submit" className="anh" variant="orange">
                          Gửi câu trả lời
                        </Button>
                      </div>
                    </Form>
                  </Card.Body>
                </Card>
              </motion.div>
            )}

            {currentQuestion > 3 && (
              <motion.div
                key="done"
                variants={fadeSlide}
                initial="hiddenRight"
                animate="visible"
                exit="exitLeft"
              >
                <Card className="done mb-4">
                  <Card.Body>
                    <h2 className="content__inner text-center mb-3">
                      🎉 Làm xong chụp kết quả cho anh coii dới nhaaaa !!
                    </h2>
                    <p className="text-center">
                      <strong>1️⃣ Trùm nhõng nhẽo:</strong> {answers.question1}
                    </p>
                    <p className="text-center">
                      <strong>2️⃣ Hay bị chọc và dỗ dành:</strong>{" "}
                      {answers.question2}
                    </p>
                    <p className="text-center">
                      <strong>3️⃣ Bài hát tình yêu:</strong> {answers.song}
                    </p>
                    <div className="text-center mt-3">
                      <Link to="/kyniem">
                        <Button className="be text-light" variant="pink">
                          Qua Phần Tiếp theo hoiii
                        </Button>
                      </Link>
                    </div>
                  </Card.Body>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          <audio ref={audioRef} src={p1} loop />
        </Col>
      </Row>

      <div className="heart-container">
        {hearts.map((heart) => (
          <span
            key={heart.id}
            className="heart"
            style={{
              "--x": `${heart.x}px`,
              "--y": `${heart.y}px`,
            }}
          >
            ❤️
          </span>
        ))}
      </div>
    </div>
  );
};

export default Content;
