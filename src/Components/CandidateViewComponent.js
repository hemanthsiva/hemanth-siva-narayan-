import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../Services/api";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  List,
  ListItem,
  Radio,
  RadioGroup,
  Typography,
  Divider,
  TextField,
} from "@mui/material";

function CandidateViewComponent() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [candidate, setCandidate] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    api
      .getQuestions()
      .then((response) => {
        const data = response.data;
        const extractedQuestions = Object.values(data).flatMap((item) =>
          Object.values(item)
            .filter((subItem) => subItem.question)
            .map((subItem) => ({
              id: subItem.id,
              question: subItem.question,
              options: subItem.options,
              correctAnswer: subItem.correctAnswer,
            }))
        );
        setQuestions(extractedQuestions);
      })
      .catch((error) => console.error("Error fetching questions:", error));
  }, []);

  const handleAnswerChange = (questionId, selectedOption) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: selectedOption,
    }));
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) {
        score += 1;
      }
    });
    return score;
  };

  const handleSubmit = () => {
    const score = calculateScore();
    api
      .submitAnswers({ answers, candidate, score })
      .then(() => {
        // Store user details and score in localStorage
        localStorage.setItem("userScore", score);
        localStorage.setItem("userDetails", JSON.stringify(candidate));
        navigate("/user-summary");
      })
      .catch((error) => console.error("Error submitting answers:", error));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6">Enter Your Details</Typography>
      <TextField
        fullWidth
        label="Name"
        value={candidate.name}
        onChange={(e) => setCandidate({ ...candidate, name: e.target.value })}
        margin="normal"
        required
      />
      <TextField
        fullWidth
        label="Email"
        type="email"
        value={candidate.email}
        onChange={(e) => setCandidate({ ...candidate, email: e.target.value })}
        margin="normal"
        required
      />
      <TextField
        fullWidth
        label="Phone"
        value={candidate.phone}
        onChange={(e) => setCandidate({ ...candidate, phone: e.target.value })}
        margin="normal"
        required
      />

      <List>
        {questions.length > 0 ? (
          questions.map((q) => (
            <div key={q.id}>
              <ListItem>
                <FormControl component="fieldset" fullWidth>
                  <FormLabel component="legend">{q.question}</FormLabel>
                  <RadioGroup
                    aria-label={q.id}
                    name={q.id}
                    value={answers[q.id] || ""}
                    onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                  >
                    {q.options.map((option, index) => (
                      <FormControlLabel
                        key={index}
                        value={option}
                        control={<Radio />}
                        label={option}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              </ListItem>
              <Divider />
            </div>
          ))
        ) : (
          <Typography>No questions available</Typography>
        )}
      </List>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        sx={{ mt: 2 }}
      >
        Submit
      </Button>
    </Box>
  );
}

export default CandidateViewComponent;
