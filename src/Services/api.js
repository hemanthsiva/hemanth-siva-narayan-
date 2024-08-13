import axios from "axios";

const api = {
  saveQuestions: (data) => {
    return axios.post("http://localhost:3001/questions", data);
  },
  submitAnswers: (data) => {
    return axios.post("http://localhost:3001/answers", data);
  },
  getQuestions: () => {
    return axios.get("http://localhost:3001/questions");
  },
  getSummary: () => {
    return axios.get("http://localhost:3001/answers");
  },
};

export default api;
