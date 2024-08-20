import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import api from "../Services/api";
import { useNavigate } from "react-router-dom";

function AdminSummaryComponent() {
  const [questions, setQuestions] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();

  const fetchQuestions = async () => {
    try {
      const response = await api.getQuestions();
      setQuestions(response.data || []);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleViewResults = () => {
    navigate("/results");
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    navigate("/");
  };

  const handleSetQuestions = async () => {
    try {
      await api.saveQuestions(questions);
      setOpenDialog(true);
    } catch (error) {
      console.error("Error saving questions:", error);
    }
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
      }}
    >
      <Typography variant="h4" gutterBottom>
        Admin Summary
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSetQuestions}
        sx={{ mb: 2 }}
      >
        Set Questions
      </Button>
      <Button variant="outlined" color="secondary" onClick={handleViewResults}>
        View Results
      </Button>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Questionnaire Set Successfully</DialogTitle>
        <DialogContent>
          <Typography>
            The questionnaire has been set successfully. Click "OK" to return to
            the login page.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default AdminSummaryComponent;
