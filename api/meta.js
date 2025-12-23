import axios from "axios";

export default async function handler(req, res) {
  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ error: "Missing anime ID" });
    }

    const response = await axios.get(
      `https://api.myanimelist.net/v2/anime/${id}`,
      {
        headers: {
          "X-MAL-CLIENT-ID": process.env.MAL_CLIENT_ID,
        },
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: "MAL request failed" });
  }
}
