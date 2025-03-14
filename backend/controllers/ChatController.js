import dotenv from "dotenv";
dotenv.config();
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPEN_AI_APIKEY });

export const createChat = async (req, res) => {
  try {
    const { body } = req;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a Pokémon fan who knows all the Pokémon names and their abilities. Your task is to name the Pokémon character based on my description.",
        },
        ...body.messages,
      ],
      max_tokens: 50,
    });

    res.json(completion.choices[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
