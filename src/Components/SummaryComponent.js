import React from "react";
import { Box, Typography, Paper } from "@mui/material";

function SummaryComponent({ candidate, questions, answers }) {
  const score = questions.reduce((total, q, index) => {
    return total + (q.correctAnswer === answers[index] ? 1 : 0);
  }, 0);

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
        Summary
      </Typography>
      <Typography variant="h6" gutterBottom>
        Candidate Name: {candidate.name}
      </Typography>
      <Typography variant="h6" gutterBottom>
        Score: {score} / {questions.length}
      </Typography>

      {questions.map((q, index) => (
        <Paper
          key={index}
          sx={{
            p: 2,
            mt: 2,
            width: "100%",
            bgcolor: "grey.100",
            borderRadius: 1,
          }}
        >
          <Typography variant="body1" gutterBottom>
            {q.question}
          </Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Your Answer: {answers[index]}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Correct Answer: {q.correctAnswer}
          </Typography>
        </Paper>
      ))}
    </Box>
  );
}

export default SummaryComponent;
