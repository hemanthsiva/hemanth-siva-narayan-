import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../Services/api";
import {
  Typography,
  Box,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
} from "@mui/material";

function CandidateViewComponent({ questions, setAnswers }) {
  const [answers, updateAnswers] = useState([]);
  const navigate = useNavigate();

  const handleAnswerChange = (index, value) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = value;
    updateAnswers(updatedAnswers);
  };

  const handleSubmit = () => {
    setAnswers(answers);
    api.submitAnswers({ answers });
    navigate("/summary");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 4,
        p: 2,
        boxShadow: 3,
        borderRadius: 2,
        bgcolor: "background.paper",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Answer the Questionnaire
      </Typography>
      {questions.map((q, index) => (
        <FormControl
          component="fieldset"
          key={index}
          sx={{ mb: 3, width: "100%" }}
        >
          <FormLabel component="legend">
            <Typography variant="h6">{q.question}</Typography>
          </FormLabel>
          <RadioGroup
            name={`question-${index}`}
            onChange={(event) => handleAnswerChange(index, event.target.value)}
          >
            {q.options.map((opt, optIndex) => (
              <FormControlLabel
                key={optIndex}
                value={opt}
                control={<Radio />}
                label={opt}
              />
            ))}
          </RadioGroup>
        </FormControl>
      ))}
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
        onClick={handleSubmit}
      >
        Submit Answers
      </Button>
    </Box>
  );
}

export default CandidateViewComponent;
