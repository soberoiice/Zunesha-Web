import "./env.js"; // must be first — loads .env.local before other imports read process.env
import express from "express";
import cors from "cors";
import animeRoutes from "./routes/anime.routes.js";

if (!process.env.VITE_MAL_CLIENT_ID) {
  console.warn(
    "⚠️  VITE_MAL_CLIENT_ID is not set — MAL requests will fail. Add it to .env.local",
  );
}

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => res.json({ status: "ok" }));

app.use(animeRoutes);

// Fallback 404
app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`),
);
