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
