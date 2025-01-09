const axios = require("axios");
const API_KEY = "imyKeXBr+JdFW9UEd0vsjg==o7iSJT4OnCq509Fj";

const getRandomQuote = async () => {
  try {
    const response = await axios.get("https://api.api-ninjas.com/v1/quotes", {
      headers: { "X-Api-Key": API_KEY },
    });
    if (response.data && response.data.length > 0) {
      return response.data[0].quote;
    } else {
      return "Happiness is a state of mind.";
    }
  } catch (error) {
    throw new Error("Failed to fetch quote");
  }
};

module.exports = getRandomQuote;
