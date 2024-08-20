import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Box, Typography, Grid } from "@mui/material";
import api from "../Services/api";

function QuestionnaireFormComponent({ setQuestions, setCandidate }) {
  const [questions, updateQuestions] = useState([]);
  const [candidate, updateCandidate] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const navigate = useNavigate();

  const addQuestion = () => {
    updateQuestions([
      ...questions,
      { question: "", options: ["", "", "", "", ""], correctAnswer: "" },
    ]);
  };

  const removeQuestion = (index) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    updateQuestions(updatedQuestions);
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    updateQuestions(updatedQuestions);
  };

  const handleCandidateChange = (field, value) => {
    updateCandidate({ ...candidate, [field]: value });
  };

  const handleSubmit = () => {
    if (questions.length === 0) {
      alert("Please add at least one question before submitting.");
      return;
    }

    // Ensure that all fields are filled in for each question
    for (let i = 0; i < questions.length; i++) {
      if (
        questions[i].question === "" ||
        questions[i].options.some((opt) => opt === "") ||
        questions[i].correctAnswer === ""
      ) {
        alert("Please fill in all fields for each question.");
        return;
      }
    }

    api.saveQuestions(questions).then(() => {
      alert("Questionnaire set successfully!");
      navigate("/admin-summary");
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 4,
        p: 3,
        boxShadow: 3,
        borderRadius: 2,
        bgcolor: "background.paper",
        width: "100%",
        maxWidth: 600,
        mx: "auto",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Create Questionnaire
      </Typography>

      <TextField
        fullWidth
        label="Name"
        value={candidate.name}
        onChange={(e) => handleCandidateChange("name", e.target.value)}
        margin="normal"
        required
      />
      <TextField
        fullWidth
        label="Email"
        type="email"
        value={candidate.email}
        onChange={(e) => handleCandidateChange("email", e.target.value)}
        margin="normal"
        required
      />
      <TextField
        fullWidth
        label="Phone"
        value={candidate.phone}
        onChange={(e) => handleCandidateChange("phone", e.target.value)}
        margin="normal"
        required
      />

      {questions.map((q, index) => (
        <Box key={index} sx={{ width: "100%", mt: 2 }}>
          <TextField
            fullWidth
            label={`Question ${index + 1}`}
            value={q.question}
            onChange={(e) =>
              handleQuestionChange(index, "question", e.target.value)
            }
            margin="normal"
            required
          />
          {q.options.map((opt, optIndex) => (
            <TextField
              key={optIndex}
              fullWidth
              label={`Option ${optIndex + 1}`}
              value={opt}
              onChange={(e) => {
                const options = [...q.options];
                options[optIndex] = e.target.value;
                handleQuestionChange(index, "options", options);
              }}
              margin="normal"
              required
            />
          ))}
          <TextField
            fullWidth
            label="Correct Answer"
            value={q.correctAnswer}
            onChange={(e) =>
              handleQuestionChange(index, "correctAnswer", e.target.value)
            }
            margin="normal"
            required
          />
          <Button
            variant="contained"
            color="secondary"
            sx={{ mt: 1 }}
            onClick={() => removeQuestion(index)}
          >
            Remove Question
          </Button>
        </Box>
      ))}
      <Grid container spacing={2} sx={{ mt: 3 }}>
        <Grid item xs={6}>
          <Button
            variant="contained"
            fullWidth
            color="primary"
            onClick={addQuestion}
            disabled={questions.length >= 5}
          >
            Add Question
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            variant="contained"
            fullWidth
            color="secondary"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default QuestionnaireFormComponent;
