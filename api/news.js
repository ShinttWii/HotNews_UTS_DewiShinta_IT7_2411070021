import fetch from "node-fetch";

<<<<<<< HEAD
export default async function handler(req, res) {
  const { category = "general" } = req.query;
  const apiKey = "ce35ce93c19f45689d2fea0c01902bb1";
  const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch news" });
=======
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
>>>>>>> a59fab6239cde1512c08d886f49db2dd2d56eac0
  }
}
