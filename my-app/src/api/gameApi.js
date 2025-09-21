import axios from "axios";

// GET random word
export const getRandomWord = async (category = null) => {
  const response = await axios.get("http://localhost:8000/get_word", {
    params: { category },
  });
  return response.data; // { word, choices }
};

// POST image, word, choices
export const sendFrameToBackend = async (imageBlob, word, choices) => {
  const formData = new FormData();
  formData.append("file", imageBlob, "capture.jpg");
  formData.append("word", word);
  formData.append("choices", choices.join(","));

  const response = await axios.post("http://localhost:8000/guess", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data; // { guess, result, response }
};

// POST score to leaderboard
export const submitScore = async (username, score) => {
  try {
    const response = await axios.post("http://localhost:8000/leaderboard", {
      username,
      score
    });
    return response.data;
  } catch (error) {
    console.error("Error submitting score:", error);
    throw error;
  }
};

// GET leaderboard data
export const getLeaderboard = async () => {
  try {
    const response = await axios.get("http://localhost:8000/leaderboard");
    return response.data; // Array of { username, score } objects
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    throw error;
  }
};
