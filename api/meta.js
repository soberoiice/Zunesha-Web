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
        params: {
          fields:
            "id,title,main_picture,alternative_titles,start_date,end_date,synopsis,mean,rank,popularity,num_list_users,num_scoring_users,nsfw,created_at,updated_at,media_type,status,genres,my_list_status,num_episodes,start_season,broadcast,source,average_episode_duration,rating,pictures,background,related_anime,related_manga,recommendations,studios,statistics,videos,trailer",
        },
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
