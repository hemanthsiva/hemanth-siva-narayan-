import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginComponent from "./Components/LoginComponent";
import QuestionnaireFormComponent from "./Components/QuestionnaireFormComponent";
import CandidateViewComponent from "./Components/CandidateViewComponent";
import AdminSummaryComponent from "./Components/AdminSummaryComponent";
import UserSummaryComponent from "./Components/UserSummaryComponent";
import api from "./Services/api";
import { Container, CssBaseline } from "@mui/material";

function App() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [candidate, setCandidate] = useState({});

  useEffect(() => {
    // Fetch questions from API on load
    api.getQuestions().then((response) => setQuestions(response.data));
  }, []);

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
            path="/user-summary"
            element={
              <UserSummaryComponent candidate={candidate} answers={answers} />
            }
          />
          <Route path="/admin-summary" element={<AdminSummaryComponent />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
