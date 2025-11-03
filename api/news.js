import fetch from "node-fetch";

const apiKey = "ce35ce93c19f45689d2fea0c01902bb1";

export default async function handler(req, res) {
  const category = req.query.category || "general";

  try {
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}`
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
