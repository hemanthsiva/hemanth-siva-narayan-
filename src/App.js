import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginComponent from "./Components/LoginComponent";
import QuestionnaireFormComponent from "./Components/QuestionnaireFormComponent";
import CandidateViewComponent from "./Components/CandidateViewComponent";
import SummaryComponent from "./Components/SummaryComponent";
import { Container, CssBaseline } from "@mui/material";
import "./App.css";

function App() {
  const [questions, setQuestions] = useState([]);
  const [candidate, setCandidate] = useState({});
  const [answers, setAnswers] = useState([]);

  return (
    <Router>
      <CssBaseline />
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<LoginComponent />} />
          <Route
            path="/create-questions"
            element={
              <QuestionnaireFormComponent
                setQuestions={setQuestions}
                setCandidate={setCandidate}
              />
            }
          />
          <Route
            path="/answer-questions"
            element={
              <CandidateViewComponent
                questions={questions}
                setAnswers={setAnswers}
              />
            }
          />
          <Route
            path="/summary"
            element={
              <SummaryComponent
                candidate={candidate}
                questions={questions}
                answers={answers}
              />
            }
          />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
