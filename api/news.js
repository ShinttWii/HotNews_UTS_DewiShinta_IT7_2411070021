export default async function handler(req, res) {
  const category = req.query.category || "general";
  const apiKey = "ce35ce93c19f45689d2fea0c01902bb1";
  const url = `https://newsapi.org/v2/top-headlines?country=id&category=${category}&apiKey=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching news", error });
  }
}
