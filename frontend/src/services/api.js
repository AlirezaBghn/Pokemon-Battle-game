import axios from "axios";

export const backendAPI = axios.create({
  baseURL: "http://localhost:5005",
  withCredentials: true,
});

export const pokeAPI = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
});

export const fetchCards = async () => {
  try {
    const response = await backendAPI.get("/api/cards");
    return response.data;
  } catch (error) {
    console.error("Error fetching cards", error);
    throw error;
  }
};

export const fetchLeaderboard = async () => {
  try {
    const response = await backendAPI.get("/api/leaderboard");
    return response.data;
  } catch (error) {
    console.error("Error fetching leaderboard", error);
    throw error;
  }
};

export const createScore = async (username, score) => {
  try {
    const response = await backendAPI.post("/api/leaderboard", {
      username,
      score,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating score", error);
    throw error;
  }
};
