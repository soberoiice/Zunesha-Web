import "./env.js";
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

app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

// Only listen when actually running locally, not when Vercel imports this module
if (process.env.VITE_DEPLOYMENT !== "production") {
  app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`),
  );
}

export default app;
