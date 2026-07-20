import { useState } from "react";
import { useParams } from "react-router";

export default function TestVideo({
  title = "https://api.yenime.net/anime/1/1",
}) {
  const { id, episode } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const url = `https://api.yenime.net/anime/${id}/${episode}`;

  return (
    <div style={{ position: "relative", width: "100%", height: "600px" }}>
      {console.log("url", url)}
    </div>
  );
}
