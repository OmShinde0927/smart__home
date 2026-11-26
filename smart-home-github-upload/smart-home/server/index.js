import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { content } from "./data.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// In-memory store. Swap for a database when you need persistence.
let feedback = content.seedFeedback.map((f, i) => ({ ...f, id: i + 1, createdAt: Date.now() - (3 - i) * 3600e3 }));

const { seedFeedback, ...publicContent } = content;
app.get("/api/content", (_req, res) => res.json(publicContent));
app.get("/api/feedback", (_req, res) => res.json([...feedback].reverse()));

app.post("/api/feedback", (req, res) => {
  const { name, role, topic, rating, comment } = req.body || {};
  const stars = Number(rating);
  if (!comment || String(comment).trim().length < 5)
    return res.status(400).json({ error: "Write at least 5 characters in your comment." });
  if (!(stars >= 1 && stars <= 5))
    return res.status(400).json({ error: "Rating must be between 1 and 5." });
  const item = {
    id: Date.now(),
    name: String(name || "Guest Visitor").trim().slice(0, 40) || "Guest Visitor",
    role: String(role || "Homeowner").slice(0, 40),
    topic: String(topic || "Automation").slice(0, 30),
    rating: stars,
    comment: String(comment).trim().slice(0, 500),
    createdAt: Date.now(),
  };
  feedback.push(item);
  res.status(201).json(item);
});

if (process.env.NODE_ENV === "production") {
  const dist = path.join(__dirname, "../client/dist");
  app.use(express.static(dist));
  app.get("*", (_req, res) => res.sendFile(path.join(dist, "index.html")));
}

app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
