import axios from "axios";

export default async function handler(req, res) {
  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ error: "Missing anime ID" });
    }

    const response = await axios.get(
      `https://api.jikan.moe/v4/anime/${id}/characters`,
      {
        params: {
          offset: Number(offset),
        },
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: "MAL request failed" });
  }
}
