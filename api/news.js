import fetch from "node-fetch";

const apiKey = "23fc7bd716db4e829ffa5f7efa463627";

export default async function handler(req, res) {
  const category = req.query.category || "general";

  try {
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=id&category=${category}&apiKey=${apiKey}`
    );

    if (!response.ok) {
      return res.status(response.status).json({ error: "Failed to fetch news" });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
